import { Component } from 'react';
import axios from 'axios';
import AuthContext from "../context/AuthContext";
// import { createMCQ } from "./createMCQ";
// import { sendRequest, writeResponseLocally } from "../api/utils/google-foundation-models";

class GenerateAIContent extends Component{
    static contextType = AuthContext;
    
    async createMCQ(lessonText) {
      try {
          const prompt = `You are a computer science teacher teaching [topic]. 
          You have the following lesson content. 
          Create a list of 10 multiple choice questions based on the lesson content, 
          that test understanding, and provide correct answers \n\n
          Lesson Content:\n${lessonText}`;

          const response = await axios.post('http://localhost:5001/vertex-ai/generate', {
              instances: [{ content: prompt}],
              parameters: { temperature: 0.2, maxOutputTokens: 1024 },
              apiEndpoint: 'us-central1-aiplatform.googleapis.com',
              projectId: 'pleap24',
              modelId: 'text-bison@001'
          }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.context.auth.accessToken,
              mode: 'cors',
              withCredentials: true,
          }
          });

          console.log('Generated content:', response.data);
      } catch (error) {
          console.error('Error:', error);
      }
  }
    getAllLessonText(learningObjects) {
        var allText = "";
        for (let i = 0; i < learningObjects.length; i++) {
            if (learningObjects[i].content.text !== null){
                allText += learningObjects[i].content.text;
            }
        }
        console.log(allText); 
        this.createMCQ(allText);
        
    }; 

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
          this.getAllLessonText(res.data);

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
            console.log(res.data);
            // this.setState({ lesson: res.data });
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