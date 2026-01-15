import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
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
  invoiceNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'paid', 'overdue'],
    default: 'draft'
  },
  issueDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [{
    description: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  subtotal: {
    type: Number,
    default: 0
  },
  taxRate: {
    type: Number,
    default: 19
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'bank_transfer', 'credit_card', 'check', 'other'],
    default: 'bank_transfer'
  },
  paymentDate: {
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

// Indexes
invoiceSchema.index({ user: 1 });
invoiceSchema.index({ client: 1 });
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ invoiceNumber: 1 });

// Calculate totals before saving
invoiceSchema.pre('save', function(next) {
  // Calculate item totals
  this.items.forEach(item => {
    item.total = item.quantity * item.price;
  });

  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);

  // Calculate tax
  this.taxAmount = (this.subtotal * this.taxRate) / 100;

  // Calculate total
  this.totalAmount = this.subtotal + this.taxAmount;

  // Auto-generate invoice number if not provided
  if (!this.invoiceNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    this.invoiceNumber = `INV-${year}-${random}`;
  }

  // Update status to overdue if due date passed
  if (this.status === 'pending' && new Date() > this.dueDate) {
    this.status = 'overdue';
  }

  next();
});

export default mongoose.model('Invoice', invoiceSchema);