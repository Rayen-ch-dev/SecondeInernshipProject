import asyncHandler from 'express-async-handler';
import Gallery from '../models/Gallery.js';
import Photo from '../models/Photo.js';
import Client from '../models/client.js';
import Project from '../models/Project.js';

// @desc    Get all galleries
// @route   GET /api/gallery
// @access  Private
const getGalleries = asyncHandler(async (req, res) => {
  const galleries = await Gallery.find({ user: req.user._id })
    .populate('client', 'firstName lastName')
    .populate('project', 'title')
    .sort({ createdAt: -1 });
  
  res.json(galleries);
});

// @desc    Get single gallery with photos
// @route   GET /api/gallery/:id
// @access  Private
const getGalleryById = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    user: req.user._id
  })
    .populate('client')
    .populate('project');

  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }

  const photos = await Photo.find({ gallery: gallery._id })
    .sort({ uploadedAt: -1 });

  // Increment view count if viewing details
  gallery.viewCount = (gallery.viewCount || 0) + 1;
  await gallery.save();

  res.json({
    ...gallery.toObject(),
    photos
  });
});

// @desc    Create gallery
// @route   POST /api/gallery
// @access  Private
const createGallery = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    clientId,
    projectId,
    isPublic,
    password
  } = req.body;

  const galleryData = {
    user: req.user._id,
    title,
    description,
    isPublic: isPublic || false,
    password: isPublic && password ? password : undefined
  };

  // Add client if provided and valid
  if (clientId) {
    const client = await Client.findOne({
      _id: clientId,
      user: req.user._id
    });
    
    if (client) {
      galleryData.client = clientId;
    }
  }

  // Add project if provided and valid
  if (projectId) {
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id
    });
    
    if (project) {
      galleryData.project = projectId;
    }
  }

  const gallery = await Gallery.create(galleryData);
  res.status(201).json(gallery);
});

// @desc    Update gallery
// @route   PUT /api/gallery/:id
// @access  Private
const updateGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (gallery) {
    gallery.title = req.body.title || gallery.title;
    gallery.description = req.body.description || gallery.description;
    gallery.isPublic = req.body.isPublic !== undefined ? req.body.isPublic : gallery.isPublic;
    gallery.password = req.body.password || gallery.password;
    gallery.coverImage = req.body.coverImage || gallery.coverImage;

    // Update client if provided
    if (req.body.clientId) {
      const client = await Client.findOne({
        _id: req.body.clientId,
        user: req.user._id
      });
      
      if (client) {
        gallery.client = req.body.clientId;
      }
    }

    // Update project if provided
    if (req.body.projectId) {
      const project = await Project.findOne({
        _id: req.body.projectId,
        user: req.user._id
      });
      
      if (project) {
        gallery.project = req.body.projectId;
      }
    }

    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

// @desc    Delete gallery
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (gallery) {
    // Delete all photos in the gallery
    await Photo.deleteMany({ gallery: gallery._id });
    
    await gallery.deleteOne();
    res.json({ message: 'Gallery and all photos removed' });
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

// @desc    Get public gallery by share URL
// @route   GET /api/gallery/share/:shareUrl
// @access  Public
const getPublicGallery = asyncHandler(async (req, res) => {
  const { shareUrl } = req.params;
  const { password } = req.query;

  const gallery = await Gallery.findOne({ shareUrl })
    .populate('client', 'firstName lastName')
    .populate('project', 'title');

  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }

  // Check if gallery is public
  if (!gallery.isPublic) {
    res.status(403);
    throw new Error('This gallery is not public');
  }

  // Check password if required
  if (gallery.password && gallery.password !== password) {
    res.status(401);
    throw new Error('Password required');
  }

  // Increment view count
  gallery.viewCount = (gallery.viewCount || 0) + 1;
  await gallery.save();

  const photos = await Photo.find({ gallery: gallery._id })
    .sort({ uploadedAt: -1 });

  res.json({
    ...gallery.toObject(),
    photos
  });
});

// @desc    Upload photo to gallery
// @route   POST /api/gallery/:id/photos
// @access  Private
const uploadPhoto = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }

  // In a real application, you would handle file upload here
  // For now, we'll accept photo data in the request body
  const {
    fileName,
    fileUrl,
    thumbnailUrl,
    originalName,
    fileSize,
    mimeType,
    width,
    height,
    title,
    description,
    tags,
    metadata
  } = req.body;

  const photo = await Photo.create({
    gallery: gallery._id,
    user: req.user._id,
    fileName,
    fileUrl,
    thumbnailUrl,
    originalName,
    fileSize,
    mimeType,
    width,
    height,
    title,
    description,
    tags: tags || [],
    metadata: metadata || {}
  });

  // Add photo to gallery's photos array
  gallery.photos.push(photo._id);
  await gallery.save();

  res.status(201).json(photo);
});

// @desc    Delete photo
// @route   DELETE /api/gallery/:galleryId/photos/:photoId
// @access  Private
const deletePhoto = asyncHandler(async (req, res) => {
  const { galleryId, photoId } = req.params;

  const gallery = await Gallery.findOne({
    _id: galleryId,
    user: req.user._id
  });

  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }

  const photo = await Photo.findOne({
    _id: photoId,
    gallery: galleryId,
    user: req.user._id
  });

  if (!photo) {
    res.status(404);
    throw new Error('Photo not found');
  }

  // Remove photo from gallery's photos array
  gallery.photos = gallery.photos.filter(id => id.toString() !== photoId);
  await gallery.save();

  await photo.deleteOne();
  res.json({ message: 'Photo removed' });
});

// @desc    Update photo
// @route   PUT /api/gallery/:galleryId/photos/:photoId
// @access  Private
const updatePhoto = asyncHandler(async (req, res) => {
  const { galleryId, photoId } = req.params;

  const gallery = await Gallery.findOne({
    _id: galleryId,
    user: req.user._id
  });

  if (!gallery) {
    res.status(404);
    throw new Error('Gallery not found');
  }

  const photo = await Photo.findOne({
    _id: photoId,
    gallery: galleryId,
    user: req.user._id
  });

  if (!photo) {
    res.status(404);
    throw new Error('Photo not found');
  }

  photo.title = req.body.title || photo.title;
  photo.description = req.body.description || photo.description;
  photo.tags = req.body.tags || photo.tags;
  photo.isFavorite = req.body.isFavorite !== undefined ? req.body.isFavorite : photo.isFavorite;
  photo.isSelected = req.body.isSelected !== undefined ? req.body.isSelected : photo.isSelected;

  const updatedPhoto = await photo.save();
  res.json(updatedPhoto);
});

export {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  getPublicGallery,
  uploadPhoto,
  deletePhoto,
  updatePhoto
};