const express=require("express");
const app=express();
const mongoDb=require("./db");
mongoDb();


app.use(express.json())
app.use('/api/',require("./Routes/CreateUser.js"));
app.use('/api/',require("./Routes/DisplayData.js"));
app.listen(5000,()=>console.log("server running"));
app.get("/",(req,res)=>{
    res.send("hii m");
});