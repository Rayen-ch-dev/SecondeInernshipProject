import asyncHandler from 'express-async-handler';
import Invoice from '../models/Invoice.js';
import Client from '../models/client.js';
import Project from '../models/Project.js';

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = asyncHandler(async (req, res) => {
  const { status } = req.query;
  
  const filter = { user: req.user._id };
  if (status && status !== 'all') {
    filter.status = status;
  }

  const invoices = await Invoice.find(filter)
    .populate('client', 'firstName lastName email phone')
    .populate('project', 'title')
    .sort({ createdAt: -1 });
  
  res.json(invoices);
});

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    user: req.user._id
  })
    .populate('client')
    .populate('project');

  if (invoice) {
    res.json(invoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Create invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
  const {
    clientId,
    projectId,
    issueDate,
    dueDate,
    items,
    taxRate,
    notes,
    status
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

  // Verify project belongs to user if provided
  let project = null;
  if (projectId) {
    project = await Project.findOne({
      _id: projectId,
      user: req.user._id
    });
    
    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }
  }

  const invoice = await Invoice.create({
    user: req.user._id,
    client: clientId,
    project: projectId,
    issueDate: issueDate || new Date(),
    dueDate,
    items,
    taxRate: taxRate || 19,
    notes,
    status: status || 'draft'
  });

  res.status(201).json(invoice);
});

// @desc    Update invoice
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (invoice) {
    invoice.issueDate = req.body.issueDate || invoice.issueDate;
    invoice.dueDate = req.body.dueDate || invoice.dueDate;
    invoice.items = req.body.items || invoice.items;
    invoice.taxRate = req.body.taxRate || invoice.taxRate;
    invoice.notes = req.body.notes || invoice.notes;
    invoice.status = req.body.status || invoice.status;
    invoice.paymentMethod = req.body.paymentMethod || invoice.paymentMethod;
    
    // If marking as paid, set payment date
    if (req.body.status === 'paid' && !invoice.paymentDate) {
      invoice.paymentDate = new Date();
    }

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Update invoice status
// @route   PATCH /api/invoices/:id/status
// @access  Private
const updateInvoiceStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (invoice) {
    invoice.status = status;
    
    // If marking as paid, set payment date
    if (status === 'paid' && !invoice.paymentDate) {
      invoice.paymentDate = new Date();
    }

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (invoice) {
    // Prevent deletion of paid invoices
    if (invoice.status === 'paid') {
      res.status(400);
      throw new Error('Cannot delete paid invoices');
    }

    await invoice.deleteOne();
    res.json({ message: 'Invoice removed' });
  } else {
    res.status(404);
    throw new Error('Invoice not found');
  }
});

// @desc    Get invoice stats
// @route   GET /api/invoices/stats
// @access  Private
const getInvoiceStats = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id });
  
  const totalInvoices = invoices.length;
  
  const totalOutstanding = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  
  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.totalAmount, 0);
  
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;
  
  const pendingCount = invoices.filter(inv => inv.status === 'pending').length;
  const paidCount = invoices.filter(inv => inv.status === 'paid').length;

  res.json({
    totalInvoices,
    totalOutstanding,
    totalPaid,
    overdueCount,
    pendingCount,
    paidCount
  });
});

// @desc    Send invoice reminder
// @route   POST /api/invoices/:id/reminder
// @access  Private
const sendInvoiceReminder = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate('client');

  if (!invoice) {
    res.status(404);
    throw new Error('Invoice not found');
  }

  if (invoice.status === 'paid') {
    res.status(400);
    throw new Error('Cannot send reminder for paid invoice');
  }

  // Here you would implement email sending logic
  // For now, we'll just return a success message
  const reminderData = {
    invoiceId: invoice._id,
    invoiceNumber: invoice.invoiceNumber,
    clientEmail: invoice.client.email,
    clientName: invoice.client.firstName,
    amount: invoice.totalAmount,
    dueDate: invoice.dueDate,
    status: invoice.status
  };

  // In a real application, you would:
  // 1. Send email to client
  // 2. Log the reminder
  // 3. Update invoice if needed

  res.json({
    message: 'Reminder sent successfully',
    data: reminderData,
    sentAt: new Date()
  });
});

export {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  getInvoiceStats,
  sendInvoiceReminder
};