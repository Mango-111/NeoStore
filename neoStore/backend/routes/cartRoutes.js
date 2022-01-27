const express = require('express');
const {addItemToCart, getCartItems, updaetTheCart, removeCartItems } = require('../Controller/cartController');
const router = express.Router()

router.post('/newCart',(req,res)=>{
    console.log(req.body)
    addItemToCart(req,res)
    res.send("Order placed")
})
router.post('/getCartItems',(req,res)=>{
    getCartItems(req,res);
})
router.put('/updateCart/:id',(req,res)=>{
    updaetTheCart(req,res);
})
router.delete('/removeCartItems',(req,res)=>{
   removeCartItems
})

module.exports=router