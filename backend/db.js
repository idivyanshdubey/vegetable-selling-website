const mongoose=require('mongoose');
/*const mongoURI='mongodb+srv://OrganicMart:FoVvyuRHDYZ7h6Om@cluster0.70mokr6.mongodb.net/OrganicMartMern?retryWrites=true&w=majority';*/
const mongoURI='mongodb://OrganicMart:FoVvyuRHDYZ7h6Om@ac-02wcwsx-shard-00-00.70mokr6.mongodb.net:27017,ac-02wcwsx-shard-00-01.70mokr6.mongodb.net:27017,ac-02wcwsx-shard-00-02.70mokr6.mongodb.net:27017/OrganicMartMern?ssl=true&replicaSet=atlas-jzgwl1-shard-0&authSource=admin&retryWrites=true&w=majority'

/*const mongoDb=()=>{mongoose.connect(mongoURI,{useNewUrlParser:true}).then((conn)=>{ console.log("connected");
var con=mongoose.connection;


  
   
}).catch((err)=>console.log("not"));}*/
   
/*const mongoDb=async()=> {
    try{
         await mongoose.connect(mongoURI)
            console.log("connected");

           const dataf= await mongoose.connection.db.collection("xy");
            console.log(dataf);
  } 
    catch(error){
     console.log({error});
    }
  /*  await mongoose.connect(mongoURI,(err,result)=>{
        if(err)console.log("not");
        else console.log("yes")
    })

}   */


const mongoDb = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      let fetched_data =await mongoose.connection.db.collection("category_items");
      let data= await fetched_data.find({}).toArray() 
       global.category_items=data;
      
     
    } catch (error) {
      console.log('err: ', error);
    }
  };
  
  


module.exports =mongoDb;

