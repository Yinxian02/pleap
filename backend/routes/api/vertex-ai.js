const router = require('express').Router();
const { GoogleAuth } = require('google-auth-library');
// const fetch = require('node-fetch');
const fs = require('fs');
const ROLES_LIST = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/generate').post(verifyRoles(ROLES_LIST.User), async (req, res) => {
    const { instances, parameters, apiEndpoint, projectId, modelId } = req.body;

    if (!instances || !parameters || !apiEndpoint || !projectId || !modelId) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

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
        
        // Write response to file (optional)
        // const outputDir = path.join(__dirname, "../../examples_output");
        // if (!fs.existsSync(outputDir)){
        //     fs.mkdirSync(outputDir);
        // }
        // fs.writeFileSync(path.join(outputDir, `${modelId}.json`), JSON.stringify(result));
        
        res.status(200).send(result);
    } catch (error) {
        console.error('Error generating AI content:', error);
        res.status(500).send({ error: error.message });
    }
}); 

module.exports = router;