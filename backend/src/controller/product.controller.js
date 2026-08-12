import productModel from "../model/product.model.js";
import { deleteImageFromImageKit, uploadImageToImageKit } from "../services/imageKit/storage.service.js";

export async function createProductController(req, res) {
    let images;
    try {
        const sellerId = req.user._id;
        const { title, description, priceAmount, priceCurrency } = req.body;
         images = await Promise.all(req.files.map(async (file) => {
            const result = await uploadImageToImageKit(file.buffer, file.originalname, `snith/${sellerId}/products`);
            return {
                url: result.url,
                altText: file.originalname,
                fileId: result.fileId
            };
        }));
        const newProduct = new productModel({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency
            },
            images,
            sellerId
        });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    }catch (error) {
        if (images){
            for (const image of images) {
                await deleteImageFromImageKit(image.fileId);
            }
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}