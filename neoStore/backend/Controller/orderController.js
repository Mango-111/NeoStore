const orderModel = require('../db/orderSchema');
const addressModel = require('../db/addSchema')
const productModel = require('../db/ProductsSchema')
const categoryModdel = require('../db/CategorySchema')
const colorModel = require('../db/ColorSchema')
const CartModel = require('../db/cartSchema')

// Create new order
async function newOrder(data,req,res,next){
    let order =await new orderModel(data)
    order.save((err)=>{
        if (err){
            console.log(err);
        }
    })
}

// get logged in user's single order
async function getSingleOrder(req,res,next){
    const order = await orderModel.findById(req.params.id).populate("user");

      if (!order) {
        return res.status(404).json({
            success:false,
            status_code:404,
            message:" Order Not found"
        });
        
      }
      res.status(200).json({
        success: true,
        order,
      });
}

//  get all the orders of logged in user
async function getAllOrder(req,res,next){
    const order = await orderModel.find({user: req.user._id});
    
      res.status(200).json({
        success: true,
        order,
      });
}
// get all orders (admin route)
async function getAllOrderAdmin(req,res,next){
    const order = await orderModel.find();
    let totalAmount = 0;
    order.forEach(order=>{
        totalAmount+=order.totalPrice;
    });
    
      res.status(200).json({
        success: true,
        order,
        totalAmount,
      });
}
async function updateOrder (req, res, next){
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      status:false,
      status_code:404,
      message:"Order not found with this id"
    });
  }

  if (order.orderStatus === "Delivered") {
    return res.status(404).json({
      status:false,
      status_code:400,
      message:"we have already delivered this order"
    });
  }

  if (req.body.status === "Shipped") {
    order.order_details.forEach(async (o) => {
      await updateStock(o.product_stock, o.order_details.req.id);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
}

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
  // delete Order -- Admin
   async function deleteOrder(req, res, next){
    const order = await orderModel.findById(req.params.id);
  
    if (!order) {
      return res.status(404).json({
        success: false,
        status_code:404,
        message:"Not found"
      });
    }

    await order.remove();
  
    res.status(200).json({
      success: true,
    });
   }
module.exports={newOrder,getSingleOrder,getAllOrder,getAllOrderAdmin,updateOrder,deleteOrder}

