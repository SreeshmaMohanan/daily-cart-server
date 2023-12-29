const { json } = require('express')
const products=require('../Models/productsModel')

//get all products
exports.getAllProductsController=async(req,res)=>{
    try{
        const allProducts=await products.find()
        res.status(200).json(allProducts)
    }catch{
        res.status(401).json({message:"No Products Found"})
    }
    
}
exports.getProductController=async(req,res)=>{
    const {id}=req.params
    try {
        const product = await products.findOne({id})
        res.status(200).json(product)
    } catch (error) {
        res.status(401).json(error)
    }

}