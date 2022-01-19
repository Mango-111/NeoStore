const userModel = require('../db/UserSchema')
const otpModel = require('../db/OtpSchema');
// const multer=require('multer');

// //for uploading 
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//       cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
//     }
// })

// To get the registered users
async function getUsers(req,res,next){
    let user = await userModel.find();
    
    res.status(200).json({
        success:true,
        status_code:200,
        user,
    });
}

// To add users
async function postUsers(data){
    let ins =await new userModel(data);
    ins.save((err)=>{
        if (err){
            console.log(err);
        };
    })
}
// User Logout
async function logout(req,res){
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });
}

// Generate otp and send it on email
async function sendEmail(req,res){
    const user = await userModel.find({email:req.body.email});
    console.log(user);
    if(user){
        let otpCode=Math.floor((Math.random()*10000)+1);
        let otpData = new otpModel({
            email:req.body.email,
            code:otpCode,
            expiresIn:new Date().getTime() +300*1000
        })
        let otpResponse = await otpData.save();
        mailer(otpData.email,otpData.code);
        res.status(200).json({
            success:true,
            message:"Email sent please check your Inbox"
        })
    }
    else if (!user) {
        return next(
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        );
      }
}
// To verify the otp and change the password
async function changePassword(req,res){
    let data = await otpModel.find({email:req.body.email,code:req.body.otpCode});
    if(data){
        let currentTime = new Date().getTime();
        let difference = data.expiresIn - currentTime;
        if(difference<0){
            res.status(401).json({
                success:false,
                message:"Time limit excceded"
            })
        }
        else{
            let user = await userModel.findOne({email:req.body.email})
            user.password = req.body.password;
            user.save()
            res.status(200).json({
                success:true,
                status_code:200,
                message:"Password changed successfully"
            })
        }
    }
    else if(!data){
        res.status(404).json({
            success:false,
            message:"Invalid OTP"
        })
    }

}
// To send the mail 
const mailer=async(email,otp)=>{
    const nodemailer=require('nodemailer')
    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:"hadapadambika@gmail.com",
          pass:"ambikasuchit11"
        }
      });
    var mail = {
        from:"hadapadambika@gmail.com",
        to:email,
        subject: "Change password request",
        html:
        `<h2>${otp} is your otp to change the password</h2>
        <p>Do not share you OTP with anyone.</p>`
        };
      sender.sendMail(mail, function(error, info) {
        if (error) {
          console.log(error);
        } else
        {
          console.log("Email sent successfully: " + info.response);
        }
      });
}
// To update/reset the password
async function resetPassword(req,res){
    let usersData = await userModel.findOne({email:req.body.email})

    if(!usersData){
        res.status(401).json({
            success:false,
            status_code:401,
            message:"User not found"
        })
    }
    else if(usersData){
        let user = await userModel.findOne({email:req.body.email,password:req.body.password}).select("+password");
       
        if (!user) {
            return res.status(400).json({
                success:false,
                status_code:400,
                message:"You have entered incorrect old Password"
            })
          }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success:false,
                status_code:400,
                message:"Password does not match"
            })
        }
        user.password = req.body.newPassword;

        await user.save();
      
        res.status(200).json({
            success:true,
            status_code:200,
            message:"Password changed successfully"
        })
    }

}
// To update user profile
async function updateProfile(req,res){
    // let upload = multer({ storage: storage }).single('myfile');
    // upload(req, res, (err) => { 
    //     if (!req.file) {
    //         res.send("Please select a file");
    //     }
    //     else if (err) {
    //         res.send("Some uploading error");
    //     }
    // })
    const newUserData = {
        firstname: req.body.firstname,
        // LastName:req.body.LastName,
        // email: req.body.email,
        // mobile:req.body.mobile,
        profile_img:req.file.file,
      };
    const user = userModel.findByIdAndUpdate(req.user._id,newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        status_code:200,
        message:"Profile updated successfully"
    })
};
// Get User Detail
async function getUserDetails(req, res, next){
    const user = await userModel.findById(req.user.id);
  
    res.status(200).json({
      success: true,
      user,
    });
}


// post User Detail
async function postUserData(req, res, next){
   const user= userModel.findOne({ emailAddress: req.body.email}, (err, data) => {
        // console.log(data)
        if (err) {
            res.send("its error")
        }
        else{
            res.json({
                data:data
            })
        }
    })

    res.status(200).json({
      success: true,
      user,
    });
}

module.exports={postUsers,getUsers,logout,sendEmail,changePassword,resetPassword,updateProfile,getUserDetails,postUserData}