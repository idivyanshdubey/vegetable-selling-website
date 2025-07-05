import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import PaymentMethods from '../components/PaymentMethods';
import { processPayment, getPaymentMethods, formatCurrency } from '../utils/paymentUtils';
import './CheckOut.css';

function CheckOut() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  const [errors, setErrors] = useState({});

  // Load cart items and user data
  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        // Get cart items from localStorage or context
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }

        // Get user data
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/myprofile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const user = await response.json();
            setUserData(user);
            setFormData(prev => ({
              ...prev,
              firstName: user.name?.split(' ')[0] || '',
              lastName: user.name?.split(' ').slice(1).join(' ') || '',
              email: user.email || '',
              phone: user.phone || '',
              address: user.address || ''
            }));
          }
        }
      } catch (error) {
        console.error('Error loading checkout data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCheckoutData();
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    if (!selectedPaymentMethod) {
      newErrors.payment = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSuccess = (message) => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    if (errors.payment) {
      setErrors(prev => ({ ...prev, payment: '' }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (!selectedPaymentMethod) {
      setErrors({ payment: 'Please select a payment method.' });
      return;
    }

    setIsProcessingPayment(true);

    try {
      console.log('Starting payment process...');
      console.log('Selected payment method:', selectedPaymentMethod);
      console.log('Cart items:', cartItems);
      console.log('Form data:', formData);

      // Prepare order data
      const orderData = {
        items: cartItems,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          address2: formData.address2,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        totals: {
          subtotal,
          shipping,
          tax,
          total
        }
      };

      console.log('Order data prepared:', orderData);

      // Process payment with order data
      const paymentResult = await processPayment({
        amount: Math.round(total * 100), // Convert to paise
        currency: 'INR',
        paymentMethodId: selectedPaymentMethod._id || selectedPaymentMethod.id,
        description: `Order for ${formData.firstName} ${formData.lastName}`,
        orderData: orderData,
        metadata: {
          orderType: 'checkout',
          items: cartItems.length
        }
      });

      console.log('Payment result:', paymentResult);

      if (paymentResult.order) {
        console.log('Order created successfully:', paymentResult.order);
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success and redirect
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/myprofile?tab=orders');
        }, 2000);
      } else {
        console.error('No order in payment result, attempting manual order creation...');
        
        // Fallback: Create order manually
        try {
          const token = localStorage.getItem('token');
          const manualOrderData = {
            items: cartItems,
            shipping: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              address2: formData.address2,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country
            },
            payment: {
              method: selectedPaymentMethod.brand,
              last4: selectedPaymentMethod.last4,
              transactionId: paymentResult.payment.transactionId,
              paymentMethodId: selectedPaymentMethod._id || selectedPaymentMethod.id
            },
            totals: {
              subtotal,
              shipping,
              tax,
              total
            },
            status: 'confirmed'
          };

          console.log('Creating manual order with data:', manualOrderData);

          const orderResponse = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(manualOrderData)
          });

          if (orderResponse.ok) {
            const orderResult = await orderResponse.json();
            console.log('Manual order created successfully:', orderResult);
            
            // Clear cart
            localStorage.removeItem('cart');
            
            // Show success and redirect
            setShowSuccessMessage(true);
            setTimeout(() => {
              navigate('/myprofile?tab=orders');
            }, 2000);
          } else {
            const errorData = await orderResponse.json();
            console.error('Manual order creation failed:', errorData);
            throw new Error(`Manual order creation failed: ${errorData.message || 'Unknown error'}`);
          }
        } catch (manualOrderError) {
          console.error('Manual order creation error:', manualOrderError);
          throw new Error(`Order creation failed: ${manualOrderError.message}`);
        }
      }

    } catch (error) {
      console.error('Payment error:', error);
      setErrors({ payment: `Payment failed: ${error.message}` });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="checkout-loading">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout">
        <div className="empty-checkout-content">
          <i className="fas fa-shopping-cart"></i>
          <h3>Your cart is empty</h3>
          <p>Add some items to your cart to proceed with checkout</p>
          <button onClick={() => navigate('/card')} className="btn-shop">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          Order placed successfully! Redirecting to orders...
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark nav2" style={{ marginBottom: 0 }}>
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span className="logo-text">
              OrgoMart
              <span className="logo-image">
                <i className="fas fa-seedling fa-sm" />
              </span>
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/aboutUs')} style={{ cursor: 'pointer' }}>About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/card')} style={{ cursor: 'pointer' }}>Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</a>
              </li>
            </ul>
            <ul className="navbar-nav mx-right">
              <li className="nav-item me-2">
                <a
                  className="nav-link"
                  onClick={() => navigate("/myprofile")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fas fa-user fa-lg" />
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" onClick={() => navigate('/wishlist')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-heart fa-lg" />
                </a>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link" onClick={() => navigate('/checkout')} style={{ cursor: 'pointer' }}>
                  <i className="fas fa-shopping-cart fa-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Checkout Content */}
      <div className="checkout-container">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <p>Complete your purchase</p>
        </div>

        <div className="checkout-content">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img 
                      src={item.image ? require(`../assets/${item.image}`) : item.url}
                      alt={item.title || item.name} 
                    />
                  </div>
                  <div className="item-details">
                    <h5>{item.name}</h5>
                    <p>Quantity: {item.quantity}</p>
                    <p className="item-price">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="total-line">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="total-line">
                <span>Tax (18% GST):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="total-line total">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="checkout-form">
            <h3>Shipping Information</h3>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="col-12">
                <label className="form-label">Address *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="1234 Main St"
                />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
              <div className="col-12">
                <label className="form-label">Address 2</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </div>
              <div className="col-md-4">
                <label className="form-label">State *</label>
                <select 
                  className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Choose...</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </div>
              <div className="col-md-2">
                <label className="form-label">ZIP *</label>
                <input 
                  type="text" 
                  className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
              </div>
            </form>

            {/* Payment Method Selection */}
            <div className="payment-section">
              <h3>Payment Method</h3>
              {errors.payment && <div className="alert alert-danger">{errors.payment}</div>}
              
              <div className="payment-methods">
                <button 
                  className="btn-add-payment"
                  onClick={() => setShowPaymentMethods(true)}
                >
                  <i className="fas fa-plus"></i>
                  Add Payment Method
                </button>
                
                {selectedPaymentMethod && (
                  <div className="selected-payment">
                    <div className="payment-card">
                      <i className={getCardIcon(selectedPaymentMethod.brand)}></i>
                      <div className="payment-info">
                        <h5>{selectedPaymentMethod.brand.charAt(0).toUpperCase() + selectedPaymentMethod.brand.slice(1)} •••• {selectedPaymentMethod.last4}</h5>
                        <p>Expires {selectedPaymentMethod.expiry}</p>
                      </div>
                      <button 
                        className="btn-change-payment"
                        onClick={() => setSelectedPaymentMethod(null)}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Place Order Button */}
            <div className="place-order-section">
              <button 
                className="btn-place-order"
                onClick={handlePlaceOrder}
                disabled={isProcessingPayment || !selectedPaymentMethod}
              >
                {isProcessingPayment ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Place Order - {formatCurrency(total)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Modal */}
      {showPaymentMethods && (
        <PaymentMethods
          onClose={() => setShowPaymentMethods(false)}
          onPaymentSuccess={handlePaymentSuccess}
          onSelectMethod={handlePaymentMethodSelect}
        />
      )}

      <Footer />
    </>
  );
}

// Helper function to get card icon
const getCardIcon = (brand) => {
  switch (brand) {
    case 'visa':
      return 'fab fa-cc-visa';
    case 'mastercard':
      return 'fab fa-cc-mastercard';
    case 'amex':
      return 'fab fa-cc-amex';
    case 'discover':
      return 'fab fa-cc-discover';
    default:
      return 'fas fa-credit-card';
  }
};

export default CheckOut;