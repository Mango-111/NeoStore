const paymentModel = require('../db/paymentSchema')

async function addNewPayment(req,res){
    let ins = await new paymentModel(data);
    ins.save((err)=>{
        if (err){
            console.log(err);
        }
        else{
            res.status(200).json({
                success:true,
                message:"Payment Done"
            })
        }
    })
}
module.exports={addNewPayment}