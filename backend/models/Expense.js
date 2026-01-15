import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  category: {
    type: String,
    enum: ['equipment', 'travel', 'software', 'marketing', 'office', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  receiptUrl: {
    type: String
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
expenseSchema.index({ user: 1 });
expenseSchema.index({ project: 1 });
expenseSchema.index({ category: 1 });
expenseSchema.index({ date: 1 });

export default mongoose.model('Expense', expenseSchema);