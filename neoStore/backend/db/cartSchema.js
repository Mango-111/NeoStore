const mongoose = require('mongoose')
const cartchema = new mongoose.Schema({
    shippingInfo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },
    quantity:{
        type:Number,
        required:true,
    },
    product_cost:{
        type:Number,
        required:true,
    },
    total_productCost:{
        type:Number,
        required:true,
    },
});
module.exports=mongoose.model("Cart",cartchema);