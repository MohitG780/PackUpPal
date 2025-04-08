import React from 'react';
import { Utensils, Tent, Camera, Train } from 'lucide-react';

export const Features =() => {
  const features = [
    {
      icon: <Train className="w-6 h-6" />,
      title: "Cultural Journeys",
      description: "Experience diverse cultures through carefully curated routes"
    },
    {
      icon: <Utensils className="w-6 h-6" />,
      title: "Culinary Adventures",
      description: "Savor authentic cuisines and food trails across the globe"
    },
    {
      icon: <Tent className="w-6 h-6" />,
      title: "Local Experiences",
      description: "Connect with local communities and traditional lifestyles"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Photo Trails",
      description: "Capture Instagram-worthy moments at scenic locations"
    }
  ];

  const destinations = [
    {
      name: "Rajasthan",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&q=80",
      description: "Royal palaces and desert adventures"
    },
    {
      name: "Santorini",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80",
      description: "Stunning sunsets and Mediterranean charm"
    },
    {
      name: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
      description: "Serene backwaters and ayurvedic experiences"
    },
    {
      name: "Swiss Alps",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80",
      description: "Majestic mountains and scenic trails"
    },
    {
      name: "Himalayas",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
      description: "Mountain treks and spiritual retreats"
    }
  ];

  return (
    <>
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Discover Your Perfect Adventure
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Curated experiences that bring the world's magic to life
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-purple-50 p-6 rounded-xl hover:bg-purple-100 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-lg text-pink-900 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-purple-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Popular Destinations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                  <p className="text-white/90">{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}