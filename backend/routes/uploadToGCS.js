const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'pleap24',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

async function uploadToGCS(localPath, bucketName, subfolder, filename) {
    const bucket = storage.bucket(bucketName);
    
    const exists = await bucket.exists();
    if (!exists[0]) {
        await storage.createBucket(bucketName);
        console.log(`Bucket '${bucketName}' created.`);
    }
    
    const destination = subfolder ? `${subfolder}/${filename}` : filename;
    await bucket.upload(localPath, {
        destination: destination,
    });

    console.log(`${localPath} uploaded to ${bucketName}/${destination}`);
}

module.exports = uploadToGCS;