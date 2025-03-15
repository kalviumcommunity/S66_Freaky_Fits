const Products = require('../models/product');
const express = require('express');
const proRouter = express.Router();
const upload=require('../middlewares/upload')
const authenticate=require("../middlewares/authenticate")
const User=require("../models/schema")



// GET: Retrieve all products
proRouter.get('/products', async (req, res) => {
    try {
        const pro = await Products.find().populate('user');
        res.status(200).json({ "message": "products retrieved successfully", pro });
    } catch (error) {
        res.status(500).json({ 'message': 'Could not find the products' });
    }
});

// POST: Create a new product
proRouter.post('/products', authenticate, upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.userID;  // Access userID from req.user

    // Log for debugging purposes
    console.log('Request Body in POST /products:', req.body);
    console.log('UserID extracted from authenticate middleware:', userId);

    try {
        const newProduct = new Products({
            title,
            description,
            image: req.file ? req.file.path : '', // Handle image upload
            user: userId  // Assign the userId to the product
        });

        // Save the product
        const savedProduct = await newProduct.save();

        // Find the user by ID
        const user = await User.findById(userId);  
        
        // Push only the product ID (savedProduct._id) to the user's products array
        user.products.push(savedProduct._id); 
        
        console.log(user.products); // For debugging: print user's products array
        
        // Save the updated user with the new product reference
        await user.save();
        
        // Send the success response
        res.status(201).json({
            message: "Product created successfully",
            savedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not create the product', error: error.message });
    }
});

// PUT: Update an existing product
proRouter.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ "message": "product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ 'message': 'Could not update the product' });
    }
});

// DELETE: Delete an existing product
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
        const result = await Products.deleteMany({});  // Empty filter deletes all documents
        res.status(200).json({
            message: "All products deleted successfully",
            deletedCount: result.deletedCount  // Shows how many users were deleted
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting users", error });
    }
});

module.exports = proRouter;
