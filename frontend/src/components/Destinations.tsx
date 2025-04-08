import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, ArrowLeft } from 'lucide-react';

export function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const destinations = [
    {
      name: "Taj Mahal, India",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80",
      description: "A testament to eternal love and architectural brilliance",
      rating: 4.9,
      region: "asia"
    },
    {
      name: "Santorini, Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80",
      description: "Iconic white buildings and breathtaking sunsets",
      rating: 4.8,
      region: "europe"
    },
    {
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80",
      description: "Majestic peaks and pristine alpine landscapes",
      rating: 4.9,
      region: "europe"
    },
    {
      name: "Kerala Backwaters",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
      description: "Serene waterways and lush tropical beauty",
      rating: 4.7,
      region: "asia"
    },
    {
      name: "Machu Picchu, Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80",
      description: "Ancient Incan city in the clouds",
      rating: 4.9,
      region: "americas"
    },
    {
      name: "Mount Fuji, Japan",
      image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80",
      description: "Japan's iconic sacred mountain",
      rating: 4.8,
      region: "asia"
    }
  ];

  const filteredDestinations = selectedRegion === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.region === selectedRegion);

  return (
    <div className="bg-white relative">
      {/* Back Icon Button */}
      <div className="absolute top-5 left-5 z-50">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full bg-white shadow-md hover:bg-purple-100 hover:text-purple-700 transition-all duration-300"
          title="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Explore Amazing Destinations</h1>
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="all">All Regions</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="americas">Americas</option>
              </select>
              <button className="px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{destination.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <h3 className="ml-2 text-xl font-semibold text-gray-900">{destination.name}</h3>
                </div>
                <p className="text-gray-600">{destination.description}</p>
                <button className="mt-4 w-full px-4 py-2 bg-pink-900 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
