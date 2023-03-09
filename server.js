const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyPraser = require('body-parser');
const cors=require("cors");

const dotenv = require("dotenv");
dotenv.config();

const DataRouter=require('./routes/data');
const AuthRouter=require('./routes/auth');

mongoose.connect('mongodb+srv://admin:admin@kurs.hwy4owx.mongodb.net/example_server?retryWrites=true&w=majority',{//adding to url our database name
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db=mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
})

db.once('open',()=>{
    console.log("connect dataBase");
})

const app=express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyPraser.urlencoded({extended:true}));
app.use(bodyPraser.json());
app.use('/uploads',express.static('uploads'));

const PORT = process.env.port || 3000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});

app.use('/api/data',DataRouter);
app.use('/api',AuthRouter);