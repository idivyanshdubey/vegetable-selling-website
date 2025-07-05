const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating order for user:', req.user.id);
    console.log('Order data received:', JSON.stringify(req.body, null, 2));
    
    const { items, shipping, payment, totals, status } = req.body;
    
    // Validate required fields
    if (!items || !shipping || !payment || !totals) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ message: 'Missing required order information' });
    }

    // Verify user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new order in database
    const newOrder = new Order({
      userId: req.user.id,
      items,
      shipping,
      payment,
      totals,
      status: status || 'confirmed'
    });

    console.log('Order object created:', newOrder);
    await newOrder.save();
    
    console.log('Order created successfully:', newOrder.orderId);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder
    });

  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders for a user
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching orders for user:', req.user.id);

    // Fetch orders from database with payment method details
    const orders = await Order.find({ userId: req.user.id })
      .populate('payment.paymentMethodId', 'last4 brand holderName')
      .sort({ createdAt: -1 });

    console.log('Found orders:', orders.length);
    console.log('Orders data:', JSON.stringify(orders, null, 2));

    res.json(orders);

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific order by orderId
router.get('/:orderId', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findOne({ 
      orderId: orderId, 
      userId: req.user.id 
    }).populate('payment.paymentMethodId', 'last4 brand holderName');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:orderId/status', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: orderId, userId: req.user.id },
      { status: status, updatedAt: new Date() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log('Order status updated:', orderId, 'to', status);

    res.json({
      message: 'Order status updated successfully',
      order: order
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel order
router.patch('/:orderId/cancel', auth, async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findOne({ orderId: orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order can be cancelled (not shipped or delivered)
    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
    }

    // Update order status to cancelled
    order.status = 'cancelled';
    order.updatedAt = new Date();
    await order.save();

    console.log('Order cancelled:', orderId);

    res.json({
      message: 'Order cancelled successfully',
      order: order
    });

  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 