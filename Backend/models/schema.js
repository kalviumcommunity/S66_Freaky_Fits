const mongoose=require('mongoose')
const { type } = require('os')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    password:{
        type:String,
        Required:true,
    }
})

module.exports=mongoose.model('user',userSchema)