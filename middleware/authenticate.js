const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];
        console.log(token);
        const decode = jwt.verify(token,'secretVaule');
        
        req.user=decode;
        next();
    }catch(error){
        if(error.name=='TokenExpiredError'){
            res.status(401).json({
                message:"token expired!"
            })
        }else{
            res.json({
                message:"Auth failed!"
            });
        }
        
    }
}

module.exports=authenticate;