import React from 'react'

const Sizes = ({selectedSizes, setSize}) =>  {

    const sizes = ['Fruits','Vegetables'];

    return (
        <div className="sizes mt-3">
            <h2 style={{color:'green',marginTop:'2px'}}><b> Categories</b></h2>
            <div className="size-list pt-3">
                {
                    sizes.map((size, index) => {
                        return (
                            <button 
                                className={ "size" + (selectedSizes.includes(size) ? " selected-size" : "")}
                                key={index}
                                onClick={() => setSize(size)}
                          style={{width:'110px',backgroundColor:'green',color:'white',fontSize:'15px'}}  >
                                {size}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sizes;
