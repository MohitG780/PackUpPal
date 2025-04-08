import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.js';

export const Hero = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setUser(currUser);
    });
    return () => unsubscribe();
  }, []);

  const handlePlanJourney = () => {
    if (user) {
      navigate('/Dashboard');
    } else {
      toast.error('Please sign in first');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white">
      <Toaster position="top-center" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-pink-900 mb-6">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Discover World's Wonders</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Your Journey Through
              <span className="block text-blue-800">Amazing Destinations</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              From the majestic Himalayas to the charming streets of Paris, let us craft your perfect adventure with personalized itineraries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold flex items-center justify-center hover:bg-purple-700 transition-all"
                onClick={handlePlanJourney}
              >
                Plan Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                onClick={() => navigate("/Destination")}
              >
                Explore Destinations
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80" 
                alt="Taj Mahal" 
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80" 
                alt="Kerala Backwaters" 
                className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80" 
                alt="Varanasi Ghats" 
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80" 
                alt="Paris" 
                className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
