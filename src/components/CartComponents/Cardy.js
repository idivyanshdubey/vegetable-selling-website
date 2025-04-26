import React from 'react'

const Cardy = ({data, addToCart}) => {
    return (
      <div className="card text-center pt-2 pb-3" style={{border:'1px solid #f1e8e8;',boxShadow:'100px 100px 80px grey;',margin:'30px',marginBottom:'40px'}}>
         <div style={{width:'auto',border:''}}>
            <div style={{width:'200px',height:'150px'}}>
           <img src={data.url} className="card-img-top" alt="product" title={data.title}   width="80%" height="100%"  style={{objectFit:'cover'}}/>
           </div>
            <h3 className="card-title">{data.title}</h3>
            <p className="price">price: <span>Rs {data.price}/kg</span></p>
            <button className="add-to-cart" style={{backgroundColor:'rgb(44 125 48)',padding:2,paddingLeft:11,paddingRight:11,color:'white'}}onClick={() => addToCart(data)}>Add to cart</button>
         </div> 
        </div>





    )
}

export default Cardy;
