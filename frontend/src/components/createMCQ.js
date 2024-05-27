import axios from 'axios';

async function createMCQ(lessonText, context) {
    try {
        const prompt = `You are a computer science teacher teaching [topic]. 
        You have the following lesson content. 
        Create a list of 10 multiple choice questions based on the lesson content, 
        that test understanding, and provide correct answers.\n\n
        Lesson Content:\n${lessonText}`;

        const response = await axios.post('http://localhost:5001/vertex-ai/generate', {
            instances: [{ content: prompt}],
            parameters: { temperature: 0.2, maxOutputTokens: 1024 },
            apiEndpoint: 'us-central1-aiplatform.googleapis.com',
            projectId: 'pleap24',
            modelId: 'gemini-1.0-pro-002'
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + context.auth.accessToken,
            mode: 'cors',
            withCredentials: true,
        }
        });

        console.log('Generated content:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export { createMCQ };