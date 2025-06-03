import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller";

const router = Router();

// POST crear nuevo producto
router.post('/productos', createProduct);

// GET todos los productos
router.get('/productos', getProducts);

export default router;