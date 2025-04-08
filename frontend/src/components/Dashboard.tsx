import { useEffect, useState } from "react";
import {
  MapPin,
  Plane,
  Calendar,
  Search,
  Globe,
  Sun,
  Moon,
  LogOut,
  Menu,
  Briefcase,
} from "lucide-react";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    window.location.href = "/";
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const upcomingTrips = [
    {
      id: 1,
      destination: "Manali, Himachal Pradesh",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
      date: "Apr 10 - Apr 13, 2025",
      status: "Upcoming",
    },
    {
      id: 2,
      destination: "Taj Mahal, Agra",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      date: "May 15 - May 18, 2025",
      status: "Planning",
    },
  ];

  const popularDestinations = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, India",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, India",
      image: "https://c8.alamy.com/comp/FM6M6K/golden-temple-amritsar-FM6M6K.jpg",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Eiffel Tower",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f",
      rating: 4.7,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`${
          isDarkMode ? "bg-[#1e293b]" : "bg-white"
        } shadow-md sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <Plane className="h-10 w-10 text-pink-900 transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(99,102,241,0.6)]" />
            <span className="ml-3 text-xl font-bold transition-transform duration-300 group-hover:scale-105">
              <span className="bg-gradient-to-r from-pink-900 to-blue-600 text-transparent bg-clip-text">
                PackUp
              </span>
              <span className="text-blue-900">Pal</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className={`${
                isDarkMode
                  ? "text-gray-300 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              } flex items-center space-x-1`}
            >
              <Briefcase className="h-4 w-4" />
              <span>My Trips</span>
            </a>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.photoURL || "/placeholder.svg"}
                    alt="User"
                    className="h-8 w-8 rounded-full border border-purple-300"
                  />
                  <span className="text-sm font-medium hidden lg:inline">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md ${
                isDarkMode ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden ${
              isDarkMode ? "bg-[#1e293b]" : "bg-white"
            } shadow-lg`}
          >
            <div className="px-4 pt-4 pb-3 space-y-3">
              <a href="#" className="block px-3 py-2 rounded-md text-sm">
                My Trips
              </a>
              <div className="flex justify-between items-center px-3">
                <span>Dark Mode</span>
                <button onClick={toggleTheme}>
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {user && (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-500"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div
        className={`${
          isDarkMode
            ? "bg-gradient-to-br from-gray-800"
            : "bg-gradient-to-br from-purple-50 to-blue-100"
        } py-12 mb-8`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full ${
                isDarkMode
                  ? "bg-purple-800 text-purple-200"
                  : "bg-purple-200 text-purple-700"
              } text-sm`}
            >
              <Globe className="w-4 h-4 mr-2" />
              Explore the World with Us
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Discover{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                Unforgettable
              </span>{" "}
              Destinations
            </h1>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } text-lg max-w-xl`}
            >
              From hidden gems to iconic landmarks, create memories that last a
              lifetime.
            </p>
            <div className="flex space-x-4">
              <div className="group flex items-center gap-3 bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <Plane className="h-5 w-5 drop-shadow-md transform transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1" />
                <span className="font-semibold text-sm sm:text-base">
                  Start Planning
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              alt="Travel"
              className="rounded-xl shadow-xl object-cover h-80 w-full"
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12 relative z-10">
        <div
          className={`${
            isDarkMode
              ? "bg-[#1e293b] border border-gray-700"
              : "bg-white"
          } rounded-2xl shadow-xl p-6 flex items-center gap-6`}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-purple-500" />
            <input
              type="text"
              placeholder="Search destinations..."
              className={`w-full pl-14 pr-5 py-4 rounded-xl text-base font-medium ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white border-gray-300"
              } border`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="group relative bg-gradient-to-r from-purple-600 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 overflow-hidden hover:scale-105">
            <span className="text-base font-semibold">Create Plan</span>
          </button>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Upcoming Trips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {upcomingTrips.map((trip) => (
            <div
              key={trip.id}
              className={`${
                isDarkMode ? "bg-[#1e293b]" : "bg-white"
              } rounded-xl shadow-sm overflow-hidden`}
            >
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{trip.destination}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } flex items-center mt-2`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {trip.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {popularDestinations.map((destination) => (
            <div
              key={destination.id}
              className={`${
                isDarkMode ? "bg-[#1e293b]" : "bg-white"
              } rounded-xl shadow-sm overflow-hidden`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{destination.name}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } flex items-center mt-2`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {destination.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
