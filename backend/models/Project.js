import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: ['wedding', 'corporate', 'portrait', 'event', 'product', 'other'],
    default: 'other'
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'in-progress', 'completed', 'on-hold'],
    default: 'planning'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  budget: {
    type: Number,
    default: 0
  },
  spent: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date
  },
  dueDate: {
    type: Date,
    required: true
  },
  teamMembers: [{
    type: String
  }],
  deliverables: [{
    name: String,
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'delivered'],
      default: 'pending'
    },
    dueDate: Date,
    notes: String
  }],
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
projectSchema.index({ user: 1 });
projectSchema.index({ client: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ dueDate: 1 });

// Virtual for remaining budget
projectSchema.virtual('remainingBudget').get(function() {
  return this.budget - this.spent;
});

export default mongoose.model('Project', projectSchema);