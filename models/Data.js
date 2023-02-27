const mongoose=require("mongoose");
const Schema=mongoose.Schema;
//example for todoItem
const dataSchema=new Schema({
    text:{type:String},
    done:{type:Boolean},
    id:{type:Number}
},{timestamps:true})

const Data=mongoose.model('Data',dataSchema);
module.exports = Data