const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register=(req,res,next)=>{
    User.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})
    .then(user=>{
        if(user){
            res.json({
                message:"email or phone is already used"
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
                if(err){
                    res.json({
                        error:err
                    })
                }
                let user=new User({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    password:hashedPass
                })
                user.save()
                .then(user=>{
                    res.json({
                        message:"user add succefull"
                    })
                }).catch(err=>{
                    res.json({
                        message:"error during adding users"
                    })
                })
            })
        }
    })
    .catch(err=>{
        res.json({
            message:"error!"
        })
    })
}

const login=(req,res,next)=>{
    let userName=req.body.userName
    let password=req.body.password
    console.log(userName,password);
    User.findOne({$or:[{email:userName},{phone:userName}]})
    .then(user=>{
        console.log(user)
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                console.log(result)
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token=jwt.sign({name:user.name},"secretVaule",{expiresIn:'1h'})
                    res.json({
                        message:"login successful",
                        token:token
                    })
                }else{
                    res.json({
                        message:"incorrect password"
                    })
                }
            })
        }else{
            res.json({
                message:"user not found"
            })
        }
    }).catch(err=>{
        res.json({
            message:"error!"
        })
    })
}
module.exports={register,login};