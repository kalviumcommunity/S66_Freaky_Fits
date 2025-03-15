const express=require('express')
const router=express.Router()
const User=require('../models/schema');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const authenticate = require('../middlewares/authenticate');

router.get('/users',async(req,res)=>{
    try{
        const users=await User.find()
        res.status(200).json({"message":"Users retrieved successfully",users})
    }catch(error){
        res.status(500).json({'message':'Could not find the user'})
    }
})

router.post('/user',async(req,res)=>{
    try{
        const {username,email,password}=req.body
        if(!username || !email || !password){
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            })
        }
        const found = await User.findOne({ email });
        if (found) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            }); 
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({
            username,
            email,
            password:hashedPassword
        })
        await user.save()
        res.status(201).json({"message":"User created successfully",user})
    }catch(error){
        res.status(500).json({"message":"Couldn't create a new_user"})
    }
})

router.post('/login',async(req,res)=>{
    try{
    const {email,password}=req.body
    if (!email || !password){
        return res.status(400).json({
            message:"Something is Missing",
            success:"false"
        })
    }
    const found=await User.findOne({email})
    if(!found){
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false
        });
    }
    const isPassword=await bcrypt.compare(password, found.password)
    if (!password){
        return res.status(400).json({
            message: "Incorrect email or password",
            success: false
        });
    }
    const token=jwt.sign(
        {userID:found._id, email:found.email},
        process.env.SECRET_KEY,
        {expiresIn: '7d'}
    )
    return res.status(200).json({
        message:"Login Successfully",
        user: {id: found._id, email: found.email},
        success:true,
        token:token,
        user:found
    })
}catch(error){
    return res.status(500).json(error.message)
}
})

router.put('/users/:id', async(req, res)=>{
    try {
        const updated_user=await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updated_user){
            return res.status(404).json({"message":"User not found"})
        }
        res.status(200).json({"message":"User updated successfully", updated_user})
    } catch (error) {
        res.status(500).json({"message":"Could not update the user", error:error.message})
    }
})

router.delete('/users/:id', async(req, res)=>{
    try {
        const deleted_user=await User.findByIdAndDelete(req.params.id)
        if(!deleted_user){
            return res.status(404).json({"message":"User not found"})
        }
        res.status(200).json({"message":"User deleted seuccessfully", deleted_user})
    } catch (error) {
        res.status(500).json({"message":"Could not delete the user", error:error.message})
    }
})
// Assuming you're using Express.js
router.get('/users/:userId', async (req, res) => {
    const userId = req.params.userId; // Get the userId from URL parameter
    try {
        const user = await User.findById(userId)
      .populate({
        path: 'products', // Populate products (posts)
        populate: {
          path: 'user', // Populate the user details of each product
          select: 'username email' // Select specific fields (e.g., username, email)
        }
      }); // Populate the user's products (posts)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ posts: user.products }); // Send the products (posts) of the user
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user's posts", error });
    }
});

router.delete('/deleteAllUsers', async (req, res) => {
    try {
        const result = await User.deleteMany({}); 
        res.status(200).json({
            message: "All users deleted successfully",
            deletedCount: result.deletedCount  
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting users", error });
    }
});



module.exports=router