import asyncHandler from 'express-async-handler';
import Client from '../models/client.js';
import Project from '../models/Project.js';

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ user: req.user._id })
    .sort({ createdAt: -1 });
  
  res.json(clients);
});

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (client) {
    // Get client's projects
    const projects = await Project.find({
      client: client._id,
      user: req.user._id
    });

    res.json({
      ...client.toObject(),
      projects
    });
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Create client
// @route   POST /api/clients
// @access  Private
const createClient = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, address, notes, status } = req.body;

  const client = await Client.create({
    user: req.user._id,
    firstName,
    lastName,
    email,
    phone,
    address,
    notes,
    status: status || 'active'
  });

  res.status(201).json(client);
});

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (client) {
    client.firstName = req.body.firstName || client.firstName;
    client.lastName = req.body.lastName || client.lastName;
    client.email = req.body.email || client.email;
    client.phone = req.body.phone || client.phone;
    client.address = req.body.address || client.address;
    client.notes = req.body.notes || client.notes;
    client.status = req.body.status || client.status;
    
    if (req.body.status === 'active') {
      client.lastContact = new Date();
    }

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (client) {
    // Check if client has projects
    const projects = await Project.find({ client: client._id });
    if (projects.length > 0) {
      res.status(400);
      throw new Error('Cannot delete client with existing projects');
    }

    await client.deleteOne();
    res.json({ message: 'Client removed' });
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

// @desc    Get client stats
// @route   GET /api/clients/stats
// @access  Private
const getClientStats = asyncHandler(async (req, res) => {
  const totalClients = await Client.countDocuments({ user: req.user._id });
  const activeClients = await Client.countDocuments({ 
    user: req.user._id,
    status: 'active' 
  });
  const leadClients = await Client.countDocuments({ 
    user: req.user._id,
    status: 'lead' 
  });
  
  // Get total revenue from clients
  const clients = await Client.find({ user: req.user._id });
  const totalRevenue = clients.reduce((sum, client) => sum + (client.totalSpent || 0), 0);
  const averageSpent = totalClients > 0 ? totalRevenue / totalClients : 0;

  res.json({
    totalClients,
    activeClients,
    leadClients,
    totalRevenue,
    averageSpent
  });
});

export {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getClientStats
};