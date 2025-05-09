import mongoose from 'mongoose';

const rentalRequestSchema = new mongoose.Schema({
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: [true, 'Please provide equipment ID'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user ID'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please provide total price'],
  },
}, {
  timestamps: true,
});

export const RentalRequest = mongoose.models.RentalRequest || mongoose.model('RentalRequest', rentalRequestSchema); 