const router = require('express').Router();
const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');
const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');
const path = require('path');

router.route('/generateText').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    const { instances, parameters, apiEndpoint, projectId, modelId } = req.body;

    const auth = new GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: "https://www.googleapis.com/auth/cloud-platform",
     });

    try {
        const client = await auth.getClient();
        // console.log(client)
        const accessToken = (await client.getAccessToken()).token;
        const data = { instances, parameters };
        console.log(data);
        
        const response = await fetch(
            `https://${apiEndpoint}/v1/projects/${projectId}/locations/us-central1/publishers/google/models/${modelId}:predict`, 
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    mode: 'cors',
                    withCredentials: true,
                },
                body: JSON.stringify(data)
            }
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log(result);
        
        res.status(200).send(result);
    } catch (error) {
        console.error('Error generating AI content:', error);
        res.status(500).send({ error: error.message });
    }
}); 

router.route('/textToSpeech').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    const text = req.body.text;
    console.log(text); 

    const title = req.body.title;
    console.log(title); 

    const client = new textToSpeech.TextToSpeechClient();

    async function generateAudio(text, title) {
        const request = {
            input: { text: text },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
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

    try {
        const filename = await generateAudio(text, title);
        res.status(200).json({ message: 'Audio generated successfully.' , filename: filename });
    } catch (error) {
        console.error('Error generating audio:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;