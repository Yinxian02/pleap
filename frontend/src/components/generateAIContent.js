import { Component } from 'react';
import axios from 'axios';
import AuthContext from "../context/AuthContext";

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
    }; 

    async generateTextResponse(textPrompt) {
      console.log(textPrompt);
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
        console.log('Generated content:', response.data.predictions[0].content);
        return response.data.predictions[0].content;
      } catch (error) {
          console.error('Error:', error);
      }
    }

    async createMCQ(lessonText) {
      const mcqPrompt = `You are a computer science lecturer. 
      You have the following lesson content. 
      Create a list of 10 multiple choice questions based on the lesson content, 
      that test understanding, and provide the correct answers to each question. \n\n
      Lesson Content:\n${lessonText}`;
      
      const mcqGeneratedResponse = await this.generateTextResponse(mcqPrompt); 

      const jsonPrompt = `Format these in the format of json array
      questions = [ { question : "" , choices : [ { text: "", value: 1 (if correct) 0 (if wrong)]}, ... ] 
      MCQs: \n\n ${mcqGeneratedResponse}`

      const jsonGeneratedResponse = await this.generateTextResponse(jsonPrompt);

      console.log(jsonGeneratedResponse);
      return jsonGeneratedResponse;
    }

    async createExercise(lessonText) {
      const exercisePrompt = `You are a computer science lecturer. 
      You have the following lesson content. 
      Design a end-of-unit exercise based on the lesson content, 
      that test understanding, and provide correct answers \n\n

      Lesson Content:\n${lessonText}`;
      
      const exerciseGeneratedResponse = await this.generateTextResponse(exercisePrompt); 

      const jsonPrompt = `Format these in the format of json array
      questions = [ { question : "" , answer : ""} , ... ]
      Exercise: \n\n ${exerciseGeneratedResponse}`

      const jsonGeneratedResponse = await this.generateTextResponse(jsonPrompt);
    
      console.log(jsonGeneratedResponse);
      return jsonGeneratedResponse;
    }

    async createAudio(learningObject){
      try {
        const title = learningObject.general.title; 
        console.log(title); 

        const text = learningObject.content.text; 
        console.log(text); 

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
      return res.data.audio;
    } catch (error) {
      console.error('Error generating audio:', error);
    }
    }

    async createTranscript(learningObject){
      try {
        const title = learningObject.general.title; 
        const link = learningObject.content.link; 

        const videoId = getYoutubeId(link);
        console.log(videoId); 

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
          this.generateTextResponse(transcriptPrompt); 
        } catch (error) {
          console.error('Error generating transcript:', error);
        }
      }

    async createDescription(learningObject){  
      try {
        const title = learningObject.general.title; 
        console.log(title); 

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
    } catch (error) {
      console.error('Error generating image:', error);
    }
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
      //   console.log(res.data);
        const learningObjects = res.data; 
        const lessonText = this.getAllLessonText(learningObjects);
        // this.createMCQ(lessonText);
        // this.createExercise(lessonText);

        for (let i = 0; i < learningObjects.length; i++) {
          // console.log(learningObjects[i].educational.learningResourceType);
          if (learningObjects[i].educational.learningResourceType === "narrative text" || learningObjects[i].educational.learningResourceType === "problem statement") {
            // this.createAudio(learningObjects[i]); 
            // break;  // comment after
          } else if (learningObjects[i].educational.learningResourceType === "lecture") {
            // this.createTranscript(learningObjects[i]); 
            // break; // comment after
          } else if (learningObjects[i].educational.learningResourceType === "slide") {
            // this.createDescription(learningObjects[i]);
            // break; // comment after
          }
      } 

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
            for (let i = 0; i < res.data.length; i++) {
                this.fetchLearningObjects(res.data[i]._learningObjects);
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