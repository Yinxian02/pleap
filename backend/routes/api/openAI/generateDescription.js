require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI({
  organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateDescription(image, text) {
    console.log(image);
    const request = {
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: text },
              {
                type: "image_url",
                image_url: {
                  "url": image,
                },
              },
            ],
          },
        ],
      };

    try {
        const response = await openai.chat.completions.create(request);
        const generatedText = response.choices[0].message.content;
        console.log(response.choices[0]);
        
        if (generatedText) {
            // console.log(generatedText);
            return generatedText;
        } else {
            throw new Error('Generated text not found in the response.');
        }
    } catch (error) {
        console.error('Error generating description:', error);
        throw error;
    }
}

module.exports = { generateDescription };
