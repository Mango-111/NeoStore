const ProductModel = require('../db/ProductsSchema');
const ApiFeatures = require('../utils/ApiFeatures');
// Create Product
async function postProductData(data){
    let ins =await new ProductModel(data);
    ins.save((err)=>{
        if (err) throw err;
    })
}

// Get all the products
async function getAllProducts(req,res){
  const resultPerPage = 8;
  const productsCount = await ProductModel.countDocuments();

  const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    // .searchCategory()

  let products = apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query
  .populate(["category_id","color_id"])
  return res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
}
// Get Product Details
async function getProductDetails(req, res, next){
    const product = await ProductModel.findById(req.params.id);
  
    if (!product) {
      return res.status(200).json({
        success: false,
        status_code:200,
        message:"Product not found",
      });
    }
  
    res.status(200).json({
      success: true,
      product,
    });
}

// Get Single product
async function getOneProduct(req,res,next){

    let oneProduct = await ProductModel.findById(req.params.id);

    if(!oneProduct){
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        success:true,
        oneProduct
    })
}
// Update the product
async function updaetTheProduct(req,res,next){
    let updateProduct = await ProductModel.findById(req.params.id);
    if(!updateProduct){
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })
    }
    updateProduct =await ProductModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        updateProduct
    })
}

// Delete Product
async function deleteProduct(req,res,next){
    const deleteProduct = await ProductModel.findById(req.params.id)
    if(!deleteProduct){
        return res.status(500).json({
            sucess:false,
            message:"Product not found"
        })
    }
    await deleteProduct.remove();

    
    res.status(200).json({
        success:true,
        message:"Product deleted sucessfully"
    })
}
async function getSearch(req,res,next){
    const SearchProduct = await ProductModel.find({ $text: { $search:req.body}})
    if(!SearchProduct){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(200).json({
        sucess:true,
        SearchProduct
    })
}
// Category and color filter
const searchCategory=(req,res)=>{
    let cat = req.params.cat;
    let col = req.params.col

    // let obj ={
    //     color_id:col,
    //     category_id:cat,
    // }

    // console.log(obj);
  
    if (cat == "dummy") {
       ProductModel.find({ category_id: cat })
          .populate()
          .then(product => {
             console.log("cat")
             console.log(product);
  
             res.json({ data1: product, err: "0" })
  
          })
    }
    else if (col == "dummy") {
     ProductModel.find({ color_id: col})
          .populate()
          .then(product => {
             console.log("col")
             console.log(product);
  
             res.json({ data1: product, err: "0" })
  
          })
    }
    else {
        console.log(cat);
        ProductModel.find({category_id:cat})
          .populate()
          .then(product => {
             console.log("col and cat")
             console.log(product);
  
             res.json({ data1: product, err: "0" })
  
          })
    }
}
module.exports={postProductData,getAllProducts,updaetTheProduct,deleteProduct,getOneProduct,getSearch,getProductDetails,searchCategory}