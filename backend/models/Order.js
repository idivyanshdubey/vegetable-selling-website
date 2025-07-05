const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    id: String,
    title: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  shipping: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    address2: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  payment: {
    method: String,
    last4: String,
    transactionId: String,
    paymentMethodId: {
      type: Schema.Types.Mixed, // Allow both ObjectId and String
      ref: 'PaymentMethod'
    }
  },
  totals: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String,
    default: null
  },
  estimatedDelivery: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
OrderSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Generate order ID before validation
OrderSchema.pre('validate', function(next) {
  if (!this.orderId) {
    this.orderId = generateOrderId();
  }
  next();
});

// Helper function to generate unique order ID
function generateOrderId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
}

// Use 'orders' collection name
module.exports = mongoose.model('Order', OrderSchema, 'orders'); 