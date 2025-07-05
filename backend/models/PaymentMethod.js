const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentMethodSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Add index for better query performance
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  last4: {
    type: String,
    required: true
  },
  holderName: {
    type: String,
    required: true
  },
  expiry: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
    enum: ['visa', 'mastercard', 'amex', 'discover', 'unknown'],
    required: true
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
PaymentMethodSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Use 'payments' collection name instead of default 'paymentmethods'
module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema, 'payments'); 