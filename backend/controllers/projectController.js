import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import Client from '../models/client.js';
import Invoice from '../models/Invoice.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const { status } = req.query;
  
  const filter = { user: req.user._id };
  if (status && status !== 'all') {
    filter.status = status;
  }

  const projects = await Project.find(filter)
    .populate('client', 'firstName lastName email')
    .sort({ createdAt: -1 });
  
  res.json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate('client');

  if (project) {
    // Get project invoices
    const invoices = await Invoice.find({
      project: project._id,
      user: req.user._id
    });

    res.json({
      ...project.toObject(),
      invoices
    });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const {
    clientId,
    title,
    description,
    type,
    budget,
    dueDate,
    startDate,
    teamMembers,
    deliverables
  } = req.body;

  // Verify client belongs to user
  const client = await Client.findOne({
    _id: clientId,
    user: req.user._id
  });

  if (!client) {
    res.status(404);
    throw new Error('Client not found');
  }

  const project = await Project.create({
    user: req.user._id,
    client: clientId,
    title,
    description,
    type: type || 'other',
    budget: budget || 0,
    dueDate,
    startDate,
    teamMembers: teamMembers || [],
    deliverables: deliverables || []
  });

  // Update client's project count
  client.projectsCount = (client.projectsCount || 0) + 1;
  await client.save();

  res.status(201).json(project);
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (project) {
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.type = req.body.type || project.type;
    project.status = req.body.status || project.status;
    project.progress = req.body.progress || project.progress;
    project.budget = req.body.budget || project.budget;
    project.spent = req.body.spent || project.spent;
    project.dueDate = req.body.dueDate || project.dueDate;
    project.startDate = req.body.startDate || project.startDate;
    project.teamMembers = req.body.teamMembers || project.teamMembers;
    project.deliverables = req.body.deliverables || project.deliverables;

    const updatedProject = await project.save();
    
    // Update client total spent if project amount changed
    if (req.body.spent !== undefined) {
      const client = await Client.findById(project.client);
      if (client) {
        // Recalculate total spent from all projects
        const projects = await Project.find({ client: client._id });
        client.totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
        await client.save();
      }
    }

    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (project) {
    // Update client's project count and total spent
    const client = await Client.findById(project.client);
    if (client) {
      if (client.projectsCount > 0) {
        client.projectsCount -= 1;
      }
      
      // Recalculate total spent
      const projects = await Project.find({ client: client._id, _id: { $ne: project._id } });
      client.totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
      await client.save();
    }

    // Delete associated invoices
    await Invoice.deleteMany({ project: project._id });

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Get project stats
// @route   GET /api/projects/stats
// @access  Private
const getProjectStats = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => 
    p.status === 'active' || p.status === 'in-progress'
  ).length;
  
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget || 0), 0);
  const totalSpent = projects.reduce((sum, p) => sum + (p.spent || 0), 0);
  
  const averageProgress = projects.length > 0 
    ? projects.reduce((sum, p) => sum + (p.progress || 0), 0) / projects.length
    : 0;
  
  // Count overdue projects (due date passed and not completed)
  const overdueProjects = projects.filter(p => 
    new Date(p.dueDate) < new Date() && 
    p.status !== 'completed'
  ).length;

  // Get projects by type
  const projectsByType = projects.reduce((acc, project) => {
    const type = project.type || 'other';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalProjects,
    activeProjects,
    totalBudget,
    totalSpent,
    remainingBudget: totalBudget - totalSpent,
    averageProgress: Math.round(averageProgress),
    overdueProjects,
    projectsByType
  });
});

// @desc    Update project progress
// @route   PATCH /api/projects/:id/progress
// @access  Private
const updateProjectProgress = asyncHandler(async (req, res) => {
  const { progress } = req.body;
  
  if (progress < 0 || progress > 100) {
    res.status(400);
    throw new Error('Progress must be between 0 and 100');
  }

  const project = await Project.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (project) {
    project.progress = progress;
    
    // Auto-update status based on progress
    if (progress === 100) {
      project.status = 'completed';
    } else if (progress > 0 && project.status === 'planning') {
      project.status = 'in-progress';
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats,
  updateProjectProgress
};