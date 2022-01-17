var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../db/UsersSchema");
const SECRET_KEY="saddksadljjljjkjjkjlj"; 

exports.signup = (req, res) => {
    const user = new User({
    firstname: req.body.firstname,
    LastName: req.body.LastName,
    mobile: req.body.mobile,
    email:req.body.email,
    gender:req.body.gender,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: "Please enter valid credentials",
          err:err.message
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "User Registered successfully"
        })
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
      email: req.body.email,
      password:req.body.password
    })
    .exec((err, user) => {
      if (err) {
        res.status(401)
          .send({
            message:"Please enter valid credentials"
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "User Not found."
          });
      }

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with user id and storing token in cookie
      const token = jwt.sign(   { _id: user._id }, 
        "saddksadljjljjkjjkjlj",  {  expiresIn: "20h",  },
        {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        HttpOnly: true, } );

      //responding to client request with user profile success message and  access token .
      res.status(200).cookie("token", token).json({
        user: {
          id: user._id,
          email: user.email,
          firstname: user.firstname,
          mobile:user.mobile,
          LastName:user.LastName
        },
        success:true,
        message: "Login successfull",
        accessToken: token,
      })
    });
};
exports.isAuthorizedRole=(...roles)=>{
  return (req,res,next)=>{
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success:false,
        message:"You are not allowed to access this resource"
      })
    }
}
}
exports.isUserLoggedIn=async(req,res,next)=>{ 
  const token = req.cookie;
  console.log(token);
  if (token==null){
    res.status(401).json({
      success:false,
      message:"Please login to access this page"
    })

  }
  else if (!token) {
    res.status(403).json({
      success:false,
      message:"Please login with valid credentials"
    })
  }
  const decodedData = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  next();
}
