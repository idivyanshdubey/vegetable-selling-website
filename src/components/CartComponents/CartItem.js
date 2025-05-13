import React from 'react';

const images = {};
function importAll(r) {
  r.keys().forEach((key) => (images[key.replace('./', '')] = r(key)));
}

const CartItem = ({ product, changeQuantity, removeItem }) => {
    // Try to load image from src/assets, fallback to placeholder if not found
    let imageSrc;
    try {
        imageSrc = require(`../../assets/${product.image}`);
    } catch {
        imageSrc = 'https://via.placeholder.com/70';
    }

    // Calculate item total
    const itemTotal = product.price * product.quantity;

    return (
        <div
            className="cart-item d-flex align-items-center mb-4 p-3 rounded"
            style={{
                background: 'linear-gradient(135deg, #ffffff 60%, #f0f7f0 100%)',
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Product Image */}
            <div className="me-4 position-relative">
                <img
                    src={imageSrc}
                    alt={product.title}
                    className="cart-item-image"
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        border: '2px solid #fff',
                        transition: 'transform 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                />
                {product.organic && (
                    <div 
                        style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#2ecc71',
                            color: 'white',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 6px rgba(46, 204, 113, 0.3)',
                        }}
                    >
                        <i className="bi bi-leaf-fill"></i>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-1">
                    <h5 style={{ 
                        fontWeight: 600, 
                        fontSize: '1.2rem', 
                        color: '#2c3e50',
                        marginBottom: '0.25rem'
                    }}>
                        {product.title}
                    </h5>
                    
                    {removeItem && (
                        <button
                            className="btn p-0 text-danger"
                            style={{ 
                                lineHeight: 1,
                                background: 'transparent',
                                border: 'none',
                                transition: 'transform 0.2s ease'
                            }}
                            onClick={() => removeItem(product)}
                            aria-label="Remove item"
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.15)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <i className="bi bi-trash" style={{ fontSize: '1.1rem' }}></i>
                        </button>
                    )}
                </div>

                <div className="d-flex align-items-center mb-2">
                    <span 
                        style={{ 
                            background: '#e8f5e9', 
                            color: '#2ecc71', 
                            borderRadius: '6px', 
                            padding: '3px 10px',
                            fontSize: '0.85rem',
                            fontWeight: '500'
                        }}
                    >
                        {product.size}
                    </span>
                    
                    {product.discount && (
                        <span 
                            style={{ 
                                background: '#fff8e1', 
                                color: '#f39c12', 
                                borderRadius: '6px', 
                                padding: '3px 10px',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                marginLeft: '8px'
                            }}
                        >
                            <i className="bi bi-tag-fill me-1"></i>
                            {product.discount}% off
                        </span>
                    )}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div className="d-flex align-items-center">
                        <button
                            className="quantity-btn"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: '1px solid #2ecc71',
                                backgroundColor: '#fff',
                                color: '#2ecc71',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}
                            onClick={() => changeQuantity(product, '-')}
                            aria-label="Decrease quantity"
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#2ecc71';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#fff';
                                e.currentTarget.style.color = '#2ecc71';
                            }}
                        >
                            <span style={{ lineHeight: '0', position: 'relative', top: '-1px' }}>−</span>
                        </button>
                        
                        <span
                            style={{
                                minWidth: '40px',
                                textAlign: 'center',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                color: '#2c3e50',
                                margin: '0 10px'
                            }}
                        >
                            {product.quantity}
                        </span>
                        
                        <button
                            className="quantity-btn"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '8px',
                                border: '1px solid #2ecc71',
                                backgroundColor: '#fff',
                                color: '#2ecc71',
                                fontWeight: 'bold',
                                fontSize: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                            }}
                            onClick={() => changeQuantity(product, '+')}
                            aria-label="Increase quantity"
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#2ecc71';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#fff';
                                e.currentTarget.style.color = '#2ecc71';
                            }}
                        >
                            <span style={{ lineHeight: '0', position: 'relative', top: '-1px' }}>+</span>
                        </button>
                    </div>
                    
                    <div className="text-end">
                        <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: '1.2rem' }}>
                            ₹{itemTotal.toFixed(2)}
                        </div>
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                            ₹{product.price} each
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
