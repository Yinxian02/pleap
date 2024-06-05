const fs = require('fs');
const util = require('util');
const path = require('path');

const { OpenAI } = require('openai');

const openai = new OpenAI({
    organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
    apiKey: process.env.OPENAI_API_KEY,
  });

async function generateAudio(text, title) {
    const request = {
        model: "tts-1",
        voice: "alloy",
        input: text,
    };

    const response = await openai.audio.speech.create(request);
    const bufferMP3 = Buffer.from(await response.arrayBuffer());

    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir);
    }
    
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = path.join(audioDir, `${sanitizedTitle}.mp3`);

    await fs.promises.writeFile(filename, bufferMP3);

    console.log(`Audio content written to file: ${filename}`);
    return filename; 
}

module.exports = { generateAudio };