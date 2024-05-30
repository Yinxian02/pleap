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
        // console.log('Generated content:', response.data.predictions[0].content);
        return response.data.predictions[0].content;
      } catch (error) {
          console.error('Error:', error);
      }
    }

    async createMCQ(lessonText) {
      const mcqPrompt = `You are a computer science lecturer. 
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
      
      const mcqGeneratedResponse = await this.generateTextResponse(mcqPrompt); 
      return this.parseResponse(mcqGeneratedResponse);
    }

    async createExercise(lessonText) {
      const exercisePrompt = `You are a computer science lecturer. 
      Design a end-of-unit exercise based on the lesson content, 
      that test understanding, and provide correct answers \n\n

      Lesson Content:\n${lessonText}
      
      Format the response as a parsable json array 
       [ { "question" : "..." , "answer" : "..."} , ... ] `;
      
      const exerciseGeneratedResponse = await this.generateTextResponse(exercisePrompt); 
      const jsonData = exerciseGeneratedResponse.replace(/```json|```/g, '').trim();
      console.log(jsonData); 
      return JSON.parse(jsonData);
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
      // console.log(res.data.audio); 
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
        // console.log(videoId); 

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

    async createDescription(learningObject){  
      try {
        const imageUrl = learningObject.content.link; 
        // console.log(imageUrl); 

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
      // console.log(res.data); 
      return res.data;
    } catch (error) {
      console.error('Error generating image:', error);
    }
    }

    async fetchLessonLearningObjects(ids) {
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

        // const mcq = await this.createMCQ(lessonText);
        // console.log(mcq);

        // const exercise = this.createExercise(lessonText);

        for (let i = 0; i < learningObjects.length; i++) {
          // console.log(learningObjects[i].educational.learningResourceType);
          if (learningObjects[i].educational.learningResourceType === "narrative text" || learningObjects[i].educational.learningResourceType === "problem statement") {
              // const audio = await this.createAudio(learningObjects[i]); 
              // console.log(audio);
              // break;  // comment after
          } else if (learningObjects[i].educational.learningResourceType === "lecture") {
            // const transcript = await this.createTranscript(learningObjects[i]); 
            // console.log(transcript);
            // break; // comment after
          } else if (learningObjects[i].educational.learningResourceType === "slide") {
            // const description = await this.createDescription(learningObjects[i]);
            // console.log(description);
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
              this.fetchLessonLearningObjects(res.data[i]._learningObjects);
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