const express = require('express');
const router = express.Router();
const {addPayment} = require('../Controller/paymentController')

router.post('/newPayment',(req,res)=>{
    addPayment(req,res);
});

module.exports=router