const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: [true, 'Order ID is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: 'Name should only contain letters and spaces'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /.+\@.+\..+/.test(v);
      },
      message: 'Invalid email address'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number should be exactly 10 digits'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Price must be a positive number'
    }
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v) && v > 0;
      },
      message: 'Quantity must be a positive integer'
    }
  },
  total: {
    type: Number,
    default: 0,
    min: [0, 'Total cannot be negative']
  }
});

// Pre-save middleware to auto-calculate the total
OrderSchema.pre('save', function(next) {
  if (this.price && this.quantity) {
    this.total = parseFloat((this.price * this.quantity).toFixed(2));
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);