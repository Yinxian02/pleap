

const { OpenAI } = require('openai');

const openai = new OpenAI({
    organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
    apiKey: process.env.OPENAI_API_KEY,
  });

async function generateTranscript(title, mp3Path) {
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(mp3Path),
            model: "whisper-1",
            response_format: "text",
        });

        console.log(transcription.text);
        const transcript = transcription.text; 

        return transcript; 
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { generateTranscript }; 