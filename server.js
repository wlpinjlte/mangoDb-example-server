const express =  require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyPraser = require('body-parser');

const DataRouter=require('./routes/data');
mongoose.connect('mongodb+srv://admin:admin@kurs.hwy4owx.mongodb.net/?retryWrites=true&w=majority');
const db= mongoose.connection;

db.on('error',(err)=>{
    console.log(err);
})

db.once('open',()=>{
    console.log("connect dataBase");
})

const app=express()

app.use(morgan('dev'));
app.use(bodyPraser.urlencoded({extended:true}));
app.use(bodyPraser.json())

const PORT = process.env.port || 3000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

app.use('/api/data',DataRouter)