require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI({
  organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
  apiKey: 'sk-proj-O8ytqqcswrZ1EdVcnt7HT3BlbkFJt7jJxqAEMWi3oALdoKLz',
});

async function generateText(text) {
    const request = {
        // contents: [{role: 'user', parts: [{text: text}]}],
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: text }]
    };

    try {
        const response = await openai.chat.completions.create(request);
        // const aggregatedResponse = await response.response;
        // const candidates = aggregatedResponse?.candidates;
        console.log(response.choices[0].message.content);
        const generatedText = response.choices[0].message.content;
        
        if (generatedText) {
            console.log(generatedText);
            return generatedText;
        } else {
            throw new Error('Generated text not found in the response.');
        }
    } catch (error) {
        console.error('Error generating text:', error);
        throw error;
    }
}

module.exports = { generateText };
