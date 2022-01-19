const cartModel = require('../db/cartSchema');

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
      //you update code here
  
      Cart.findOneAndUpdate(condition, updateData, { upsert: true })
        .then((result) => resolve())
        .catch((err) => reject(err));
    });
  }

// Add Items to cart
exports.addItemToCart = (req,res) =>{
    cartModel.findOne({user: req.user._id}).exec((error,cart)=>{
        if(error) return res.status(400).json({
            success:false,
            message:"Some error"
        });
        if(cart){
            // if item already exist then only update the quantity
            let cartArray = [];

            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = cart.cartItems.find((c)=> c.product == product);
                let condition, update;
                if(item){
                    condition = {user: req.user._id, "cartItems.product":product};
                    update = {
                        $set: {
                            "cartItems.$":cartItem,
                        },
                    };
                }else {
                    condition = {user: req.user._id};
                    update = {
                        $push: {
                            cartItems: cartItem,
                        },
                    };
                }
                cartArray.push(runUpdate(condition, update));
                
            });
            Promise.all(cartArray)
            .then((response) => res.status(201).json({ response }))
            .catch((error) => res.status(400).json({ error }));
        }
        else {
            //if cart not exist then create a new cart
            const cart = new cartModel({
              user: req.user._id,
              cartItems: req.body.cartItems,
            });
            cart.save((error, cart) => {
              if (error) return res.status(400).json({ error });
              if (cart) {
                return res.status(201).json({ cart });
              }
            });
          }
    });
}

exports.getCartItems = (req, res) => {
    cartModel.findOne({ user: req.user._id })
      .populate("cartItems.product", "_id product_name product_cost product_image")
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.product_name,
              img: item.product.product_image,
              price: item.product.product_cost,
              qty: item.quantity,
            };
          });
          res.status(200).json({ cartItems });
        }
      });
    //}
  };
  
  // new update remove cart items
  exports.removeCartItems = (req, res) => {
    const { productId } = req.body.payload;
    if (productId) {
      cartModel.update(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      ).exec((error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  };


// // Add items to cart
// async function addCartData(data){
//     console.log(data);
//     let ins =await new cartModel(data);
//     ins.save((err)=>{
//         if (err) throw err;
//     })
// }
// // get items from cart
// async function getAllCartData(req,res){
//     console.log(req.body);
//     let data = req.params.id
//     console.log(data);
//      cartModel.find({user:data})
//      .populate("Product")
//      .exec((err, orders) => {
//          res.json({
//              orders
//          })
//         //  console.log(orders);
//     //    if (!orders) {
//     //      return res.status(404).json({
//     //        status:false,
//     //        status_code:404,
//     //        message:"Order not found with this id"
//     //      });
//     //    }
//     //      res.status(200).json({
//     //        success: true,
//     //        orders,
//     //      });
//       })

// }

// // Update the cart product
// async function updaetTheCart(req,res,next){
//     let updateCart = await cartModel.findById(req.params.id);
//     if(!updateCart){
//         return res.status(500).json({
//             sucess:false,
//             message:"Product not found"
//         })
//     }
//     updateCart =await cartModel.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true,
//         useFindAndModify:false
//     });

//     res.status(200).json({
//         success:true,
//         updateCart
//     })
// }

// // Delete Product
// async function deleteCart(req,res,next){
//     const deleteCart = await cartModel.findById(req.params.id)
//     if(!deleteCart){
//         return res.status(500).json({
//             sucess:false,
//             message:"Product not found"
//         })
//     }
//     await deleteCart.remove();

    
//     res.status(200).json({
//         success:true,
//         message:"Product deleted sucessfully"
//     })
// }

// module.exports={addCartData,getAllCartData,updaetTheCart,deleteCart}