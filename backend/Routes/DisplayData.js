const express=require("express");
const router=express.Router();
router.post("/displaydata",async (req,res)=>{
    try{
     
       console.log(global.category_items)
       res.send(global.category_items);
    }
    catch(error){
          console.error(error.message);
         res.send("Server error")
    }
})
module.exports=router;