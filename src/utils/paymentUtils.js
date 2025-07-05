// Payment processing utilities

// Process a payment
export const processPayment = async (paymentData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch("http://localhost:5000/api/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Payment processing failed");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Payment processing error:", error);
    throw error;
  }
};

// Get user's payment methods
export const getPaymentMethods = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch("http://localhost:5000/api/payment-methods", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch payment methods");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    throw error;
  }
};

// Get payment history
export const getPaymentHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch("http://localhost:5000/api/payment-history", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch payment history");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};

// Validate card number using Luhn algorithm
export const validateCardNumber = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }

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

// Validate expiry date
export const validateExpiry = (month, year) => {
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

// Get card brand from card number
export const getCardBrand = (cardNumber) => {
  const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  if (/^6/.test(cleanNumber)) return 'discover';
  
  return 'unknown';
};

// Format card number with spaces
export const formatCardNumber = (value) => {
  const cleanValue = value.replace(/\s+/g, '').replace(/-/g, '');
  const groups = cleanValue.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleanValue;
};

// Format currency
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Get card icon class
export const getCardIcon = (brand) => {
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

// Validate payment form
export const validatePaymentForm = (formData) => {
  const errors = {};

  // Card number validation
  if (!formData.cardNumber) {
    errors.cardNumber = 'Card number is required';
  } else if (!validateCardNumber(formData.cardNumber)) {
    errors.cardNumber = 'Please enter a valid card number';
  }

  // Card holder name validation
  if (!formData.cardHolderName?.trim()) {
    errors.cardHolderName = 'Card holder name is required';
  } else if (formData.cardHolderName.trim().length < 2) {
    errors.cardHolderName = 'Name must be at least 2 characters';
  }

  // Expiry validation
  if (!formData.expiryMonth || !formData.expiryYear) {
    errors.expiryMonth = 'Expiry date is required';
  } else if (!validateExpiry(formData.expiryMonth, formData.expiryYear)) {
    errors.expiryMonth = 'Please enter a valid expiry date';
  }

  // CVV validation
  if (!formData.cvv) {
    errors.cvv = 'CVV is required';
  } else if (!/^\d{3,4}$/.test(formData.cvv)) {
    errors.cvv = 'CVV must be 3 or 4 digits';
  }

  return errors;
};

// Payment status colors
export const getPaymentStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'succeeded':
    case 'completed':
      return 'success';
    case 'pending':
    case 'processing':
      return 'warning';
    case 'failed':
    case 'declined':
      return 'danger';
    default:
      return 'secondary';
  }
};

// Payment status icons
export const getPaymentStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'succeeded':
    case 'completed':
      return 'fas fa-check-circle';
    case 'pending':
    case 'processing':
      return 'fas fa-clock';
    case 'failed':
    case 'declined':
      return 'fas fa-times-circle';
    default:
      return 'fas fa-question-circle';
  }
}; 