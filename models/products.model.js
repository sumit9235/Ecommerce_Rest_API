const mongoose = require('mongoose')

const productSchema= mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productCategory:{
        type:String,
        required:true,
        enum: ['Cat-I', 'Cat-II', 'Cat-III', 'Cat-IV']
    },
    productDescription:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        reqiured:true
    },
    productAvailability:{
        type:Boolean
    }
},{
    versionKey:false
})

const ProductModel=mongoose.model("product",productSchema)

module.exports={
    ProductModel
}