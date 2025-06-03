import { Router } from "express";
import { createProduct } from "../controllers/product.controller";

const router = Router();

// POST crear nuevo producto
router.post('/productos', createProduct);


export default router;