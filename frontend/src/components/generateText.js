import axios from "axios";

const generateTextResponse = async (textPrompt, accessToken, apiType) => {
    console.log(`Generating text response for ${apiType}...`)
    try {
        const response = await axios.post(
            `http://localhost:5001/${apiType}/generateText`,
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
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
};

export { generateTextResponse } ;
