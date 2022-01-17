const express = require('express');
const { getAddress, postAddress,updateAddress, deleteAddress} = require('../Controller/addController');
const router = express.Router();

router.get('/getAddress',(req,res)=>{
    getAddress(req,res);
})

router.post('/postAddress',(req,res)=>{
    postAddress(req.body,res);
})

router.put('/updateAdd/:id',(req,res,next)=>{
    updateAddress(req,res,next)
})

router.put('/deleteAddress/:id',(req,res,next)=>{
    deleteAddress(req,res,next)
})
module.exports=router