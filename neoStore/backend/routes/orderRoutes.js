const express = require('express');
const router = express.Router()
const {newOrder, getSingleOrder, getAllOrder, getAllOrderAdmin, updateOrder, deleteOrder} = require('../Controller/orderController')

router.post('/newOrder',(req,res)=>{
    console.log(req.body)
    newOrder(req.body)
    res.send("Order placed")
})
router.get('/oneProduct/:id',(req,res)=>{
    getSingleOrder(req,res);
})
router.get('/myOrders/:id',(req,res)=>{
    getAllOrder(req,res);
})
router.get('/allOrders',(req,res)=>{
    getAllOrderAdmin(req,res);
})
router.put('/updateOrder/:id',(req,res)=>{
    updateOrder(req,res);
})
router.delete('/deleteOrder/:id',(req,res)=>{
    deleteOrder(req,res);
})

module.exports=router