const express = require('express');
const router = express.Router()
const { AddCategory } = require('../Controller/categoryController');
const { postColor } = require('../Controller/colorController');
const {isUserLoggedIn} = require('../Controller/authController')
const {postProductData,getAllProducts,updaetTheProduct, deleteProduct, getOneProduct,getSearch, getProductDetails,searchCategory} = require("../Controller/productController");
// const app=express();

router.get('/searchCategory/:cat',(req,res)=>{
    searchCategory(req,res);
})
router.post('/newProduct',(req,res)=>{
    console.log(req.body)
    postProductData(req.body)
    res.send("Product added")
})
router.get('/AllProducts',(req,res)=>{
    getAllProducts(req,res);
})
router.get('/getProductDetails/:id',(req,res)=>{
    getProductDetails(req,res);
})
router.post('/newColor',(req,res)=>{
    console.log(req.body)
    postColor(req.body)
    res.send("Color Added");
})
router.post("/SearchProduct",(req,res,next)=>{
    getSearch(req.body,res,next,req)
})
router.post('/newCategory',(req,res)=>{
    console.log(req.body)
    AddCategory(req.body)
    res.send("New Category added")
})
router.put('/updateProduct/:id',(req,res,next)=>{
    isUserLoggedIn(req,res,next);
    updaetTheProduct(req,res,next);
})
router.put('/deleteProduct/:id',(req,res,next)=>{
    deleteProduct(req,res,next)
})
router.get('/getOneProduct/:id',(req,res,next)=>{
    getOneProduct(req,res,next);
})

module.exports=router