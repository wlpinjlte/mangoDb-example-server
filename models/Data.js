const mongoose=require("mongoose");
const Schema=mongoose.Schema;
//example for todoItem
const dataSchema=new Schema({
    text:{type:String},
    done:{type:Boolean}
},{timestamps:true})

const Data=mongoose.model('Data',dataSchema,'data');//3 argunment collection!
module.exports = Data