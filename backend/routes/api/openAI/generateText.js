require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI({
  organization: '',
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateText(text) {
    const request = {
        model: "gpt-4o",
        messages: [{ role: "user", content: text }]
    };

    try {
        const response = await openai.chat.completions.create(request);
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
