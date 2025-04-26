import React,{UseState} from 'react';
import {useDispatchCart,useCart} from './ContextReducer';
const Product=(props)=>{
 let dispatch =useDispatchCart();
 let options=props.options;
 const [qty,setQty]=useState(1);
 const [size,setSize]=useState("");
 const handleAddToCart=async()=>{
  await dispatch({type:"ADD",id:props.title,price:props.price,qty:qty,size:size})
 }
 let finalP=qty*parseInt(options[size]);
    return(
        <>
        <div class="card text-center pt-0 pb-3" style={{border:'1px solid #f1e8e8;',boxShadow:'100px 100px 80px grey;'}}>
        <div style={{height:'170px',width:'auto',border:''}}>
        <img src={props.image} class="card-img-top" width="80%" height="100%" alt="..." style={{objectFit:'cover'}}/>
        </div>
        <div class="card-body">
            <div className="d-flex justify-content-evenly">
          <h5 class="card-title">{props.title}</h5>
         
        <p>Rs {props.price}/kg</p>
        </div>
          <div class='d-flex justify-content-between'>
          <select className=" h-100  rounded "style={{backgroundColor:'rgb(44 125 48)',color:'white'}} onChange={(e)=>setQty(e,target.value)}>
               <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              
             
              <select className="h-100  rounded"style={{backgroundColor:'rgb(44 125 48)',color:'white'}} onChange={(e)=>setSize(e,target.value)}>
                <option value="half">HALF</option>
                <option value="full">Full</option>
              </select>
             
             
              <div className="d-inline h-100 fs.5">
             {finalP}
              </div>
        
              </div>
              </div>
              <hr/>
           <div>  <button type="button" className="btn" style={{backgroundColor:'rgb(44 125 48)',padding:2,paddingLeft:11,paddingRight:11,color:'white'}}>Add to cart </button></div>
      </div>
      </>
      
    );
}
export default Product;