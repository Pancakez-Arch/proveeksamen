import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide equipment name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide equipment description'],
  },
  category: {
    type: String,
    required: [true, 'Please provide equipment category'],
  },
  image: {
    type: String,
    required: [true, 'Please provide equipment image'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide rental price'],
  },
  available: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema); 