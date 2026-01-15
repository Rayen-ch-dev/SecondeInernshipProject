import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['shoot', 'meeting', 'delivery', 'payment', 'other'],
    default: 'shoot'
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderTime: {
    type: Number,
    default: 30
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
appointmentSchema.index({ user: 1 });
appointmentSchema.index({ client: 1 });
appointmentSchema.index({ startDate: 1 });
appointmentSchema.index({ status: 1 });

export default mongoose.model('Appointment', appointmentSchema);