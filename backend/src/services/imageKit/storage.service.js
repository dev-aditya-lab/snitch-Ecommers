import ImageKit from '@imagekit/nodejs';
import { config } from '../../config/env.js';

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadImageToImageKit(buffer, fileName, folder = "snith") {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })
    console.log(result)
    return result;
}

export async function deleteImageFromImageKit(fileId) {
    const result = await client.files.delete(fileId);
    console.log(result);
    return result;
}