import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  notes: {
    type: String
  },
  avatarColor: {
    type: String,
    default: 'from-blue-500 to-purple-500'
  },
  status: {
    type: String,
    enum: ['active', 'lead', 'inactive'],
    default: 'active'
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  projectsCount: {
    type: Number,
    default: 0
  },
  lastContact: {
    type: Date
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

// Indexes for faster queries
clientSchema.index({ user: 1 });
clientSchema.index({ email: 1 });
clientSchema.index({ status: 1 });

export default mongoose.model('Client', clientSchema);