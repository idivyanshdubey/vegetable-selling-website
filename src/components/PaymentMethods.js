import React, { useState, useEffect } from 'react';
import './PaymentMethods.css';

const PaymentMethods = ({ onClose, onPaymentSuccess, onSelectMethod }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardType: 'credit'
  });
  const [errors, setErrors] = useState({});

  // Fetch payment methods from API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:5000/api/payment-methods", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data);
        } else {
          console.error("Failed to fetch payment methods");
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

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

    // Card number validation (Luhn algorithm)
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!isValidCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    // Card holder name validation
    if (!formData.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    } else if (formData.cardHolderName.trim().length < 2) {
      newErrors.cardHolderName = 'Name must be at least 2 characters';
    }

    // Expiry validation
    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiryMonth = 'Expiry date is required';
    } else if (!isValidExpiry(formData.expiryMonth, formData.expiryYear)) {
      newErrors.expiryMonth = 'Please enter a valid expiry date';
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidCardNumber = (cardNumber) => {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
    
    // Check if it's a valid length (13-19 digits)
    if (!/^\d{13,19}$/.test(cleanNumber)) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const isValidExpiry = (month, year) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    
    return true;
  };

  const getCardBrand = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
    
    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6/.test(cleanNumber)) return 'discover';
    
    return 'unknown';
  };

  const formatCardNumber = (value) => {
    const cleanValue = value.replace(/\s+/g, '').replace(/-/g, '');
    const groups = cleanValue.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleanValue;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formatted
    }));
    
    // Auto-detect card brand
    const brand = getCardBrand(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardBrand: brand
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('Form validation failed:', errors);
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      console.log('Token found:', !!token);
      console.log('Token length:', token ? token.length : 0);
      if (!token) {
        setErrors({ general: 'Authentication required. Please login again.' });
        return;
      }

      const paymentData = {
        cardNumber: formData.cardNumber.replace(/\s+/g, ''),
        cardHolderName: formData.cardHolderName,
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        cvv: formData.cvv,
        cardType: formData.cardType
      };

      console.log('Sending payment data:', { ...paymentData, cvv: '***' });

      const response = await fetch("http://localhost:5000/api/payment-methods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Payment method added successfully:', data);
        setPaymentMethods(prev => [...prev, data.paymentMethod]);
        setIsAddingCard(false);
        setFormData({
          cardNumber: '',
          cardHolderName: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: '',
          cardType: 'credit'
        });
        setErrors({});

        // Show success message
        if (onPaymentSuccess) {
          onPaymentSuccess('Payment method added successfully!');
        }
      } else {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        setErrors({ general: errorData.error || 'Failed to add payment method.' });
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
      setErrors({ general: 'Failed to add payment method. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSetDefault = async (methodId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://localhost:5000/api/payment-methods/${methodId}/default`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPaymentMethods(prev => 
          prev.map(method => ({
            ...method,
            isDefault: (method._id || method.id) === methodId
          }))
        );
        
        if (onPaymentSuccess) {
          onPaymentSuccess('Default payment method updated!');
        }
      } else {
        console.error('Failed to update default payment method');
      }
    } catch (error) {
      console.error('Error updating default method:', error);
    }
  };

  const handleDeleteMethod = async (methodId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`http://localhost:5000/api/payment-methods/${methodId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setPaymentMethods(prev => prev.filter(method => (method._id || method.id) !== methodId));
          
          if (onPaymentSuccess) {
            onPaymentSuccess('Payment method deleted successfully!');
          }
        } else {
          console.error('Failed to delete payment method');
        }
      } catch (error) {
        console.error('Error deleting payment method:', error);
      }
    }
  };

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

  return (
    <div className="payment-methods-modal">
      <div className="payment-methods-content">
        <div className="payment-header">
          <h3>Payment Methods</h3>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="payment-body">
          {/* Existing Payment Methods */}
          <div className="payment-methods-list">
            <h4>Your Payment Methods</h4>
            {paymentMethods.length === 0 ? (
              <div className="empty-payment-methods">
                <i className="fas fa-credit-card"></i>
                <p>No payment methods added yet</p>
              </div>
            ) : (
              paymentMethods.map(method => (
                <div key={method._id || method.id} className="payment-method-card">
                  <div className="method-info">
                    <div className="card-icon">
                      <i className={getCardIcon(method.brand)}></i>
                    </div>
                    <div className="card-details">
                      <h5>{method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} •••• {method.last4}</h5>
                      <p>{method.holderName} • Expires {method.expiry}</p>
                      {method.isDefault && <span className="default-badge">Default</span>}
                    </div>
                  </div>
                  <div className="method-actions">
                    {onSelectMethod && (
                      <button 
                        className="btn-select"
                        onClick={() => {
                          onSelectMethod(method);
                          onClose();
                        }}
                      >
                        Select
                      </button>
                    )}
                    {!method.isDefault && (
                      <button 
                        className="btn-set-default"
                        onClick={() => handleSetDefault(method._id || method.id)}
                      >
                        Set Default
                      </button>
                    )}
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeleteMethod(method._id || method.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Payment Method */}
          {!isAddingCard ? (
            <div className="add-payment-method">
              <button 
                className="btn-add-card"
                onClick={() => setIsAddingCard(true)}
              >
                <i className="fas fa-plus"></i>
                Add New Payment Method
              </button>
            </div>
          ) : (
            <div className="add-card-form">
              <h4>Add New Card</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Card Number</label>
                    <div className="card-input-wrapper">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={errors.cardNumber ? 'error' : ''}
                      />
                      {formData.cardBrand && formData.cardBrand !== 'unknown' && (
                        <div className="card-brand-icon">
                          <i className={getCardIcon(formData.cardBrand)}></i>
                        </div>
                      )}
                    </div>
                    {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group full-width">
                    <label>Card Holder Name</label>
                    <input
                      type="text"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className={errors.cardHolderName ? 'error' : ''}
                    />
                    {errors.cardHolderName && <span className="error-message">{errors.cardHolderName}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Month</label>
                    <select
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      className={errors.expiryMonth ? 'error' : ''}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Expiry Year</label>
                    <select
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      className={errors.expiryYear ? 'error' : ''}
                    >
                      <option value="">YYYY</option>
                      {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className={errors.cvv ? 'error' : ''}
                    />
                    {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Card Type</label>
                    <select
                      name="cardType"
                      value={formData.cardType}
                      onChange={handleInputChange}
                    >
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                    </select>
                  </div>
                </div>

                {/* Test Data Button for Development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="form-row">
                    <div className="form-group full-width">
                      <button 
                        type="button"
                        className="btn-test-data"
                        onClick={() => {
                          setFormData({
                            cardNumber: '4242 4242 4242 4242',
                            cardHolderName: 'Test User',
                            expiryMonth: '12',
                            expiryYear: '2025',
                            cvv: '123',
                            cardType: 'credit'
                          });
                          setErrors({});
                        }}
                      >
                        Fill Test Data (Development Only)
                      </button>
                    </div>
                  </div>
                )}

                {errors.expiryMonth && <span className="error-message">{errors.expiryMonth}</span>}
                {errors.general && <span className="error-message general">{errors.general}</span>}

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn-save-card"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save"></i>
                        Add Card
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel"
                    onClick={() => {
                      setIsAddingCard(false);
                      setFormData({
                        cardNumber: '',
                        cardHolderName: '',
                        expiryMonth: '',
                        expiryYear: '',
                        cvv: '',
                        cardType: 'credit'
                      });
                      setErrors({});
                    }}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods; 