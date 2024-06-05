const router = require('express').Router();

const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

const uploadToGCS = require('../uploadToGCS');

// const { generateAudio } = require('./vertexAI/generateAudio');
// const { generateTranscript } = require('./vertexAI/generateTranscript');
// const { generateDescription } = require('./vertexAI/generateDescription');
// const { generateText } = require('./vertexAI/generateText');

const { generateAudio } = require('./openAI/generateAudio');
const { generateTranscript } = require('./openAI/generateTranscript');
const { generateDescription } = require('./openAI/generateDescription');
const { generateText } = require('./openAI/generateText');

router.route('/textToSpeech').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    const text = req.body.text;
    console.log(text); 

    const title = req.body.title;
    console.log(title); 
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    try {
        const filename = await generateAudio(text, sanitizedTitle);
        const bucketName = 'pleap';
        const subfolder = 'generated-audio';
        const gcsUri = `https://storage.googleapis.com/${bucketName}/${subfolder}/${sanitizedTitle}.mp3`;
        
        await uploadToGCS(filename, bucketName, subfolder, `${sanitizedTitle}.mp3`);
        console.log(gcsUri);

        res.status(200).json({ message: 'Audio generated successfully.', audio: gcsUri});
    } catch (error) {
        console.error('Error generating audio:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.route('/speechToText').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    try {
        const transcript = await generateTranscript(req.body.title, req.body.videoId); 
        res.status(200).send(transcript);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.route('/imageToText').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    try {
        const description = await generateDescription(req.body.imageUrl, req.body.lecturePrompt); 
        res.status(200).send(description);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.route('/generateText').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    // console.log(req.body.textPrompt);
    try {
        const text = await generateText(req.body.textPrompt); 
        // console.log(text);
        res.status(200).send(text);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = router;