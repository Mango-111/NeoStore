const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
    },
    card_number:{
      type:Number,
      required:true
    },
    expiresIn:{
        type:String,
        required:true
    },
    order:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Payment",paymentSchema);