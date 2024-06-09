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
      
      // console.log(mcqPrompt);
      // let mcqResponse;
      let openAImcqResponse;
      let vertexAImcqResponse;

      try {
        openAImcqResponse = await generateAndParseResponse(mcqPrompt, this.context.auth.accessToken, 'openAI');
        console.log(openAImcqResponse);
        vertexAImcqResponse = await generateAndParseResponse(mcqPrompt, this.context.auth.accessToken, 'vertexAI');
        console.log(vertexAImcqResponse);
      } catch (error) {
        console.error('Error generating mcq:', error);
        return undefined;
      }

      const mcqObject = new LearningObject("MCQ", "text/plain", "active", "questionnaire", "medium");
      mcqObject.setQuestionnaire(openAImcqResponse, vertexAImcqResponse);
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

      // let quizResponse;
      let openAIquizResponse;
      let vertexAIquizResponse;

      try {
        openAIquizResponse = await generateAndParseResponse(quizPrompt, this.context.auth.accessToken,'openAI', maxAttempts);
        vertexAIquizResponse = await generateAndParseResponse(quizPrompt, this.context.auth.accessToken, 'vertexAI', maxAttempts);
      } catch (error) {
        console.error('Error generating quiz:', error);
        return undefined;
      }

      const quizObject = new LearningObject("reflection quiz", "text/plain", "active", "exercise", "medium");
      quizObject.setExercise(openAIquizResponse, vertexAIquizResponse);
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

      let glossaryResponse;
      // let openAIglossaryResponse;
      // let vertexAIglossaryResponse;

      try {
        glossaryResponse = await generateAndParseResponse(glossaryPrompt, this.context.auth.accessToken, 'vertexAI');
      } catch (error) {
        console.error('Error generating glossary:', error);
        return undefined;
      }

      const glossaryObject = new LearningObject("glossary", "text/plain", "expositive", "narrative text", "low");
      glossaryObject.setGlossary([], glossaryResponse);
      glossaryObject.setAIGenerated();
      return glossaryObject.getJSON();
    }

    async createChallenge(lessonText) {
      const challengePrompt = `You are a computer science lecturer at university.
      Create a challenge question for your students based on the lesson content.

      The challenge should require students to brainstorm, evaluate, and create a solution related to the lesson content.
      Make sure the challenge encourages students to apply their knowledge creatively to a real-world scenario outside of lesson content.

      Lesson Content:\n${lessonText}`;

      const openAIchallengeResponse = await generateTextResponse(challengePrompt, this.context.auth.accessToken, 'openAI');
      const vertexAIchallengeResponse = await generateTextResponse(challengePrompt, this.context.auth.accessToken, 'vertexAI');

      console.log(openAIchallengeResponse);
      console.log(vertexAIchallengeResponse);

      const challengeObject = new LearningObject("brainstorm", "text/plain", "active", "problem statement", "medium");
      // challengeObject.setText(challengeGeneratedResponse);
      challengeObject.setChallenge(openAIchallengeResponse, vertexAIchallengeResponse);
      challengeObject.setAIGenerated();
      return challengeObject.getJSON();
    }

    async createAudio(learningObject){
      try {
        const title = learningObject.general.title; 
        // console.log(title); 

        const text = learningObject.content.text; 
        // console.log(text); 

        const resOpenAI = await axios.post(
          'http://localhost:5001/openAI/textToSpeech',
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
        const openAIAudio = resOpenAI.data.audio;

        const resVertexAI = await axios.post(
          'http://localhost:5001/vertexAI/textToSpeech',
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
        const vertexAIAudio = resVertexAI.data.audio;

        console.log({openAIAudio, vertexAIAudio});
        return({openAIAudio, vertexAIAudio});
      } catch (error) {
        console.error('Error generating audio:', error);
      }
    }
    
    async uploadGeneratedAudio(learningObject) {
      const id = learningObject._id;
      const { openAIAudio, vertexAIAudio } = await this.createAudio(learningObject);
      // console.log(audio);

      try {
        const res = await axios.post(
          `http://localhost:5001/learning-objects/addAudio/${id}`,
          { openAIAudio, vertexAIAudio }, 
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

    async addTranscript(learningObject, openAItranscript, vertexAItranscript) {
      const id = learningObject._id;
      const transcript = { 
        openAI: openAItranscript,
        vertexAI :vertexAItranscript
      };
      console.log(transcript);

      try {
        const res = await axios.post(
          `http://localhost:5001/learning-objects/addTranscript/${id}`,
          transcript, 
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

    async addDescription(learningObject, openAIDescription, vertexAIDescription) {
      const id = learningObject._id;
      const description = {
        openAI: openAIDescription,
        vertexAI: vertexAIDescription
      }

      try {
        const res = await axios.post(
          `http://localhost:5001/learning-objects/addDescription/${id}`,
          description, 
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

    async generateSpeechToText(title, videoId, apiType) {
      const res = await axios.post(
        `http://localhost:5001/${apiType}/speechToText`,
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

      return `Rewrite the following transcript to make sense, in the format of lecture notes:
          // ${res.data}`
    }

    async createTranscript(learningObject){
      try {
        const title = learningObject.general.title; 
        const link = learningObject.content.video; 
        const videoId = getYoutubeId(link);

        // const openAItranscriptPrompt = await this.generateSpeechToText(title, videoId, 'openAI');
        // const openAItranscript = await generateTextResponse(openAItranscriptPrompt, this.context.auth.accessToken, 'openAI');
        const openAItranscript = "";

        const vertexAItranscriptPrompt = await this.generateSpeechToText(title, videoId, 'vertexAI');
        const vertexAItranscript = await generateTextResponse(vertexAItranscriptPrompt, this.context.auth.accessToken, 'vertexAI');

        // const transcript = { openAItranscript,  vertexAItranscript};
        // console.log(transcript); 

        await this.addTranscript(learningObject, openAItranscript, vertexAItranscript);

        const transcriptObject = new LearningObject("transcript", "text/plain", "expositive", "narrative text", "low");
        
        transcriptObject.setTranscript(openAItranscript, vertexAItranscript);
        transcriptObject.setVideo(link);
        transcriptObject.setAIGenerated();

        return transcriptObject.getJSON();
      } catch (error) {
        console.error('Error generating transcript:', error);
      }
    }

    async generateImageToText(imageUrl, lecturePrompt, apiType) {
        const res = await axios.post(
          `http://localhost:5001/${apiType}/imageToText`,
          { imageUrl, lecturePrompt }, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
            },
        }); 
        console.log(res.data); 
        return res.data;
    }

    async createDescription(learningObject){
      try {
          const imageUrl = learningObject.content.image; 
          console.log(imageUrl); 

          const lecturePrompt = 
            `Write alternative lecture notes based on the image: ${imageUrl}`;

          // const openAIDescription = await this.generateImageToText(imageUrl, lecturePrompt, 'openAI');
          const openAIDescription = "";
          const vertexAIDescription = await this.generateImageToText(imageUrl, lecturePrompt, 'vertexAI');

          // const description = { openAIDescription, vertexAIDescription };
          // add description to existing slide learning object
          await this.addDescription(learningObject, openAIDescription, vertexAIDescription);

          // create new narrative text learning object with slide 
          const descriptionObject = new LearningObject("description", "text/plain", "expositive", "narrative text", "low");
          
          descriptionObject.setDescription(openAIDescription, vertexAIDescription);
          descriptionObject.setImage(imageUrl);
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
      // console.log(lessonText);

      const generationFunctions = [
        this.createMCQ,
        this.createQuiz,
        this.createGlossary,
        this.createChallenge
      ];

      const createAndAddToLOList = async (generationFunction, ...args) => {
        const createdObject = await generationFunction.apply(this, args);
        console.log("Created object:", createdObject);

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
              await this.uploadGeneratedAudio(learningObject);
              break;
            case "lecture":
              creationFunction = this.createTranscript;
              break;
            case "slide":
              creationFunction = this.createDescription;
              break;
            default:
              break; 
          }
        }
    
        if (creationFunction) {
          await createAndAddToLOList(creationFunction, learningObject);
        }
      }

      console.log("New learning objects:", newLearningObjects);
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
      
      console.log(learningObjects);

      if (learningObjects.length === 0) {
        console.log('No learning objects to upload.');
        return;
      }

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
          console.log(res.data); 
    
          // for (let i = 0; i < lessons.length; i++) {
          //   const ids = await this.uploadGeneratedContent(lessons[i]._learningObjects);
          //   if (ids) {
          //     await this.addLearningObjectReferences(lessons[i]._id, ids);
          //   }
          // }
            
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