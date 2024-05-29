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
        // console.log(allText); 
        return allText; 
    }; 

    async generateTextResponse(textPrompt) {
      console.log(textPrompt);
      try {
        const response = await axios.post('http://localhost:5001/vertex-ai/generateText', {
                instances: [{ content: textPrompt}],
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

    async createMCQ(learningObjects) {
      const lessonText = this.getAllLessonText(learningObjects);

      const prompt = `You are a computer science teacher teaching [topic]. 
      You have the following lesson content. 
      Create a list of 10 multiple choice questions based on the lesson content, 
      that test understanding, and provide correct answers \n\n
      Lesson Content:\n${lessonText}`;
      
      this.generateTextResponse(prompt); 
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
          console.log(res.data); 
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
          // this.createMCQ(learningObjects);

          for (let i = 0; i < learningObjects.length; i++) {
            if (learningObjects[i].technical.format === "text/plain"){ 
              // this.createAudio(learningObjects[i]); 
            } else if (learningObjects[i].technical.format === "video/vnd.youtube.yt") {
              this.createTranscript(learningObjects[i]); 
              break; // comment after
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