const axios = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const util = require('util');

const client = new speech.SpeechClient();
const storage = new Storage();

async function youtubeToMP3(youtubeLink){
    const options = {
      method: 'GET',
      url: 'https://youtube-mp315.p.rapidapi.com/',
      params: {
        url: youtubeLink
      },
      headers: {
        'x-rapidapi-key': '674ca8fba3msh69f037974705d9ap1fa5d1jsn32c64eb6bbff',
        'x-rapidapi-host': 'youtube-mp315.p.rapidapi.com'
      }
    };
    try {
      const response = await axios.request(options);
      console.log(response.data.result[0]);
      return response.data.result[0];
    } catch (error) {
      console.error(error);
      throw error;  
    }
  }

async function downloadMP3(url, filename) {
    const path = `./audio/${filename}.mp3`;
    if (!fs.existsSync('./audio')) {
        fs.mkdirSync('./audio');
    }
    const writer = fs.createWriteStream(path);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function convertMP3ToWAV(mp3Path, wavPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(mp3Path)
            .toFormat('wav')
            .audioCodec('pcm_s16le')
            .on('end', resolve)
            .on('error', reject)
            .save(wavPath);
    });
}

async function uploadToGCS(localPath, bucketName, destination) {
    await storage.bucket(bucketName).upload(localPath, {
        destination: destination,
    });
    console.log(`${localPath} uploaded to ${bucketName}/${destination}`);
}

async function generateTranscript(gcsUri) {
    const audio = { uri: gcsUri };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    };
    const request = { audio: audio, config: config };
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: ${transcription}`);
    return transcription;
}

async function createTranscript(mp3Url) {
    const title = "my_audio_file";
    const mp3Path = `./audio/${title}.mp3`;
    const wavPath = `./audio/${title}.wav`;
    const bucketName = 'your-gcs-bucket-name';
    const gcsUri = `gs://${bucketName}/${title}.wav`;

    try {
        await downloadMP3(mp3Url, title);
        await convertMP3ToWAV(mp3Path, wavPath);
        await uploadToGCS(wavPath, bucketName, `${title}.wav`);
        await generateTranscript(gcsUri);
    } catch (error) {
        console.error('Error:', error);
    }
}

export { createTranscript }; 
