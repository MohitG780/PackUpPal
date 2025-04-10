import React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Settings,
  Sun,
  Cloud,
  ChevronDown,
  Plane,
  Moon,
  LogOut,
  Info,
  Share2,
  Sparkles,
  X,
  Clock,
  Utensils,
  Briefcase,
} from "lucide-react"

// Import components
import AboutPlace from "./TravelPlanner/AboutPlace.tsx"
import BestTimeToVisit from "./TravelPlanner/BestToTimeVisi.tsx"
import BudgetTracker from "./TravelPlanner/BudgetTracker.tsx"
import Itinerary from "./TravelPlanner/Itinerary.tsx"
import PackingChecklist from "./TravelPlanner/PackingList.tsx"
import TopPlaces from "./TravelPlanner/TopPlaces.tsx"
import Weather from "./TravelPlanner/Weather.tsx"

// Import auth functions
import { doSignOut } from "../firebase/auth.js"
import { auth } from "../firebase/firebase.js"
import type { User } from "firebase/auth"

const TravelPlanner = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("itinerary")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [showShareBanner, setShowShareBanner] = useState(true)
  const [showInsightsBanner, setShowInsightsBanner] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    return () => unsubscribe()
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  const handleSignOut = async () => {
    try {
      await doSignOut()
      navigate("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "itinerary":
        return <Itinerary isDarkMode={isDarkMode} />
      case "topPlaces":
        return <TopPlaces isDarkMode={isDarkMode} />
      case "packingChecklist":
        return <PackingChecklist isDarkMode={isDarkMode} />
      case "bestTime":
        return <BestTimeToVisit isDarkMode={isDarkMode} />
      case "weather":
        return <Weather isDarkMode={isDarkMode} />
      case "aboutPlace":
        return <AboutPlace isDarkMode={isDarkMode} />
      case "budget":
        return <BudgetTracker isDarkMode={isDarkMode} />
      default:
        return <Itinerary isDarkMode={isDarkMode} />
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header
        className={`border-b ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} sticky top-0 z-10`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center group cursor-pointer">
              <Plane
                className={`h-10 w-10 ${isDarkMode ? "text-pink-400" : "text-pink-600"} transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 group-hover:drop-shadow-[0_4px_8px_rgba(236,72,153,0.6)]`}
              />

              <span className="ml-3 text-xl font-bold transition-transform duration-300 group-hover:scale-105">
                <span
                  className={`bg-gradient-to-r ${isDarkMode ? "from-pink-400 to-blue-400" : "from-pink-600 to-blue-600"} text-transparent bg-clip-text`}
                >
                  PackUp
                </span>
                <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>Pal</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center ml-8 space-x-4">
              <button
                onClick={() => navigate("/Dashboard")}
                className={`px-4 py-2 ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-md`}
              >
                Dashboard
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <div
                className={`flex items-center px-4 py-2 rounded-md ${
                  isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "border border-gray-300 text-gray-900"
                }`}
              >
                <span>Manali, Himachal Pradesh, India</span>
                <ChevronDown className={`ml-2 h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className={`p-2 ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-full`}
              >
                <Share2 className="h-5 w-5" />
              </button>

              <button
                onClick={toggleTheme}
                className={`p-2 ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-full`}
              >
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {user ? (
                <div className="flex items-center gap-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL || "/placeholder.svg"}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {user.email?.[0].toUpperCase() || "U"}
                    </div>
                  )}
                  <button
                    onClick={handleSignOut}
                    className={`p-2 ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"} rounded-full`}
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  className={`px-4 py-2 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded-md`}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`w-64 border-r ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} h-[calc(100vh-64px)] p-4 sticky top-16`}
        >
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Your Plan</h3>
              <nav className="space-y-2">
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "aboutPlace"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("aboutPlace")}
                >
                  <Info className="h-5 w-5 mr-2" />
                  About the Place
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "weather"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("weather")}
                >
                  <Cloud className="h-5 w-5 mr-2" />
                  Weather
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "topPlaces"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("topPlaces")}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Top places to visit
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "itinerary"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md relative`}
                  onClick={() => setActiveSection("itinerary")}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Itinerary
                  <span className="absolute right-2 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "localCuisine"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("localCuisine")}
                >
                  <Utensils className="h-5 w-5 mr-2" />
                  Local Cuisines
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "packingChecklist"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("packingChecklist")}
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Packing Checklist
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "bestTime"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("bestTime")}
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Best time to visit
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    activeSection === "budget"
                      ? `${isDarkMode ? "bg-gray-700/90 text-white border border-pink-500/30" : "bg-blue-50 text-blue-700"}`
                      : `${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                  } rounded-md`}
                  onClick={() => setActiveSection("budget")}
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Budget Tracker
                </button>
              </nav>
            </div>

            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Control Center
              </h3>
              <nav className="space-y-2">
                <button
                  onClick={() => navigate("/Collaborator")}
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  } rounded-md`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Collaborate
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  } rounded-md`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 overflow-auto ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
          {showShareBanner && (
            <div
              className={`p-4 ${isDarkMode ? "bg-gray-800" : "bg-white"} border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"} relative`}
            >
              <div className="flex items-center">
                <Share2 className={`h-5 w-5 mr-3 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <div>
                  <h3 className="font-medium text-blue-400">Share Your Travel Plans</h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Help fellow travelers by sharing your travel plans! Your experiences could inspire and guide others
                    on their journeys.
                  </p>
                </div>
                <button
                  className={`ml-auto px-4 py-2 rounded-md ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  Publish
                </button>
              </div>
              <button className="absolute top-2 right-2" onClick={() => setShowShareBanner(false)}>
                <X className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </button>
            </div>
          )}

          {showInsightsBanner && (
            <div className={`p-4 ${isDarkMode ? "bg-gray-800/50" : "bg-blue-50/50"} relative`}>
              <div className="flex items-center">
                <Sparkles className={`h-5 w-5 mr-3 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
                <div>
                  <h3 className={`font-medium ${isDarkMode ? "text-amber-400" : "text-amber-700"}`}>
                    Travel Plan Insights Underway!
                  </h3>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Your personalized travel plan is being meticulously crafted by our advanced AI. This may take 1-3
                    minutes.
                  </p>
                </div>
              </div>
              <button className="absolute top-2 right-2" onClick={() => setShowInsightsBanner(false)}>
                <X className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </button>
            </div>
          )}

          {activeSection === "itinerary" && (
            <div className="p-6">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-09%20at%207.08.02%E2%80%AFPM-kNMdumbb9KlHZNM5bmd6aO9LtNDr9e.png"
                alt="Manali Mountains"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            </div>
          )}

          <div className="container mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}

export default TravelPlanner
