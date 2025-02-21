const Products = require('../models/product');
const express = require('express');
const proRouter = express.Router();
const upload=require('../middlewares/upload')



// GET: Retrieve all products
proRouter.get('/products', async (req, res) => {
    try {
        const pro = await Products.find();
        res.status(200).json({ "message": "products retrieved successfully", pro });
    } catch (error) {
        res.status(500).json({ 'message': 'Could not find the products' });
    }
});

// POST: Create a new product
proRouter.post('/products', upload.single('image'),async (req, res) => {
    const {title,description,image}=req.body;
    console.log(title,description,image,req.body)
    try{
        const newProduct=new Products({
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.path:'',
        });
        const savedProduct=await newProduct.save()
        res.status(201).json({"message":"product created successfully", savedProduct})
    }catch(error){
        console.log(error);
        res.status(500).json({"message":'Could not create the product',error})
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

module.exports = proRouter;
