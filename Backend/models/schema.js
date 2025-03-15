const mongoose=require('mongoose')
const { type } = require('os')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products', 
    }],
})

module.exports=mongoose.model('user',userSchema)