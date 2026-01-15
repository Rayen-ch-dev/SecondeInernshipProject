// pages/PortfolioPage.tsx
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Image, 
  Grid3x3, 
  List, 
  Filter, 
  Plus, 
  Star, 
  Eye, 
  Download,
  Heart,
  Share2,
  Tag,
  Calendar,
  MapPin
} from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Photos', count: 142 },
    { id: 'weddings', label: 'Weddings', count: 87 },
    { id: 'engagements', label: 'Engagements', count: 32 },
    { id: 'portraits', label: 'Portraits', count: 18 },
    { id: 'corporate', label: 'Corporate', count: 5 },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Sidi Bou Said Wedding',
      category: 'weddings',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop',
      likes: 142,
      views: 890,
      rating: 4.9,
      date: '2024-05-15',
      location: 'Sidi Bou Said, Tunisia',
      tags: ['sunset', 'traditional', 'outdoor']
    },
    {
      id: 2,
      title: 'La Marsa Engagement',
      category: 'engagements',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w-800&auto=format&fit=crop',
      likes: 98,
      views: 654,
      rating: 4.8,
      date: '2024-04-22',
      location: 'La Marsa, Tunisia',
      tags: ['beach', 'golden-hour', 'romantic']
    },
    {
      id: 3,
      title: 'Family Portraits',
      category: 'portraits',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
      likes: 76,
      views: 432,
      rating: 4.7,
      date: '2024-03-10',
      location: 'Tunis, Tunisia',
      tags: ['family', 'studio', 'traditional']
    },
  ];

  const handleUpload = () => {
    setSearchParams({ action: 'upload' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Gallery</h2>
          <p className="text-gray-600">Showcase your best wedding photography work</p>
        </div>
        <button
          onClick={handleUpload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Upload Photos
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button
            className={`p-2 rounded-lg ${
              viewMode === 'grid' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            className={`p-2 rounded-lg ${
              viewMode === 'list' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setViewMode('list')}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Portfolio Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {item.rating}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {portfolioItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
              <div className="w-32 h-24 rounded-lg overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {item.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        {item.likes} likes
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl p-6">
          <div className="text-2xl font-bold">142</div>
          <div className="text-sm opacity-90">Total Photos</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl p-6">
          <div className="text-2xl font-bold">890</div>
          <div className="text-sm opacity-90">Avg. Views</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-6">
          <div className="text-2xl font-bold">4.8</div>
          <div className="text-sm opacity-90">Avg. Rating</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-6">
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm opacity-90">Featured</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;