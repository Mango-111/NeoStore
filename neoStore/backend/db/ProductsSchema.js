const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
        unique:true
    },
    product_image:[
        {
            type: String,
            required: true
        }
    ],
    product_subImages:{
        type:Array,
        "default":[]
    
    },
    product_desc:{
        type:String,
        required:true
    },
    product_cost:{
        type:Number,
        required:true
    },
    color_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Color"
    },
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    product_stock:{
        type:Number,
        required:true
    },
    product_rating:{
        type:Number,
        default:0
    },
    product_material:{
        type:String,
    },
    product_dimension:{
        type:String,
        default:0
    },
    product_producer:{
        type:String,
        required:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Product",productSchema);