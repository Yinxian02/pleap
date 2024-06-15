const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

const client = new textToSpeech.TextToSpeechClient();

async function generateAudio(text, title) {
    const request = {
        input: { text: text },
        voice: { languageCode: 'en-GB', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);

    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir);
    }
    
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = path.join(audioDir, `${sanitizedTitle}.mp3`);

    const writeFile = util.promisify(fs.writeFile);
    await writeFile(filename, response.audioContent, 'binary');

    console.log(`Audio content written to file: ${filename}`);
    return filename; 
}

module.exports = { generateAudio };