const express = require('express');
const { signup } = require('../Controller/authController');
const router = express.Router()
const {getUsers,logout,sendEmail,changePassword, resetPassword, updateProfile} = require('../Controller/UserController')
verifyToken = require('../middleware/authJWT');
const {signin} =require('../Controller/authController')

const multer=require('multer');

//for uploading 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})
// let upload = multer({ storage: storage }).single('myfile');
// upload(req, res, (err) => {
//     if (!req.file) {
//         res.send("Please select a file");
//     }
//     else if (err) {
//         res.send("Some uploading error");
//     }
// })

router.use(express.static("uploads"));

router.post('/addUser',signup,(req,res)=>{
  let upload = multer({ storage: storage }).single('myfile');
  upload(req, res, (err) => {
    if (!req.file) {
        res.send("Please select a file");
    }
    else if (err) {
        res.send("Some uploading error");
    }
})
   
})
router.post('/Login',signin,(req,res)=>{

})
router.get('/getUsers',(req,res)=>{
  getUsers(req,res);
})
router.post('/Logout',(req,res)=>{
  logout(req,res);
})
router.post('/sendEmail',(req,res)=>{
  sendEmail(req,res);
})
router.post('/changePass',(req,res)=>{
  changePassword(req,res);
})
router.put('/resetPassword',(req,res)=>{
  resetPassword(req,res);
})
router.put('/editProfile',(req,res)=>{
  let upload = multer({ storage: storage }).single('myfile');
  upload(req, res, (err) => {
    if (!req.file) {
        res.send("Please select a file");
    }
    else if (err) {
        res.send("Some uploading error");
    }
})
  updateProfile(req,res);
})
router.get("/hiddencontent",verifyToken, function (req, res) {
    if (!req.user) {
      return 
      res.status(403)
        .send({
          message: "error"
        });
    }
    res.status(200)
    .send({
      message: "Congratulations!"
    });
  });

module.exports=router