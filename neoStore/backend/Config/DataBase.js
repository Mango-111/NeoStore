const db="mongodb://localhost:27017/NeoStore";
const mongoose=require('mongoose');
const connectDb = async()=>{
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
module.exports=connectDb;