const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  paymentMethodId: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'cancelled'],
    required: true,
    default: 'pending'
  },
  description: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: false
  },
  transactionId: {
    type: String,
    required: false
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
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
PaymentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Use 'payment_history' collection name
module.exports = mongoose.model('Payment', PaymentSchema, 'payment_history'); 