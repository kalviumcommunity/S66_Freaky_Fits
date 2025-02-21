const mongoose=require('mongoose')
// const { type } = require('os')
const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('Products',productSchema)