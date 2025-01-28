const express = require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const mongoURL = process.env.URL;
const connection=mongoose.connect(mongoURL)
const user=require('./models/schema')
app.use(express.json())

app.get("/ping",(req,res)=>{
    res.send("Pong")
})

app.post("/create",async(req,res)=>{
    const {username, email,password}=req.body;
    let payload={username, email,password};
    console.log(payload)
    try{
    let newUser=new user(payload)
    await newUser.save()
    res.send({"message":"Hurray! New user saved to Database successfully"})
    }catch(error){
        console.log(error)
        res.send({"message":"Could'nt save the new user to database",error:error.message})
    }
})

const PORT=8080
app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to mongoDB atlas")
    } catch (error) {
        console.log(error)
    }
    
    console.log(`Server is running on http://localhost:${PORT}`);
})