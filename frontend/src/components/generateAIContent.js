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

    getLevelPrompt(difficultyLevel) {
      const levelPrompts = {
        "very easy": "assess recall of core concepts through memory of terminology, facts, setting, methods",
        "easy": "assess comprehension by translation of attained knowledge to similar instances",
        "medium": "assess application of knowledge to new situations, problem-solving, and analysis",
        "hard": "assess evaluation of knowledge, judgement, and dissection, through argumentative exercises",
        "very hard": "assess creation of new knowledge, synthesis of information, and design of new patterns, by producing purposeful outcomes by rearranging patterns"
      };
      return levelPrompts[difficultyLevel];
    } 

    generateSingleTurnMCQPrompt(lessonText, difficultyLevel) {
      const levelPrompt = this.getLevelPrompt(difficultyLevel);

      const mcqPrompt = `You are a computer science lecturer at university. 
            Create a list of 5 one-sentence multiple choice questions 
            based on the lesson content, 
            that ${levelPrompt}. \n\n
            
            Lesson Content:\n${lessonText}
            
            Format the response as a parsable json array for the MCQs as follows: 
            [ { "question" : "..." , 
                "choices" : [ { 
                  "text": "...", 
                  "value": 1 (if correct) 0 (if wrong)]}, 
                  ... ] } ... ]`;
      //  return levels
      return mcqPrompt;
    }; 

    async generateMultiStageMCQPrompt(lessonText, difficultyLevel, apiType) {
      const levelPrompt = this.getLevelPrompt(difficultyLevel);
      
      const paraphraseGenerationPrompt = `Paraphrase the given context ${lessonText}`;
      const paraphraseGeneration = await generateTextResponse(paraphraseGenerationPrompt, this.context.auth.accessToken, apiType);
      
      const keywordExtractionPrompt = `Extract the keywords from the given context ${paraphraseGeneration}`; 
      const keywordExtraction = await generateTextResponse(keywordExtractionPrompt, this.context.auth.accessToken, apiType);

      const mcqPrompt = `You are a computer science lecturer at university. 
                          Create a list of 5 one-sentence multiple choice questions 
                          based on the paraphrased content ${paraphraseGeneration}
                          and correct answers ${keywordExtraction}, 
                          that ${levelPrompt}. \n\n
                          
                          Format the response as a parsable json array for the MCQs as follows: 
                          [ { "question" : "..." , 
                              "choices" : [ { 
                                "text": "...", 
                                "value": 1 (if correct) 0 (if wrong)]}, 
                                ... ] } ... ]`;
      return mcqPrompt;
    }

    async createMCQ(lessonText) {
      const levels = ["very easy", "easy", "medium", "hard", "very hard"];
      let learningObjects = [];
      
      for (let i = 0; i < 5; i++) {
        // const mcqPrompt = this.generateSingleTurnMCQPrompt(lessonText, levels[i]);
        let openAImcqResponse;
        let vertexAImcqResponse;
        try {
          const openAImcqPrompt = await this.generateMultiStageMCQPrompt(lessonText, levels[i], 'openAI');
          openAImcqResponse = await generateAndParseResponse(openAImcqPrompt, this.context.auth.accessToken, 'openAI');
          console.log(openAImcqResponse);

          const vertexAImcqPrompt = await this.generateMultiStageMCQPrompt(lessonText, levels[i], 'vertexAI');
          vertexAImcqResponse = await generateAndParseResponse(vertexAImcqPrompt, this.context.auth.accessToken, 'vertexAI');
          console.log(vertexAImcqResponse);
        } catch (error) {
          console.error('Error generating mcq:', error);
          continue; 
        }
  
        const mcqObject = new LearningObject("MCQ", "text/plain", "active", "questionnaire", "medium");
        mcqObject.setQuestionnaire(openAImcqResponse, vertexAImcqResponse);
        mcqObject.setAIGenerated();
        mcqObject.setDifficulty(levels[i]);
        learningObjects.push(mcqObject.getJSON());
      }
      return learningObjects;
    }

    generateQuizPrompt(lessonText, difficultyLevel) {
      const levelPrompt = this.getLevelPrompt(difficultyLevel);

      const quizPrompt = `You are a computer science lecturer at university. 
              Design a end-of-unit reflection quiz, with 5 one-sentence questions, 
              based on the lesson content, 
              that ${levelPrompt} \n\n

              Lesson Content:\n${lessonText}
              
              Format the response as a parsable json array 
              [ { "question" : "..." , "answer" : "..."} , ... ] `;
      //  return levels
      return quizPrompt;
    }; 

    async createQuiz(lessonText) {
      const levels = ["very easy", "easy", "medium", "hard", "very hard"];
      let learningObjects = [];

      for (let i = 0; i < 5; i++) {
        const quizPrompt = this.generateQuizPrompt(lessonText, levels[i]);
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
        quizObject.setDifficulty(levels[i]);
        learningObjects.push(quizObject.getJSON());
      }
      return learningObjects;
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

    generateChallengePrompt(lessonText, difficultyLevel) {
      const levelPrompt = this.getLevelPrompt(difficultyLevel);

      const challengePrompt = `You are a computer science lecturer at university.
      Create a challenge question for your students based on the lesson content.

      The challenge should require students to brainstorm, evaluate, and create a solution related to the lesson content.
      It should be a problem-solving exercise that ${levelPrompt} \n\n
      Make sure the challenge encourages students to apply their knowledge creatively to a real-world scenario outside of lesson content.

      Lesson Content:\n${lessonText}`; 

      return challengePrompt;
    }

    async createChallenge(lessonText) {
      const levels = ["very easy", "easy", "medium", "hard", "very hard"];
      let learningObjects = [];

      for (let i = 0; i < 5; i++) {
        const challengePrompt = this.generateChallengePrompt(lessonText, levels[i]);
        const openAIchallengeResponse = await generateTextResponse(challengePrompt, this.context.auth.accessToken, 'openAI');
        const vertexAIchallengeResponse = await generateTextResponse(challengePrompt, this.context.auth.accessToken, 'vertexAI');
  
        console.log(openAIchallengeResponse);
        console.log(vertexAIchallengeResponse);
  
        const challengeObject = new LearningObject("brainstorm", "text/plain", "active", "problem statement", "medium");
        // challengeObject.setText(challengeGeneratedResponse);
        challengeObject.setChallenge(openAIchallengeResponse, vertexAIchallengeResponse);
        challengeObject.setAIGenerated();
        challengeObject.setDifficulty(levels[i]);
        learningObjects.push(challengeObject.getJSON());
      }; 
      return learningObjects;
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
      console.log(res.data);
      return `Rewrite the following transcript in the format of lecture notes:
          // ${res.data}`
    }

    async createTranscript(learningObject){
      try {
        const title = learningObject.general.title; 
        const link = learningObject.content.video; 
        const videoId = getYoutubeId(link);

        const openAItranscriptPrompt = await this.generateSpeechToText(title, videoId, 'openAI');
        const openAItranscript = await generateTextResponse(openAItranscriptPrompt, this.context.auth.accessToken, 'openAI');

        const vertexAItranscriptPrompt = await this.generateSpeechToText(title, videoId, 'vertexAI');
        const vertexAItranscript = await generateTextResponse(vertexAItranscriptPrompt, this.context.auth.accessToken, 'vertexAI');

        await this.addTranscript(learningObject, openAItranscript, vertexAItranscript);

        const transcriptObject = new LearningObject(learningObject.general.title, "text/plain", "expositive", "narrative text", "low");
        
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
          const descriptionObject = new LearningObject(learningObject.general.title, "text/plain", "expositive", "narrative text", "low");
          
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
          if (generationFunction.name === "createMCQ" || 
              generationFunction.name === "createQuiz" || 
              generationFunction.name === "createChallenge") {
            createdObject.forEach(obj => newLearningObjects.push(obj));
          } else {
            newLearningObjects.push(createdObject);
          }
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
            // const ids = await this.uploadGeneratedContent(lessons[i]._learningObjects);
            // if (ids) {
            //   await this.addLearningObjectReferences(lessons[i]._id, ids);
            // }
          // }
          const ids = await this.uploadGeneratedContent(lessons[1]._learningObjects);
            if (ids) {
              await this.addLearningObjectReferences(lessons[1]._id, ids);
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