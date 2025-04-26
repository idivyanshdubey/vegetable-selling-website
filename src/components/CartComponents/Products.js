import React, {useState} from 'react';

import CardList from './CardList';

const Products = ({products, sortProducts, addToCart}) =>  {

    const [value, setValue] = useState('Select');

    const setList = (e) => {
        setValue(e.target.value);
        sortProducts(e.target.value);
    }
    
    return (
        <div className="products">

            <div className="products-nav">
                <div className="text-center">
                <h3 style={{color:'green'}}>Products</h3></div>
                <div className="sort-list">
                    Sort by&nbsp;: &nbsp;
                    <select value={value} onChange={setList}>
                        <option value="Select">Select</option>
                        <option value="Highest to Lowest">Highest to Lowest</option>
                        <option value="Lowest to Highest">Lowest to Highest</option>
                    </select>
                </div>
            </div>

            <CardList products={products} addToCart={addToCart} />
            
        </div>
    )
}

export default Products;
