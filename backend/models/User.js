const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate emails
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String, // Optional
    default: null,
  },
  address: {
    type: String, // Optional
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  orders: [{
    orderId: String,
    items: [{
      id: String,
      name: String,
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
      transactionId: String
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
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare passwords
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
