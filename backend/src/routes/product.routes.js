import { Router } from "express";
import multer from "multer";
const ProductRouter = Router();
import { authenticateSeller } from "../middleware/auth.middleware.js";
import { createProductController } from "../controller/product.controller.js";
import { validateCreateProduct } from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
})

ProductRouter.post("/create", validateCreateProduct, upload.array("images", 7), authenticateSeller, createProductController);

export default ProductRouter;