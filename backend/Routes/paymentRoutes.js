const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const PaymentMethod = require("../models/PaymentMethod");
const Payment = require("../models/Payment");
const Order = require("../models/Order");

// GET user's payment methods
router.get("/payment-methods", auth, async (req, res) => {
  try {
    console.log('Fetching payment methods for user:', req.user.id);
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch payment methods from database
    const paymentMethods = await PaymentMethod.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    console.log('Found payment methods:', paymentMethods.length);

    res.json(paymentMethods);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res.status(500).json({ error: "Failed to fetch payment methods" });
  }
});

// POST add new payment method
router.post("/payment-methods", auth, async (req, res) => {
  try {
    console.log('Received payment method request:', { ...req.body, cvv: '***' });
    console.log('User ID:', req.user.id);
    
    const { cardNumber, cardHolderName, expiryMonth, expiryYear, cvv, cardType } = req.body;

    // Validate input
    if (!cardNumber || !cardHolderName || !expiryMonth || !expiryYear || !cvv) {
      console.log('Validation failed - missing fields:', { cardNumber: !!cardNumber, cardHolderName: !!cardHolderName, expiryMonth: !!expiryMonth, expiryYear: !!expiryYear, cvv: !!cvv });
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate card number (Luhn algorithm)
    if (!isValidCardNumber(cardNumber)) {
      console.log('Card number validation failed:', cardNumber);
      return res.status(400).json({ error: "Invalid card number" });
    }

    // Validate expiry date
    if (!isValidExpiry(expiryMonth, expiryYear)) {
      console.log('Expiry validation failed:', { expiryMonth, expiryYear });
      return res.status(400).json({ error: "Invalid expiry date" });
    }

    // Validate CVV
    if (!/^\d{3,4}$/.test(cvv)) {
      console.log('CVV validation failed:', cvv);
      return res.status(400).json({ error: "Invalid CVV" });
    }

    // In a real application, you would:
    // 1. Send card details to payment processor (Stripe, PayPal, etc.)
    // 2. Get a payment method token
    // 3. Store the token securely in your database

    // For demo purposes, we'll create a payment method and save to database
    const newPaymentMethod = new PaymentMethod({
      userId: req.user.id,
      type: cardType || "credit",
      last4: cardNumber.slice(-4),
      holderName: cardHolderName,
      expiry: `${expiryMonth}/${expiryYear}`,
      isDefault: false, // New cards are not default by default
      brand: getCardBrand(cardNumber)
    });

    // Save to database
    await newPaymentMethod.save();
    
    console.log('Payment method saved to database:', newPaymentMethod._id);

    res.status(201).json({
      message: "Payment method added successfully",
      paymentMethod: newPaymentMethod
    });

  } catch (error) {
    console.error("Error adding payment method:", error);
    res.status(500).json({ error: "Failed to add payment method" });
  }
});

// PUT update payment method (set as default)
router.put("/payment-methods/:id/default", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Set all payment methods to non-default first
    await PaymentMethod.updateMany(
      { userId: req.user.id },
      { isDefault: false }
    );

    // Set the selected payment method as default
    const paymentMethod = await PaymentMethod.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isDefault: true },
      { new: true }
    );

    if (!paymentMethod) {
      return res.status(404).json({ error: "Payment method not found" });
    }

    res.json({ 
      message: "Default payment method updated successfully",
      paymentMethod: paymentMethod
    });
  } catch (error) {
    console.error("Error updating default payment method:", error);
    res.status(500).json({ error: "Failed to update default payment method" });
  }
});

// DELETE payment method
router.delete("/payment-methods/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the payment method by ID and user ID
    const deletedPaymentMethod = await PaymentMethod.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!deletedPaymentMethod) {
      return res.status(404).json({ error: "Payment method not found" });
    }

    console.log('Payment method deleted from database:', id);

    res.json({ message: "Payment method deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment method:", error);
    res.status(500).json({ error: "Failed to delete payment method" });
  }
});

// POST process payment
router.post("/process-payment", auth, async (req, res) => {
  try {
    console.log('Payment processing request received:', {
      amount: req.body.amount,
      currency: req.body.currency,
      paymentMethodId: req.body.paymentMethodId,
      hasOrderData: !!req.body.orderData,
      orderDataKeys: req.body.orderData ? Object.keys(req.body.orderData) : null
    });
    
    const { amount, currency, paymentMethodId, description, orderData, metadata } = req.body;

    // Validate input
    if (!amount || !currency || !paymentMethodId) {
      return res.status(400).json({ error: "Amount, currency, and payment method are required" });
    }

    // Verify the payment method belongs to the user
    const paymentMethod = await PaymentMethod.findOne({
      _id: paymentMethodId,
      userId: req.user.id
    });

    if (!paymentMethod) {
      return res.status(404).json({ error: "Payment method not found" });
    }

    // In a real application, you would:
    // 1. Create a payment intent with the payment processor (Stripe, PayPal, etc.)
    // 2. Process the payment
    // 3. Handle success/failure
    // 4. Update order status

    // For demo purposes, we'll simulate a successful payment
    const newPayment = new Payment({
      userId: req.user.id,
      paymentMethodId: paymentMethodId,
      amount: amount,
      currency: currency,
      status: "succeeded",
      description: description,
      transactionId: `txn_${Date.now()}`,
      metadata: metadata || {}
    });

    await newPayment.save();

    console.log('Payment processed and saved to database:', newPayment._id);

    // Create order after successful payment
    let newOrder = null;
    if (orderData) {
      console.log('Creating order with data:', JSON.stringify(orderData, null, 2));
      try {
        console.log('User ID for order:', req.user.id);
        console.log('Payment method ID:', paymentMethodId);
        console.log('Payment method brand:', paymentMethod.brand);
        console.log('Payment method last4:', paymentMethod.last4);
        console.log('Transaction ID:', newPayment.transactionId);
        
        newOrder = new Order({
          userId: req.user.id,
          items: orderData.items,
          shipping: orderData.shipping,
          payment: {
            method: paymentMethod.brand,
            last4: paymentMethod.last4,
            transactionId: newPayment.transactionId,
            paymentMethodId: paymentMethodId
          },
          totals: orderData.totals,
          status: 'confirmed'
        });

        console.log('Order object created:', newOrder);
        await newOrder.save();
        console.log('Order created after payment:', newOrder.orderId);

        // Update payment with order ID
        newPayment.orderId = newOrder.orderId;
        await newPayment.save();

      } catch (orderError) {
        console.error('Error creating order after payment:', orderError);
        console.error('Order error details:', orderError.message);
        console.error('Order error stack:', orderError.stack);
        // Payment succeeded but order creation failed
        // In production, you might want to handle this differently
      }
    } else {
      console.log('No orderData provided for order creation');
    }

    res.json({
      message: "Payment processed successfully",
      payment: newPayment,
      order: newOrder
    });

  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

// GET payment history
router.get("/payment-history", auth, async (req, res) => {
  try {
    console.log('Fetching payment history for user:', req.user.id);

    // Fetch payment history from database with payment method details
    const paymentHistory = await Payment.find({ userId: req.user.id })
      .populate('paymentMethodId', 'last4 brand holderName')
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 payments

    console.log('Found payment history:', paymentHistory.length);

    res.json(paymentHistory);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

// Utility functions
function isValidCardNumber(cardNumber) {
  const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
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
}

function isValidExpiry(month, year) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  if (expMonth < 1 || expMonth > 12) return false;
  
  return true;
}

function getCardBrand(cardNumber) {
  const cleanNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  
  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  if (/^6/.test(cleanNumber)) return 'discover';
  
  return 'unknown';
}

module.exports = router; 