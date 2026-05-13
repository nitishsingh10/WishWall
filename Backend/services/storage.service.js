const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadImage(fileBuffer, fileName) {
    const response = await imagekit.upload({
        file: fileBuffer,        // buffer from multer memory storage
        fileName: fileName,      // original file name
        folder: '/wishwall'      // folder in ImageKit dashboard
    });

    return response.url;         // returns the public image URL
}

module.exports = { uploadImage };