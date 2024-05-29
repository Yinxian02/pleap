const { VertexAI } = require('@google-cloud/vertexai');
const axios = require('axios');

async function getBase64(url) {
    const image = await axios.get(url, {responseType: 'arraybuffer'});
    return Buffer.from(image.data).toString('base64');
}

async function generateDescription(image, text) {
    const imageBase64 = await getBase64(image);

    const vertexAI = new VertexAI(
                      {   project: 'pleap24', 
                          location: 'us-central1' 
                      });

  const generativeVisionModel = vertexAI.getGenerativeModel({
    model: 'gemini-1.0-pro-vision-001',
  });

  const request = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType: 'image/png',
            },
          },
          {
            text: text,
          },
        ],
      },
    ],
  };

  const response = await generativeVisionModel.generateContent(request);
  const aggregatedResponse = await response.response;
  const fullTextResponse = aggregatedResponse.candidates[0].content.parts[0].text;
  console.log(fullTextResponse);
}

module.exports = { generateDescription };