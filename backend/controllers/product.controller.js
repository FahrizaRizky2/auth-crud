import mongoose from "mongoose";
import Product from '../models/product.model.js';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) =>{
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Isi Semua Form" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save(); //save to DB
        res.status(201).json({ success:true, data: newProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" })
    }

    try {
       const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
       res.status(200).json({ success: true, message: "Product Terupdate" })
    } catch (error) {
        console.log("error in updating products", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" })
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Terhapus" })
    } catch (error) {
        console.log("error in delete products", error.message);
        res.status(500).json({ success: false, message: "Server Error" })    }    
};