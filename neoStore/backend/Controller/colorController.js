const ColorModel = require('../db/ColorSchema');

async function postColor(data){
    let ins =await new ColorModel(data);
    ins.save((err)=>{
        if (err) throw err;
    })
}

module.exports={postColor}