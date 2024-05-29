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

async function youtubeToMP3(title, youtubeID){
    let stream = ytdl(youtubeID, {
      quality: 'highestaudio',
    });
    
    const filePath = `${__dirname}/audioMP3/${title}.mp3`; 
    let start = Date.now();
    ffmpeg(stream)
      .audioBitrate(128)
      .save(filePath)
      .on('progress', p => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
    })
    .on('end', () => {
        console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
      });
    return filePath;
}

async function transcribeAudio(title, mp3File) {
    const output = `${__dirname}/audioWAV/${title}.wav`; 
  
    // Convert MP3 to WAV
    ffmpeg(mp3File)
      .toFormat('wav')
      .on('error', (err) => {
        console.error('Error converting file:', err);
      })
      .on('end', async () => {
        console.log('File has been converted successfully');
  
        const file = fs.readFileSync(output);
        const audioBytes = file.toString('base64');
  
        const audio = {
          content: audioBytes,
        };
  
        const config = {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
        };
  
        const request = {
          audio: audio,
          config: config,
        };
  
        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        console.log('Transcription: ', transcription);
      })
      .save(output);
};




async function makeTranscript(title, youtubeID) {
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    // console.log(sanitizedTitle); 

    try {
        const mp3Path = await youtubeToMP3(sanitizedTitle, youtubeID);
        console.log(mp3Path);

        await transcribeAudio(sanitizedTitle, mp3Path); 
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { makeTranscript }; 
