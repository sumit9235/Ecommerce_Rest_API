const express=require('express')
const { ProductModel } = require('../models/products.model')
const { authenticate } = require('../Middlewares/authentication')
const productRouter=express.Router()

productRouter.post("/addproduct",authenticate,async(req,res)=>{
    const{productName,productCategory,productDescription,productPrice,productAvailablity}=req.body
    try {
        const data = new ProductModel({productName,productCategory,productDescription,productPrice,productAvailablity})
        await data.save()
        res.status(200).send("Product added successfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// change the availability of products
productRouter.put('/availability/:productId',authenticate, async (req, res) => {
  const productId = req.params.productId;
  const availability=req.body.productAvailability;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.productAvailability = availability;
    const updatedProduct = await product.save();
    return res.status(200).json({ message: 'Product availability updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error toggling product availability:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


productRouter.get('/categories',authenticate, async (req, res) => {
  try {
    const categories = await ProductModel.distinct('productCategory');
    res.status(200).send({ categories });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


productRouter.get("/getcategories/:id",authenticate, async (req, res) => {
    const cat_id = req.params.id;
    try {
      const data = await ProductModel.find({ productCategory: cat_id });
      res.status(200).send({ "List": data });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  productRouter.get("/getproduct/:id",authenticate,async(req,res)=>{
    let id = req.params.id;
    try {
        const data = await ProductModel.find({_id:id})
        res.status(200).send({"Product":data})
    } catch (error) {
        res.status(500).send(error.message)
    }
  })



module.exports={
   productRouter 
}