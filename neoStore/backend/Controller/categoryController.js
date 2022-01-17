const CatModel = require('../db/CategorySchema')

async function AddCategory(data){
    let ins =await new CatModel(data);
    ins.save((err)=>{
        if (err) throw err;
    })
}

module.exports={AddCategory}