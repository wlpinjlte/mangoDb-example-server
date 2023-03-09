const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const mongoosePaginate=require("mongoose-paginate-v2");
//example for todoItem
const dataSchema=new Schema({
    text:{type:String},
    done:{type:Boolean},
    photo:{type:String}
},{timestamps:true})

dataSchema.plugin(mongoosePaginate);

const Data=mongoose.model('Data',dataSchema,'data');//3 argunment collection!
module.exports = Data