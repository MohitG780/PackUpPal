import React, { useState, useEffect } from 'react';
import { Plane, Menu, User, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  doSignInWithGoogle,
  doSignInWithGitHub,
  doSignOut,
} from '../firebase/auth.js';
import { auth } from '../firebase/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const toggleModal = () => setShowModal(!showModal);

  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
      setShowModal(false);
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      await doSignInWithGitHub();
      setShowModal(false);
    } catch (err) {
      console.error('GitHub login failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await doSignOut();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav className="bg-purple-50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center group cursor-pointer">
                    {/* Icon */}
                    <Plane className="h-10 w-10 text-pink-900 transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(99,102,241,0.6)]" />
            
                    {/* Text */}
                   <span className="ml-3 text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                <span className="bg-gradient-to-r from-pink-900 to-blue-600 text-transparent bg-clip-text">
                  PackUp
                </span>
                <span className="text-blue-900">Pal</span>
              </span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <span
                onClick={() => handleNavigate("/Destination")}
                className="cursor-pointer text-gray-700 hover:text-purple-600 transition-colors"
              >
                Destinations
              </span>
              <span 
                onClick={() => handleNavigate("/Experiences")}
                className="cursor-pointer text-gray-700 hover:text-purple-600 transition-colors">
                Experiences
              </span>
             
            </div>

            {/* Auth / Menu */}
            <div className="flex items-center space-x-4">
              <button className="md:hidden p-2">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>

              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser.photoURL}
                    alt="User"
                    className="h-8 w-8 rounded-full border border-gray-300"
                  />
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={toggleModal}
                  className="hidden md:flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-green-900"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showModal && !currentUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-80 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold text-center mb-6">Continue With</h2>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Sign in with Google
              </button>
              <button
                onClick={handleGitHubLogin}
                className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
              >
                Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
