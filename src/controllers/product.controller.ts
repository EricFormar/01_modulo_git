import { Request, Response } from "express";
import { Product } from "../models/Product";
import products from "../data/products";

const createProduct = (req: Request, res: Response) => {
    const newProduct: Product = {
        id: products.length + 1,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

export {
    createProduct
}