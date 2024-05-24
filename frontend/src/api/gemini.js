const {
    // FunctionDeclarationSchemaType,
    // HarmBlockThreshold,
    // HarmCategory,
    VertexAI
} = require('@google-cloud/vertexai');
  
const project = 'pleap24';
const location = 'us-central1';
const textModel =  'gemini-1.0-pro';
//   const visionModel = 'gemini-1.0-pro-vision';

const vertexAI = new VertexAI({project: project, location: location});
  
// Instantiate Gemini models
const generativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    // safetySettings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
    generationConfig: {maxOutputTokens: 256},
  });
  
//   const generativeVisionModel = vertexAI.getGenerativeModel({
//       model: visionModel,
//   });
  
//   const generativeModelPreview = vertexAI.preview.getGenerativeModel({
//       model: textModel,
//   });
  
async function generateText(prompt) {
  const request = {
    contents: [{role: 'user', parts: [{text: prompt}]}],
  };

  try {
    const result = await generativeModel.generateContent(request);
    const response = result.response;

    const textContent = response.candidates[0].content.parts[0].text;
    // console.log('Response: ', JSON.stringify(textContent));
    return textContent;

  } catch (error) {
    console.error('Error generating content:', error);
    // throw error;
  }
};

module.exports = generateText;