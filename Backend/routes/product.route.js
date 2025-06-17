const Products = require('../models/product');
const express = require('express');
const proRouter = express.Router();
const upload=require('../middlewares/upload')
const authenticate=require("../middlewares/authenticate")
const User=require("../models/schema")




proRouter.get('/products', async (req, res) => {
    try {
        const pro = await Products.find().populate('user');
        res.status(200).json({ "message": "products retrieved successfully", pro });
    } catch (error) {
        res.status(500).json({ 'message': 'Could not find the products' });
    }
});


proRouter.post('/products', authenticate, async (req, res) => {
    const { title, description,image } = req.body;
    const userId = req.user.userID;  


    console.log('Request Body in POST /products:', req.body);
    console.log('UserID extracted from authenticate middleware:', userId);

    try {
        const newProduct = new Products({
            title,
            description,
            image,
            user: userId 
        });

        const savedProduct = await newProduct.save();

        
        const user = await User.findById(userId);  
        
        
        user.products.push(savedProduct._id); 
        
        console.log(user.products); 
        
        
        await user.save();
        
        
        res.status(201).json({
            message: "Product created successfully",
            savedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not create the product', error: error.message });
    }
});


proRouter.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ "message": "product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ 'message': 'Could not update the product' });
    }
});


proRouter.delete('/products/:id', async (req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({ "message": "product deleted successfully" });
    } catch (error) {
        res.status(500).json({ 'message': 'Could not delete the product' });
    }
});
proRouter.delete('/deleteAllProducts', async (req, res) => {
    try {
        const result = await Products.deleteMany({});  
        res.status(200).json({
            message: "All products deleted successfully",
            deletedCount: result.deletedCount  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting users", error });
    }
});

module.exports = proRouter;
