const generateText = require('../api/gemini');

export async function createMCQ(learningObjective) {
    try {
        const prompt = 'How are you doing today?';
        const result = await generateText(prompt);
        console.log('Generated content:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};