// pages/ProjectsPage.tsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  Filter,
  Calendar,
  Users,
  Target,
  Clock,
  CheckCircle,
  PauseCircle,
  AlertCircle,
  ChevronRight,
  MoreVertical,
  FileText,
  Image,
  X,
  DollarSign,
  Tag,
  Package
} from 'lucide-react';

// New Project Modal Component
const NewProjectModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    type: 'wedding',
    budget: '',
    dueDate: '',
    description: ''
  });

  // Prevent background scroll when modal is open
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

  const projectTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'event', label: 'Event' },
    { value: 'product', label: 'Product' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      title: formData.title,
      client: formData.client,
      type: formData.type,
      status: 'planning',
      progress: 0,
      dueDate: formData.dueDate,
      team: ['Chakib'],
      budget: parseInt(formData.budget) || 0,
      spent: 0,
      deliverables: [],
      description: formData.description
    };
    onSubmit(newProject);
    onClose();
    setFormData({ title: '', client: '', type: 'wedding', budget: '', dueDate: '', description: '' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl border border-gray-200 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Create New Project</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mt-1">Fill in the details for your new photography project</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Summer Wedding Series"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Amira & Karim"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (TND)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Describe the project details, requirements, and any special notes..."
                />
              </div>
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
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// Project Details Modal Component
const ProjectDetailsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  project: any;
}> = ({ isOpen, onClose, project }) => {
  // Prevent background scroll when modal is open
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

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 z-40 backdrop-blur-sm bg-white/30"></div>
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                <p className="text-gray-600">{project.client}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
                <span className="capitalize">{project.status.replace('-', ' ')}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                <Tag className="w-4 h-4" />
                <span className="capitalize">{project.type}</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Progress and Budget Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Budget & Expenses</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Budget</span>
                    <span className="font-bold text-blue-600">{project.budget} TND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Spent</span>
                    <span className="font-medium">{project.spent} TND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining</span>
                    <span className="font-medium text-green-600">{project.budget - project.spent} TND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline and Team Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Due Date</div>
                      <div className="font-medium">{project.dueDate}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Status</div>
                      <div className="font-medium capitalize">{project.status.replace('-', ' ')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Team Members</h4>
                <div className="space-y-3">
                  {project.team.map((member: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Deliverables</h4>
              <div className="flex flex-wrap gap-2">
                {project.deliverables.map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
                {project.deliverables.length === 0 && (
                  <p className="text-gray-500 italic">No deliverables added yet</p>
                )}
              </div>
            </div>

            {/* Notes/Description Section */}
            {project.description && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Project Description</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{project.description}</p>
              </div>
            )}
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
                Edit Project
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
    case 'active':
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'planning':
      return 'bg-yellow-100 text-yellow-800';
    case 'on-hold':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
    case 'in-progress':
      return <Clock className="w-4 h-4" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    case 'planning':
      return <Target className="w-4 h-4" />;
    case 'on-hold':
      return <PauseCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

const ProjectsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Summer Wedding Series',
      client: 'Amira & Karim',
      type: 'wedding',
      status: 'in-progress',
      progress: 65,
      dueDate: '2024-06-30',
      team: ['Chakib', 'Sami', 'Leila'],
      budget: 5000,
      spent: 3250,
      deliverables: ['Photos', 'Album', 'Video'],
      description: 'Complete wedding photography coverage with album and video highlights.'
    },
    {
      id: 2,
      title: 'Corporate Branding',
      client: 'TechCorp Tunisia',
      type: 'corporate',
      status: 'active',
      progress: 100,
      dueDate: '2024-05-15',
      team: ['Chakib'],
      budget: 3000,
      spent: 2800,
      deliverables: ['Headshots', 'Team Photos', 'Office Tour'],
      description: 'Corporate branding photography for company website and marketing materials.'
    },
    {
      id: 3,
      title: 'Family Documentary',
      client: 'Ben Ali Family',
      type: 'portrait',
      status: 'planning',
      progress: 25,
      dueDate: '2024-07-20',
      team: ['Chakib', 'Sami'],
      budget: 2000,
      spent: 500,
      deliverables: ['Family Photos', 'Storybook', 'Wall Art'],
      description: 'Family documentary session capturing daily life and special moments.'
    },
  ]);

  const handleCreateProject = () => {
    setShowNewProjectModal(true);
  };

  const handleAddNewProject = (newProject: any) => {
    setProjects([...projects, newProject]);
  };

  const handleViewDetails = (project: any) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Manage ongoing photography projects</p>
        </div>
        <button
          onClick={handleCreateProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['all', 'active', 'planning', 'completed', 'on-hold'].map(f => (
            <button
              key={f}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(f)}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-lg transition-colors ${
              view === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setView('grid')}
          >
            <Briefcase className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-lg transition-colors ${
              view === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setView('list')}
          >
            <FileText className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{projects.filter(p => p.status === 'active' || p.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600">Active Projects</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {projects.reduce((sum, project) => sum + project.budget, 0).toLocaleString()} TND
          </div>
          <div className="text-sm text-gray-600">Total Budget</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg. Progress</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span className="capitalize">{project.status.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Due Date</span>
                      <span className="font-medium">{project.dueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Budget</span>
                      <span className="font-bold text-blue-600">{project.budget.toLocaleString()} TND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team</span>
                      <span className="font-medium">{project.team.length} members</span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Deliverables:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((item, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => handleViewDetails(project)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    View Details
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map(project => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{project.title}</div>
                    <div className="text-sm text-gray-500 capitalize">{project.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{project.client}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      <span className="capitalize">{project.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-600"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600">{project.budget.toLocaleString()} TND</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-900">
                      <Calendar className="w-4 h-4" />
                      {project.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewDetails(project)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showNewProjectModal && (
        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
          onSubmit={handleAddNewProject}
        />
      )}

      {showDetailsModal && (
        <ProjectDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectsPage;