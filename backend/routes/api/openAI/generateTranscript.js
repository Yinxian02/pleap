const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = '/usr/local/bin/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);

const readline = require('readline');
const ytdl = require('ytdl-core');
const fs = require('fs');

const { OpenAI } = require('openai');

const openai = new OpenAI({
    organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
    apiKey: process.env.OPENAI_API_KEY,
  });

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

async function generateTranscript(title, youtubeID) {
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    try {
        const mp3Path = await youtubeToMP3(sanitizedTitle, youtubeID);
        console.log("MP3 Path: ", mp3Path);

        const transcript = await openai.audio.transcriptions.create({
            file: fs.createReadStream(mp3Path),
            model: "whisper-1",
            response_format: "text",
        });

        console.log(transcript);
        return transcript; 
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { generateTranscript }; 