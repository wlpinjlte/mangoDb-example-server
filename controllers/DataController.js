const Data= require('../models/Data');

//showing data
const index=(req,res,next)=>{
    Data.find()
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(err=>{
        res.json({
            message: 'Error!'
        })
    })
}

//show single object
const show=(req,res,next)=>{
    let todoIteamId=req.body.Id;
    Data.findById(todoIteamId)
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(err=>{
        res.json({
            message: 'Error!'
        })
    })
}

//adding object
const store=(req,res,next)=>{
    let todoItem=new Data({
        text:req.body.text,
        done:req.body.done,
        id:req.body.id
    });
    todoItem.save()
    .then(resposne=>{
        res.json({
            message:"added successfull!"
        })
    })
    .catch(err=>{
        res.json({
            message:"error!"
        })
    })
}


//update
const update=(req,res,next)=>{
    let todoIteamId=req.body.id;

    let toDoIteamToUpadte={
        text:req.body.text,
        done:req.body.done,
        id:req.body.id
    };

    Data.findByIdAndUpdate(todoIteamId,{$set:toDoIteamToUpadte})
    .then(resposne=>{
        res.json({
            message:"update successfull"
        })
    })
    .catch(err=>{
        res.json({
            message:"error!"
        })
    })
}

//delete
const destory=(req,res,next)=>{
    let todoIteamToDelete=req.body.id;

    Data.findByIdAndRemove(todoIteamToDelete)
    .then(()=>{
        res.json({
            message:'delete successfull'
        })
    })
    .catch(err=>{
        res.json({
            message:"error!"
        })
    })
}

module.exports={
    index,show,update,destory,store
}