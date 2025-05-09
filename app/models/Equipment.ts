import mongoose from 'mongoose';

const EquipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Equipment || mongoose.model('Equipment', EquipmentSchema); 