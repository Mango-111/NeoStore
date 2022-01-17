const addModel = require('../db/addSchema');

// To get the address of the users
async function getAddress(req,res){
    let userAddress = await addModel.find();
    
    res.status(200).json({
        success:true,
        status_code:200,
        userAddress,
    });
}

// To add user address
async function postAddress(data,res){
    let userAddress = await new addModel(data)
    userAddress.save((err)=>{
        if(err){
            console.log(err);
        }
        res.status(200).json({
            status:true,
            status_code:200,
            message:"User address added successfully",
            userAddress,
        })
    })
}

// To update user address
async function updateAddress(req,res,next){
    let updateAddress = await addModel.findById(req.params.id);
    if(!updateAddress){
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })
    }
    updateAddress =await addModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        status_code:200,
        message:"Address updated successfully",
        updateAddress
    })
}

// To delete the user address
// Delete Product
async function deleteAddress(req,res,next){
    const deleteAddress = await addModel.findById(req.params.id)
    if(!deleteAddress){
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })
    }
    await deleteAddress.remove();

    
    res.status(200).json({
        success:true,
        message:"Product deleted sucessfully"
    })
}

module.exports={getAddress,postAddress,updateAddress,deleteAddress}