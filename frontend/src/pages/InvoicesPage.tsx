// pages/InvoicesPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileText,
  Plus,
  Filter,
  Download,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  User,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Printer,
  X,
  Building,
  Mail,
  Phone,
  MapPin,
  Percent,
  Hash
} from 'lucide-react';

// New Invoice Modal Component
const NewInvoiceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoice: any) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [{ description: '', quantity: 1, price: 0 }],
    taxRate: 19,
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const tax = (subtotal * formData.taxRate) / 100;
    return subtotal + tax;
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInvoice = {
      id: `INV-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      client: formData.clientName,
      clientDetails: {
        email: formData.clientEmail,
        phone: formData.clientPhone,
        address: formData.clientAddress
      },
      date: formData.invoiceDate,
      dueDate: formData.dueDate,
      amount: calculateTotal(),
      status: 'pending',
      items: formData.items,
      taxRate: formData.taxRate,
      notes: formData.notes,
      createdAt: new Date().toISOString()
    };
    onSubmit(newInvoice);
    onClose();
    setFormData({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      clientAddress: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [{ description: '', quantity: 1, price: 0 }],
      taxRate: 19,
      notes: ''
    });
  };

  const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const tax = (subtotal * formData.taxRate) / 100;
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Create New Invoice</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mt-1">Fill in the invoice details for your client</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Client Information */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Client Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="client@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="+216 XX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.clientAddress}
                      onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="City, Street, etc."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Invoice Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.invoiceDate}
                    onChange={(e) => setFormData({ ...formData, invoiceDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Percent className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      value={formData.taxRate}
                      onChange={(e) => setFormData({ ...formData, taxRate: parseInt(e.target.value) || 0 })}
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Invoice Items</h4>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <input
                        type="text"
                        required
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="e.g., Wedding Photography Service"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <Hash className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          required
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-24 pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          min="1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (TND)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          required
                          value={item.price}
                          onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value) || 0)}
                          className="w-32 pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <div className="pb-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                        <div className="text-lg font-bold text-blue-600">
                          {item.quantity * item.price} TND
                        </div>
                      </div>
                    </div>
                    
                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({formData.taxRate}%):</span>
                  <span className="font-medium">{tax.toFixed(2)} TND</span>
                </div>
                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">{total.toFixed(2)} TND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Add any additional notes or terms for the client..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Invoice
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Invoice Details Modal Component
const InvoiceDetailsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
  onUpdateStatus: (invoiceId: string, newStatus: string) => void;
}> = ({ isOpen, onClose, invoice, onUpdateStatus }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !invoice) return null;

  const subtotal = invoice.items?.reduce((sum: number, item: any) => 
    sum + (item.quantity * item.price), 0) || invoice.amount;
  const tax = invoice.taxRate ? (subtotal * invoice.taxRate) / 100 : 0;
  const total = subtotal + tax;

  return (
    <>
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Invoice #{invoice.id}</h3>
                <p className="text-gray-600">Issued to {invoice.client}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                {getStatusIcon(invoice.status)}
                <span className="capitalize">{invoice.status}</span>
              </div>
              {invoice.status === 'pending' && (
                <button
                  onClick={() => onUpdateStatus(invoice.id, 'paid')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Paid
                </button>
              )}
              {invoice.status === 'overdue' && (
                <button
                  onClick={() => onUpdateStatus(invoice.id, 'paid')}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Paid
                </button>
              )}
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Invoice Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">From</h4>
                <div className="space-y-2">
                  <div className="font-bold text-gray-900">Your Photography Business</div>
                  <div className="text-gray-600">Tunis, Tunisia</div>
                  <div className="text-gray-600">contact@yourbusiness.com</div>
                  <div className="text-gray-600">+216 XX XXX XXX</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Bill To</h4>
                <div className="space-y-2">
                  <div className="font-bold text-gray-900">{invoice.client}</div>
                  {invoice.clientDetails?.email && (
                    <div className="text-gray-600">{invoice.clientDetails.email}</div>
                  )}
                  {invoice.clientDetails?.phone && (
                    <div className="text-gray-600">{invoice.clientDetails.phone}</div>
                  )}
                  {invoice.clientDetails?.address && (
                    <div className="text-gray-600">{invoice.clientDetails.address}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-sm text-gray-600">Invoice Date</div>
                <div className="font-medium text-gray-900">{invoice.date}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Due Date</div>
                <div className={`font-medium ${invoice.status === 'overdue' ? 'text-red-600' : 'text-gray-900'}`}>
                  {invoice.dueDate}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Tax Rate</div>
                <div className="font-medium text-gray-900">{invoice.taxRate || 19}%</div>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{item.description || `Item ${index + 1}`}</td>
                      <td className="px-6 py-4">{item.quantity || 1}</td>
                      <td className="px-6 py-4">{item.price || invoice.amount} TND</td>
                      <td className="px-6 py-4 font-medium">
                        {(item.quantity || 1) * (item.price || invoice.amount)} TND
                      </td>
                    </tr>
                  ))}
                  {(!invoice.items || invoice.items.length === 0) && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No items listed
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="ml-auto max-w-md">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{subtotal.toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax ({invoice.taxRate || 19}%):</span>
                  <span className="font-medium">{tax.toFixed(2)} TND</span>
                </div>
                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">{total.toFixed(2)} TND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                <p className="text-gray-700">{invoice.notes}</p>
              </div>
            )}

            {/* Status Information */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Payment Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-700">Current Status:</span>
                  <span className={`font-medium ${getStatusColor(invoice.status)} px-3 py-1 rounded-full`}>
                    {invoice.status.toUpperCase()}
                  </span>
                </div>
                {invoice.status === 'pending' && (
                  <p className="text-blue-600 text-sm">
                    This invoice is pending payment. Click "Mark as Paid" when payment is received.
                  </p>
                )}
                {invoice.status === 'overdue' && (
                  <p className="text-red-600 text-sm">
                    This invoice is overdue. Please follow up with the client.
                  </p>
                )}
                {invoice.status === 'paid' && (
                  <p className="text-green-600 text-sm">
                    This invoice has been paid. Payment was completed.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Invoice
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper functions for status colors and icons
const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'overdue':
      return 'bg-red-100 text-red-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'paid':
      return <CheckCircle className="w-4 h-4" />;
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'overdue':
      return <XCircle className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const InvoicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2024-001',
      client: 'Amira Ben Ali',
      date: '2024-05-15',
      dueDate: '2024-06-15',
      amount: 2200,
      status: 'paid',
      items: [
        { description: 'Wedding Photography', quantity: 1, price: 1500 },
        { description: 'Album Design', quantity: 1, price: 500 },
        { description: 'Extra Prints', quantity: 10, price: 20 }
      ],
      taxRate: 19,
      notes: 'Thank you for your business!',
      clientDetails: {
        email: 'amira@example.com',
        phone: '+216 55 123 456',
        address: 'Tunis, Tunisia'
      }
    },
    {
      id: 'INV-2024-002',
      client: 'TechCorp Tunisia',
      date: '2024-05-20',
      dueDate: '2024-06-20',
      amount: 3000,
      status: 'pending',
      items: [
        { description: 'Corporate Headshots', quantity: 25, price: 80 },
        { description: 'Team Photos', quantity: 5, price: 200 }
      ],
      taxRate: 19,
      notes: 'Please make payment within 30 days.',
      clientDetails: {
        email: 'finance@techcorp.tn',
        phone: '+216 71 987 654',
        address: 'Ariana, Tunisia'
      }
    },
    {
      id: 'INV-2024-003',
      client: 'Ben Ali Family',
      date: '2024-05-25',
      dueDate: '2024-06-25',
      amount: 1500,
      status: 'overdue',
      items: [
        { description: 'Family Portraits', quantity: 1, price: 1000 },
        { description: 'Framed Prints', quantity: 2, price: 250 }
      ],
      taxRate: 19,
      notes: '',
      clientDetails: {
        email: 'family@example.com',
        phone: '+216 98 765 432',
        address: 'Sousse, Tunisia'
      }
    },
  ]);

  const handleCreateInvoice = () => {
    setShowNewInvoiceModal(true);
  };

  const handleAddNewInvoice = (newInvoice: any) => {
    setInvoices([newInvoice, ...invoices]);
  };

  const handleViewDetails = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (invoiceId: string, newStatus: string) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    ));
    setSelectedInvoice({...selectedInvoice, status: newStatus});
    // Here you would typically make an API call to update the invoice status
    console.log(`Updated invoice ${invoiceId} to ${newStatus}`);
  };

  const handleSendReminder = (invoiceId: string) => {
    console.log('Sending reminder for:', invoiceId);
    // Implement send reminder logic
  };

  const filteredInvoices = filter === 'all' 
    ? invoices 
    : invoices.filter(invoice => invoice.status === filter);

  // Calculate stats dynamically
  const totalOutstanding = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);
    
  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
    
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;
  const totalInvoices = invoices.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
          <p className="text-gray-600">Manage billing and invoices</p>
        </div>
        <button
          onClick={handleCreateInvoice}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{totalOutstanding.toLocaleString()} TND</div>
          <div className="text-sm text-gray-600">Total Outstanding</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} TND</div>
          <div className="text-sm text-gray-600">Total Paid</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{overdueCount}</div>
          <div className="text-sm text-gray-600">Overdue Invoices</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{totalInvoices}</div>
          <div className="text-sm text-gray-600">Total Invoices</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'paid', 'pending', 'overdue', 'draft'].map(f => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredInvoices.map(invoice => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-mono font-bold text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-500">{invoice.items?.length || 1} items</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {invoice.client.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{invoice.client}</div>
                      {invoice.clientDetails?.email && (
                        <div className="text-sm text-gray-500">{invoice.clientDetails.email}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar className="w-4 h-4" />
                    {invoice.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-2 ${
                    invoice.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-900'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    {invoice.dueDate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-bold text-gray-900">{invoice.amount.toLocaleString()} TND</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    <span className="capitalize">{invoice.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleViewDetails(invoice)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    {invoice.status === 'pending' && (
                      <button
                        onClick={() => handleSendReminder(invoice.id)}
                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Printer className="w-6 h-6 text-gray-600 mb-2" />
            <span className="font-medium">Print Invoices</span>
          </button>
          <button 
            onClick={() => {
              const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
              console.log('Sending reminders to', pendingInvoices.length, 'clients');
            }}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Send className="w-6 h-6 text-gray-600 mb-2" />
            <span className="font-medium">Send Reminders</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Download className="w-6 h-6 text-gray-600 mb-2" />
            <span className="font-medium">Export Reports</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <FileText className="w-6 h-6 text-gray-600 mb-2" />
            <span className="font-medium">View Reports</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showNewInvoiceModal && (
        <NewInvoiceModal
          isOpen={showNewInvoiceModal}
          onClose={() => setShowNewInvoiceModal(false)}
          onSubmit={handleAddNewInvoice}
        />
      )}

      {showDetailsModal && (
        <InvoiceDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          invoice={selectedInvoice}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default InvoicesPage;