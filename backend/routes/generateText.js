const { VertexAI } = require('@google-cloud/vertexai');

async function generateText(text) {
    const vertexAI = new VertexAI({
        project: 'pleap24',
        location: 'us-central1'
    });

    const generativeModel = vertexAI.getGenerativeModel({
        model: 'gemini-1.0-pro-vision-001'
    });

    const request = {
        contents: [{role: 'user', parts: [{text: text}]}],
    };

    try {
        const response = await generativeModel.generateContent(request);
        const aggregatedResponse = await response.response;
        const candidates = aggregatedResponse?.candidates;

        if (candidates && candidates.length > 0) {
            const generatedText = candidates[0]?.content?.parts[0]?.text;
            if (generatedText) {
                console.log(generatedText);
                return generatedText;
            } else {
                throw new Error('Generated text not found in the response.');
            }
        } else {
            throw new Error('No candidates found in the response.');
        }
    } catch (error) {
        console.error('Error generating text:', error);
        throw error;
    }
}

module.exports = { generateText };
