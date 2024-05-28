const axios = require('axios');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = '/usr/local/bin/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);
const readline = require('readline');
const ytdl = require('ytdl-core');
const { Storage } = require('@google-cloud/storage');
const speech = require('@google-cloud/speech');
const util = require('util');
const path = require('path');

const client = new speech.SpeechClient();
const storage = new Storage();

async function youtubeToMP3(youtubeID){
    let stream = ytdl(id, {
      quality: 'highestaudio',
    });
    
    let start = Date.now();
    ffmpeg(stream)
      .audioBitrate(128)
      .save(`${__dirname}/${youtubeID}.mp3`)
      .on('progress', p => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
      });
  }

async function downloadMP3(url, filename) {
    console.log("MP3 url:", url);
    console.log("Filename:", filename);

    const directoryPath = './audioMP3';
    const filePath = path.join(directoryPath, `${filename}.mp3`);

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, response.data);
        console.log(fs.writeFileSync(filePath, response.data));
        return filePath;
    } catch (error) {
        console.error('Error downloading MP3:', error);
        throw error;
    }
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

async function transcribeMP3(mp3Url) {
    try {
        const audio = { 
        uri: mp3Url 
        };
        const config = {
            encoding: 'MP3',
            sampleRateHertz: 44100, 
            languageCode: 'en-US'
        };
        const request = { 
            audio: audio, 
            config: config 
        };
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);
    return transcription;
    } catch (error) {
        console.error('Error:', error);
    }
}




async function makeTranscript(title, youtubeID) {
    const mp3Url = await youtubeToMP3(youtubeID);
    console.log(mp3Url);

    // const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    // console.log(sanitizedTitle); 

    // const mp3Path = `./audioMP3/${sanitizedTitle}.mp3`;
    // const wavPath = `./audioMP3/${sanitizedTitle}.wav`;
    // const bucketName = 'audioMP3';
    // const gcsUri = `gs://${bucketName}/${sanitizedTitle}}.wav`;

    try {
        ytToMP3(); 
        // await downloadMP3(mp3Url, sanitizedTitle)
        //     .then(() => console.log('Download completed'))
        //     .catch(error => console.error('Error downloading MP3:', error));
        // await convertMP3ToWAV(mp3Path, wavPath)
        //     .then(() => console.log('Conversion to wav completed'))
        //     .catch(error => console.error('Error converting to wav:', error));
        // await uploadToGCS(wavPath, bucketName, `${title}.wav`);
        // await generateTranscript(gcsUri); 
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { makeTranscript }; 
