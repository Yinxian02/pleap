import { Component } from 'react';
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { LearningObject } from "./learningObject";

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

    parseResponse(text) {
      const startIndex = text.indexOf('[');
      const endIndex = text.lastIndexOf(']');
      const jsonArray = text.substring(startIndex, endIndex + 1);
  
      try {
        return JSON.parse(jsonArray);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    }

    async generateTextResponse(textPrompt) {
      // console.log(textPrompt);
      try {
        const response = await axios.post(
          'http://localhost:5001/vertex-ai/generateText', 
          { textPrompt: textPrompt},         
          {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.context.auth.accessToken,
                mode: 'cors',
                withCredentials: true,
            }
        });
        // console.log('Generated content:', response.data.predictions[0].content);
        return response.data.predictions[0].content;
      } catch (error) {
          console.error('Error:', error);
      }
    }

    async createMCQ(lessonText) {
      const mcqPrompt = `You are a computer science lecturer at university. 
      Create a list of 5 one-sentence multiple choice questions 
      based on the lesson content, 
      that test student understanding. \n\n
      
      Lesson Content:\n${lessonText}
      
      Format the response as a parsable json array for the MCQs as follows: 
      [ { "question" : "..." , 
          "choices" : [ { 
            "text": "...", 
            "value": 1 (if correct) 0 (if wrong)]}, 
            ... ] } ... ]`;

      let mcqGeneratedResponse;
      const maxAttempts = 3;
      let attempts = 0;
      let parsedResponse;

      while (attempts < maxAttempts) {
        try {
          mcqGeneratedResponse = await this.generateTextResponse(mcqPrompt);
          parsedResponse = this.parseResponse(mcqGeneratedResponse);
          console.log(parsedResponse);
          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            console.log("Failed to generate a parsable JSON MCQ.");
          }
        }
      }
      const mcqObject = new LearningObject("MCQ", "text/plain", "active", "questionnaire", "medium");
      mcqObject.setQuestionnaire(parsedResponse);
      return mcqObject.getJSON();
    }

    async createQuiz(lessonText) {
      const quizPrompt = `You are a computer science lecturer at university. 
      Design a end-of-unit reflection quiz based on the lesson content, 
      that test understanding, and provide correct answers \n\n
    
      Lesson Content:\n${lessonText}
      
      Format the response as a parsable json array 
       [ { "question" : "..." , "answer" : "..."} , ... ] `;
    
      let quizGeneratedResponse;
      const maxAttempts = 3;
      let attempts = 0;
      let parsedResponse;
      
      while (attempts < maxAttempts) {
        try {
          quizGeneratedResponse = await this.generateTextResponse(quizPrompt);
          parsedResponse = this.parseResponse(quizGeneratedResponse);
          console.log(parsedResponse);
          break;

        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            console.log("Failed to generate a parsable JSON reflection quiz.");
          }
        }
      }
      const quizObject = new LearningObject("reflection quiz", "text/plain", "active", "exercise", "medium");
      quizObject.setExercise(parsedResponse);
      return quizObject.getJSON();
    }

    async createGlossary(lessonText) {
      const glossaryPrompt = `You are a computer science lecturer  at university.
      Create a glossary of key terms based on the lesson content. \n\n

      Lesson Content:\n${lessonText}

      Format the response as a parsable json array
      [ { "term" : "..." , "definition" : "..."} , ... ] `;

      let glossaryGeneratedResponse;
      const maxAttempts = 3;
      let attempts = 0;
      let parsedResponse;

      while (attempts < maxAttempts) {
        try {
          glossaryGeneratedResponse = await this.generateTextResponse(glossaryPrompt);
          parsedResponse = this.parseResponse(glossaryGeneratedResponse);
          console.log(parsedResponse);
          break;

        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            console.log("Failed to generate a parsable JSON glossary.");
          }
        }
      }
      const glossaryObject = new LearningObject("glossary", "text/plain", "expositive", "narrative text", "low");
      glossaryObject.setGlossary(parsedResponse);
      return glossaryObject.getJSON();
    }

    async createChallenge(lessonText) {
      const challengePrompt = `You are a computer science lecturer at university.
      Create a brainstorm evaluation or creation
      challenge based on the lesson content. \n\n

      Lesson Content:\n${lessonText}`;

      const challengeGeneratedResponse = await this.generateTextResponse(challengePrompt);
      console.log(challengeGeneratedResponse);

      const challengeObject = new LearningObject("brainstorm", "text/plain", "active", "problem statement", "medium");
      challengeObject.setText(challengeGeneratedResponse);
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

    // create new narrative text object with audio, return json LO
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
          // console.log(res.data); 
          const transcriptPrompt = 
              `Rewrite the following transcript to make sense, in the format of lecture notes:
              // ${res.data}`
          const transcript = await this.generateTextResponse(transcriptPrompt); 
          return transcript;
        } catch (error) {
          console.error('Error generating transcript:', error);
        }
      }

    // create new narrative text object, return json LO 
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
      return res.data;
    } catch (error) {
      console.error('Error generating image:', error);
    }
    }

    async createLearningObjects(learningObjects) {
      const newLearningObjects = [];

      const lessonText = this.getAllLessonText(learningObjects);

      const generationFunctions = [
        // this.createMCQ,
        // this.createQuiz,
        // this.createGlossary,
        // this.createChallenge
      ];

      const createAndAddLearningObject = async (generationFunction, ...args) => {
        const createdObject = await generationFunction.apply(this, args);
        if (createdObject !== undefined) {
          newLearningObjects.push(createdObject);
        }
      };

      for (const generationFunction of generationFunctions) {
        await createAndAddLearningObject(generationFunction, lessonText);
      }

      for (const learningObject of learningObjects) {
        let creationFunction = null;
    
        switch (learningObject.educational.learningResourceType) {
          case "narrative text":
            // await this.uploadGeneratedAudio(learningObject);
            // break;
          case "lecture":
            // creationFunction = this.createTranscript;
            // break;
          case "slide":
            // creationFunction = this.createDescription;
            // break;
          default:
            break; 
        }
    
        if (creationFunction) {
          await createAndAddLearningObject(creationFunction, learningObject);
        }
      }
    }

    async fetchLessonLearningObjects(lessonID, ids) {
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
        //   console.log(res.data);
        const learningObjects = res.data; 
        this.createLearningObjects(learningObjects);

      } catch (error) {
        console.error('Error fetching learning objects:', error);
      }
    }

    componentDidMount() {
      axios
        .get(`http://localhost:5001/lessons/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.context.auth.accessToken,
          },
        })
        .then(res => {
          const lessons = res.data;
          for (let i = 0; i < lessons.length; i++) {
              this.fetchLessonLearningObjects(lessons[i]._id, lessons[i]._learningObjects);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    render(){
        return; 
    }
};

export default GenerateAIContent; 