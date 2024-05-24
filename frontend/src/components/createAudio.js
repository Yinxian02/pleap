const generateAudio = require('../api/textToSpeech');

export async function createAudio(learningObjective) {
    try {
        const prompt = 'How are you doing today?';
        const result = await generateAudio(prompt);
        console.log('Generated content:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};