import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  viewCount: {
    type: Number,
    default: 0
  },
  shareUrl: {
    type: String,
    unique: true
  },
  coverImage: {
    type: String
  },
  photos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Photo'
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
gallerySchema.index({ user: 1 });
gallerySchema.index({ shareUrl: 1 });
gallerySchema.index({ isPublic: 1 });

// Generate share URL before saving
gallerySchema.pre('save', function(next) {
  if (!this.shareUrl) {
    const randomString = Math.random().toString(36).substring(2, 15);
    this.shareUrl = `gallery-${randomString}`;
  }
  next();
});

export default mongoose.model('Gallery', gallerySchema);