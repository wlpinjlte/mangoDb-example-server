const Data= require('../models/Data');

//showing data
const index=(req,res,next)=>{
    if(req.query.page&&req.query.limit){
        Data.paginate({},{page:req.query.page,limit:req.query.limit})
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(err=>{
            res.json({
                message:"error:"+err
            })
        })
        
    }else{
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
}

//show single object
const show=(req,res,next)=>{
    let todoIteamId=req.body.id;
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
    // console.log(req);
    let todoItem=new Data({
        text:req.body.text,
        done:req.body.done
    });
    if(req.files){
        let path=''
        req.files.forEach((files,index,arr)=>{
            path+=files.path+',';
        })
        path=path.substring(0,path.lastIndexOf(","));
        todoItem.photo = path
    }
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
        done:req.body.done
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