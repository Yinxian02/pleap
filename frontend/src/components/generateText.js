import axios from "axios";

const generateTextResponse = async (textPrompt, accessToken) => {
    try {
        const response = await axios.post(
            'http://localhost:5001/vertex-ai/generateText',
            { textPrompt: textPrompt },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                    mode: 'cors',
                    withCredentials: true,
                },
            }
        );
        return response.data.predictions[0].content;
    } catch (error) {
        console.error('Error:', error);
    }
};

export { generateTextResponse } ;
