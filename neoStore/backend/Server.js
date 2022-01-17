const express = require('express');
const port=8877;
const app = express();
require('dotenv').config();

const cors = require('cors');
const dotenv = require('dotenv');

// Config
dotenv.config({path:"backend/Config/config.env"});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
});
const connectDb=require('./Config/DataBase')

const postRoutes= require('./routes/PostRoutes')
const userRoutes = require('./routes/userRoutes')
const addRoutes = require('./routes/addRoutes')
const orderRoutes = require('./routes/orderRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

app.use('/api/',postRoutes);
app.use('/api/',userRoutes);
app.use('/api/',addRoutes);
app.use('/api/',orderRoutes);
app.use('/api/',paymentRoutes);

connectDb()
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Api is working on ${port}`);
})

// Unhandled promise Rejection
process.on("unhandled rejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);

    Server.Close(()=>{
        process.exit(1);
    });
})