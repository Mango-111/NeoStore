const mongoose = require('mongoose');
const ColorSchema = new mongoose.Schema({
    color_name:{
        type:String,
        required:true,
        unique:true
    },
    color_code:{
      type:String,
      required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("Color",ColorSchema);