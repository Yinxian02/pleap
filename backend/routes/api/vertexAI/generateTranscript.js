const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = '/usr/local/bin/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);

const readline = require('readline');
const ytdl = require('ytdl-core');

const speech = require('@google-cloud/speech');
const uploadToGCS = require('../../uploadToGCS');

const client = new speech.SpeechClient();

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

async function convertMP3ToWAV(mp3Path, wavPath) {
    console.log("Converting MP3 to WAV");
    return new Promise((resolve, reject) => {
        ffmpeg(mp3Path)
            .toFormat('wav')
            .audioChannels(1) 
            .audioCodec('pcm_s16le')
            .on('end', resolve)
            .on('error', reject)
            .save(wavPath);
    });
}

async function transcribeAudio(gcsUri) {
    const audio = { 
        uri: gcsUri 
    };

    const config = {
        encoding: 'LINEAR16',
        // sampleRateHertz: 44100,
        languageCode: 'en-GB',
    };

    const request = { 
        audio: audio, 
        config: config 
    };

    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

    console.log(`Transcription: ${transcription}`);
    return transcription;
}; 


async function generateTranscript(title, youtubeID) {

    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const wavPath = `${__dirname}/audioWAV/${sanitizedTitle}.wav`; 
    const bucketName = 'pleap';
    const subfolder = 'transcripts-audio';
    const gcsUri = `gs://${bucketName}/${subfolder}/${sanitizedTitle}.wav`;

    try {
        const mp3Path = await youtubeToMP3(sanitizedTitle, youtubeID);
        console.log("MP3 Path: ", mp3Path);
        await convertMP3ToWAV(mp3Path, wavPath);
        await uploadToGCS(wavPath, bucketName, subfolder, `${sanitizedTitle}.wav`);
        const transcript = await transcribeAudio(gcsUri); 
        return transcript; 
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { generateTranscript }; 
