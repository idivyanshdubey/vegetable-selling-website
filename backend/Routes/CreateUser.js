const User=require('../models/User')
const express=require("express");
const router=express.Router();
 router.post("/createuser",async(req,res)=>{
    try{
       
       await User.create({
            name:"Malvika",
            email:"malvika@gmail.com",
            password:"12345678"
            
        })

        res.json({success:true});
      
    }
    catch(err) {
       console.log("errr");
       res.json({success:false})
    }
})
module.exports=router;