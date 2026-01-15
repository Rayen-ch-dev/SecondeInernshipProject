import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String
  },
  originalName: {
    type: String
  },
  fileSize: {
    type: Number
  },
  mimeType: {
    type: String
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
  isFavorite: {
    type: Boolean,
    default: false
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  uploadedAt: {
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
photoSchema.index({ gallery: 1 });
photoSchema.index({ user: 1 });
photoSchema.index({ tags: 1 });

export default mongoose.model('Photo', photoSchema);