import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
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
  businessName: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  settings: {
    currency: {
      type: String,
      default: 'TND'
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'Africa/Tunis'
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    invoiceSettings: {
      taxRate: {
        type: Number,
        default: 19
      },
      paymentTerms: {
        type: Number,
        default: 30
      },
      currencySymbol: {
        type: String,
        default: 'TND'
      }
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true
      },
      projectReminders: {
        type: Boolean,
        default: true
      },
      paymentReminders: {
        type: Boolean,
        default: true
      }
    }
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

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON response
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model('User', userSchema);