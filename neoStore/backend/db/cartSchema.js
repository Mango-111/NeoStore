// const mongoose = require('mongoose')
// const cartchema = new mongoose.Schema({
//     product:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Product"
//     },
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     quantity:{
//         type:Number,
//         required:true,
//     },
//     // product_image:{
//     //     type:String,
//     //     required:true,
//     // },
//     // product_cost:{
//     //     type:Number,
//     //     required:true
//     // },
   
// });
// module.exports=mongoose.model("Cart",cartchema);
const mongoose = require('mongoose')
const cartchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    cartItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                default:1
            },
        }
    ]

});
module.exports=mongoose.model("Cart",cartchema);