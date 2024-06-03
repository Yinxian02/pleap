import { Component } from 'react';
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { LearningObject } from "./learningObject";
import { generateAndParseResponse } from "./parseJSON";
import { generateTextResponse } from "./generateText";

function getYoutubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

class GenerateAIContent extends Component{
    static contextType = AuthContext;
    
    getAllLessonText(learningObjects) {
        var allText = "";
        for (let i = 0; i < learningObjects.length; i++) {
            if (learningObjects[i].content.text !== null){
                allText += learningObjects[i].content.text;
            }
        }
      return allText; 
    }

    async createMCQ(lessonText) {
      const mcqPrompt = `You are a computer science lecturer at university. 
      Create a list of 5 one-sentence multiple choice questions 
      based on the lesson content, 
      that test student understanding. \n\n
      
      Ensure the questions cover the key concepts and important details from the lesson, 
      but keep the quiz concise to avoid exceeding token limits.

      Limit the quiz to a manageable length to ensure the response is 
      not truncated due to token limits.
      
      Lesson Content:\n${lessonText}
      
      Format the response as a parsable json array for the MCQs as follows: 
      [ { "question" : "..." , 
          "choices" : [ { 
            "text": "...", 
            "value": 1 (if correct) 0 (if wrong)]}, 
            ... ] } ... ]`;

      const mcqResponse = await generateAndParseResponse(mcqPrompt, this.context.auth.accessToken);
      const mcqObject = new LearningObject("MCQ", "text/plain", "active", "questionnaire", "medium");
      mcqObject.setQuestionnaire(mcqResponse);
      mcqObject.setAIGenerated();
      return mcqObject.getJSON();
    }

    async createQuiz(lessonText) {
      const quizPrompt = `You are a computer science lecturer at university. 
      Design a end-of-unit reflection quiz, with 5 questions, 
      based on the lesson content, 
      that test understanding, and provide correct answers \n\n

      Ensure the questions cover the key concepts 
      and important details from the lesson.
      
      Ensure the questions cover the key concepts and important details from the lesson, 
      but keep the quiz concise to avoid exceeding token limits.

      Limit the quiz to a manageable length to ensure the response is 
      not truncated due to token limits.

      Lesson Content:\n${lessonText}
      
      Format the response as a parsable json array 
       [ { "question" : "..." , "answer" : "..."} , ... ] `;
      
      const maxAttempts = 5;
      const quizResponse = await generateAndParseResponse(quizPrompt, this.context.auth.accessToken, maxAttempts);
      const quizObject = new LearningObject("reflection quiz", "text/plain", "active", "exercise", "medium");
      quizObject.setExercise(quizResponse);
      quizObject.setAIGenerated();
      return quizObject.getJSON();
    }

    async createGlossary(lessonText) {
      const glossaryPrompt = `You are a computer science lecturer  at university.
      Create a glossary, by identifying and defining key terms based on the lesson content.

      The goal is to create a glossary that helps students understand the main concepts of the lesson.  \n\n

      Lesson Content:\n${lessonText}

      Format the response as a parsable json array
      [ { "term" : "..." , "definition" : "..."} , ... ] `;

      const glossaryResponse = await generateAndParseResponse(glossaryPrompt, this.context.auth.accessToken);
      const glossaryObject = new LearningObject("glossary", "text/plain", "expositive", "narrative text", "low");
      glossaryObject.setGlossary(glossaryResponse);
      glossaryObject.setAIGenerated();
      return glossaryObject.getJSON();
    }

    async createChallenge(lessonText) {
      const challengePrompt = `You are a computer science lecturer at university.
      Create a challenge question for your students based on the lesson content.

      The challenge should require students to brainstorm, evaluate, and create a solution related to the lesson content.
      Make sure the challenge encourages students to apply their knowledge creatively to a real-world scenario outside of lesson content.

      Lesson Content:\n${lessonText}`;

      const challengeGeneratedResponse = await generateTextResponse(challengePrompt, this.context.auth.accessToken);
      console.log(challengeGeneratedResponse);

      const challengeObject = new LearningObject("brainstorm", "text/plain", "active", "problem statement", "medium");
      challengeObject.setText(challengeGeneratedResponse);
      challengeObject.setAIGenerated();
      return challengeObject.getJSON();
    }

    async createAudio(learningObject){
      try {
        const title = learningObject.general.title; 
        // console.log(title); 

        const text = learningObject.content.text; 
        // console.log(text); 

        const res = await axios.post(
          'http://localhost:5001/vertex-ai/textToSpeech',
          { title, text }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log(res.data.audio);
        return(res.data.audio);
      } catch (error) {
        console.error('Error generating audio:', error);
      }
    }
    
    async uploadGeneratedAudio(learningObject) {
      const id = learningObject._id;
      const audio = await this.createAudio(learningObject);
      console.log(audio);

      try {
        const res = await axios.post(
          `http://localhost:5001/learning-objects/addAudio/${id}`,
          { audio }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log(res.data); 
        // return res.data;
      } catch (error) {
        console.error('Error adding audio to learning object:', error);
      }
    }

    async addTranscript(learningObject, transcript) {
      const id = learningObject._id;

      try {
        const res = await axios.post(
          `http://localhost:5001/learning-objects/addTranscript/${id}`,
          { transcript }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log(res.data); 
      } catch (error) {
        console.error('Error adding transcript to learning object:', error);
      }
    }

    async addDescription(learningObject, description) {
      const id = learningObject._id;

      try {
        const res = await axios.post(
          `http://localhost:5001/learning-objects/addDescription/${id}`,
          { description }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log(res.data); 
      } catch (error) {
        console.error('Error adding description to learning object:', error);
      }
    }

    async createTranscript(learningObject){
      try {
        const title = learningObject.general.title; 
        const link = learningObject.content.link; 

        const videoId = getYoutubeId(link);

        const res = await axios.post(
          'http://localhost:5001/vertex-ai/speechToText',
          { title, videoId }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
          console.log(res.data); 

          const transcriptPrompt = 
              `Rewrite the following transcript to make sense, in the format of lecture notes:
              // ${res.data}`
              
          const transcript = await generateTextResponse(transcriptPrompt, this.context.auth.accessToken); 
          
          await this.addTranscript(learningObject, transcript);

          const transcriptObject = new LearningObject("transcript", "text/plain", "expositive", "narrative text", "low");
          
          transcriptObject.setText(transcript);
          transcriptObject.setLink(link);
          transcriptObject.setAIGenerated();

          return transcriptObject.getJSON();
        } catch (error) {
          console.error('Error generating transcript:', error);
        }
    }

    async createDescription(learningObject){
      try {
        const imageUrl = learningObject.content.link; 
        console.log(imageUrl); 

        const lecturePrompt = 
          `Write alternative lecture notes based on the image: ${imageUrl}`;

        const res = await axios.post(
          'http://localhost:5001/vertex-ai/imageToText',
          { imageUrl, lecturePrompt }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
        }
      );
      console.log(res.data); 

      const description = res.data;

      // add description to existing slide learning object
      await this.addDescription(learningObject, description);

      // create new narrative text learning object with slide 
      const descriptionObject = new LearningObject("description", "text/plain", "expositive", "narrative text", "low");
      
      descriptionObject.setText(description);
      descriptionObject.setLink(imageUrl);
      descriptionObject.setAIGenerated();

      return descriptionObject.getJSON();
    } catch (error) {
      console.error('Error generating image:', error);
    }
    }

    async createLearningObjects(learningObjects) {
      // console.log(learningObjects);
      const newLearningObjects = [];

      const lessonText = this.getAllLessonText(learningObjects);
      console.log(lessonText);

      const generationFunctions = [
        // this.createMCQ,
        // this.createQuiz,
        // this.createGlossary,
        this.createChallenge
      ];

      const createAndAddToLOList = async (generationFunction, ...args) => {
        const createdObject = await generationFunction.apply(this, args);
        if (createdObject !== undefined) {
          newLearningObjects.push(createdObject);
        }
      };

      for (const generationFunction of generationFunctions) {
        await createAndAddToLOList(generationFunction, lessonText);
      }

      for (const learningObject of learningObjects) {
        let creationFunction = null;
        
        if (learningObject.educational.learningResourceType) {
          switch (learningObject.educational.learningResourceType) {
            case "narrative text":
            //   // await this.uploadGeneratedAudio(learningObject);
              break;
            case "lecture":
              // creationFunction = this.createTranscript;
              break;
            case "slide":
              // creationFunction = this.createDescription;
              break;
            default:
              break; 
          }
        }
    
        if (creationFunction) {
          await createAndAddToLOList(creationFunction, learningObject);
        }
      }

      console.log(newLearningObjects);
      return newLearningObjects;
    }

    async fetchLearningObjects(ids) {
      try {
        const res = await axios.post(
          'http://localhost:5001/learning-objects/batch',
          { ids },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error('Error fetching learning objects:', error);
      }
    }

    async uploadGeneratedContent(ids) {
      const currLearningObjects = await this.fetchLearningObjects(ids);
      const learningObjects = await this.createLearningObjects(currLearningObjects);
      
      if (learningObjects.length === 0) {
        console.log('No learning objects to upload.');
        return;
      }

      console.log(learningObjects);

      try {
        const res = await axios.post(
          'http://localhost:5001/learning-objects/addBatch',
          { learningObjects },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log(res.data);
        return res.data.ids;
      } catch (error) {
        console.error('Error adding learning objects:', error);
      }
    }

    async addLearningObjectReferences(lessonId, ids) {
      console.log(lessonId, ids);
      try {
        const res = await axios.post(
          `http://localhost:5001/lessons/addLearningObjects/${lessonId}`,
          { learningObjectsIDs: ids },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
          }
        );
        console.log(res.data);
      } catch (error) {
        console.error('Error adding learning object references:', error);
      }
    }

    componentDidMount() {
      const generateAndUploadLessons = async () => {
        try {
          const res = await axios.get('http://localhost:5001/lessons/', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
            },
          });
    
          const lessons = res.data;
    
          for (let i = 0; i < lessons.length; i++) {
            const ids = await this.uploadGeneratedContent(lessons[i]._learningObjects);
            if (ids) {
              await this.addLearningObjectReferences(lessons[i]._id, ids);

              const learningObjects = await this.fetchLearningObjects(ids);
            
              for (let j = 0; j < learningObjects.length; j++) {
                  if (learningObjects[j].educational.learningResourceType === 'narrative text' 
                      && learningObjects[j].content.audio === "" ) {
                      await this.uploadGeneratedAudio(learningObjects[j]);
                  }
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      generateAndUploadLessons();
    }

    render(){
        return; 
    }
};

export default GenerateAIContent; 