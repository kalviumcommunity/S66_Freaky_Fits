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

app.get("/",async(req,res)=>{
    try {
        await connection;
        res.send("Connected to mongoDB atlas")
    } catch (error) {
        res.send("Database connection failed" ,error)
    }
})

const PORT=8080
app.listen(PORT,async()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})