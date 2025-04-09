

import { useState } from "react"
import {
  MapPin,
  Search,
  Trash2,
  Maximize,
  LightbulbIcon,
  Clock,
  Utensils,
  Briefcase,
  Calendar,
  DollarSign,
  Users,
  Settings,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
  Navigation2,
  Pencil,
  Send,
  ChevronDown,
  Plane,
} from "lucide-react"

export default function TravelPlanner() {
  const [activeSection, setActiveSection] = useState("topPlaces")
  const [places, setPlaces] = useState([
    { id: 1, name: "Solang Valley" },
    { id: 2, name: "Rohtang Pass" },
    { id: 3, name: "Hadimba Temple" },
    { id: 4, name: "Manali Sanctuary" },
  ])

  const [cuisines, setCuisines] = useState([
    { id: 1, name: "Sidu" },
    { id: 2, name: "Chana Madra" },
    { id: 3, name: "Dham" },
    { id: 4, name: "Tandoori Chicken" },
    { id: 5, name: "Sizzling Brownie with Ice Cream" },
  ])

  const [packingItems, setPackingItems] = useState([
    { id: 1, name: "Warm clothing (jackets, thermals)" },
    { id: 2, name: "Hiking boots" },
    { id: 3, name: "Rain gear" },
    { id: 4, name: "First-aid kit" },
    { id: 5, name: "Light backpack" },
    { id: 6, name: "Water bottle" },
    { id: 7, name: "Camping gear (if camping)" },
    { id: 8, name: "Personal hygiene items" },
    { id: 9, name: "Sunglasses and sunscreen" },
    { id: 10, name: "Camera" },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("map") // "map" or "satellite"

  const handleRemovePlace = (id: number) => {
    setPlaces(places.filter((place) => place.id !== id))
  }

  const renderTopPlaces = () => {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-6 w-6 text-gray-700" />
          <h1 className="text-2xl font-bold">Top places to visit</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-blue-50 p-6 rounded-xl">
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search new location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-3">
              {places.map((place) => (
                <div key={place.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-full font-medium text-sm
                          ${
                            place.id === 1
                              ? "text-red-500"
                              : place.id === 2
                                ? "text-teal-500"
                                : place.id === 3
                                  ? "text-amber-500"
                                  : "text-blue-500"
                          }`}
                      >
                        {place.id}.
                      </span>
                      <span className="font-medium">{place.name}</span>
                    </div>
                    <button
                      onClick={() => handleRemovePlace(place.id)}
                      className="text-red-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl overflow-hidden border border-gray-200 bg-white relative">
            <div className="absolute top-4 right-4 z-10 flex bg-white rounded-md shadow-md">
              <button
                className={`px-4 py-2 rounded-l-md ${
                  activeView === "map" ? "bg-gray-800 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveView("map")}
              >
                Map
              </button>
              <button
                className={`px-4 py-2 rounded-r-md ${
                  activeView === "satellite" ? "bg-gray-800 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveView("satellite")}
              >
                Satellite
              </button>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <button className="p-2 bg-white rounded-md shadow-md hover:bg-gray-100">
                <Maximize className="h-4 w-4" />
              </button>
            </div>

            {/* Map placeholder */}
            <div className="w-full h-[500px] bg-gray-100">
              <img src="/placeholder.svg?height=500&width=800" alt="Map view" className="w-full h-full object-cover" />
            </div>

            <div className="absolute bottom-4 left-4 z-10">
              <img src="/placeholder.svg?height=40&width=100" alt="Google logo" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderLocalCuisine = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold">Local Cuisine Recommendations</h1>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-4">
            {cuisines.map((cuisine) => (
              <div key={cuisine.id} className="flex items-center gap-3">
                <span className="font-medium">{cuisine.id}.</span>
                <span>{cuisine.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderPackingChecklist = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold">Packing Checklist</h1>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="space-y-4">
            {packingItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="font-medium">{item.id}.</span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderBestTimeToVisit = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-gray-700" />
            <h1 className="text-2xl font-bold">Best Time To Visit</h1>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-700">
            The best time to visit Manali is from mid-December to February for snow sports and scenic winter landscapes,
            or from March to June for pleasant weather and outdoor activities.
          </p>
        </div>
      </div>
    )
  }

  const renderWeather = () => {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Cloud className="h-6 w-6 text-gray-700" />
          <h1 className="text-2xl font-bold">Weather</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-medium text-center mb-4">Manali</h2>
            <div className="flex items-center justify-center gap-4">
              <Cloud className="h-16 w-16 text-gray-600" />
              <span className="text-6xl font-light">30°</span>
            </div>
            <p className="text-center text-gray-500 mt-2">Few Clouds</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-gray-600" />
                  <span>Wind Speed:</span>
                </div>
                <span className="font-medium">3.88 m/s</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation2 className="h-5 w-5 text-gray-600" />
                  <span>Wind Direction:</span>
                </div>
                <span className="font-medium">53°</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-gray-600" />
                  <span>Humidity:</span>
                </div>
                <span className="font-medium">77%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-gray-600" />
                  <span>Max Temperature:</span>
                </div>
                <span className="font-medium">31°</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-gray-600" />
                  <span>Min Temperature:</span>
                </div>
                <span className="font-medium">29°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "topPlaces":
        return renderTopPlaces()
      case "localCuisine":
        return renderLocalCuisine()
      case "packingChecklist":
        return renderPackingChecklist()
      case "bestTime":
        return renderBestTimeToVisit()
      case "weather":
        return renderWeather()
      default:
        return renderTopPlaces()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
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

            <nav className="hidden md:flex items-center ml-8 space-x-4">
              <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Dashboard</button>
      
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                className="w-64 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Manali, Himachal Pradesh, India"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <div className="flex items-center gap-3">
              
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <Send className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-full">
                <Sun className="h-5 w-5" />
              </button>
              <div className="h-9 w-9 rounded-full bg-teal-700 flex items-center justify-center text-white font-medium">
                M
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 h-[calc(100vh-64px)] p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Your Plan</h3>
              <nav className="space-y-2">
                <button className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md">
                  <LightbulbIcon className="h-5 w-5 mr-2" />
                  Your Imagination
                </button>
                <button
                  className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={() => setActiveSection("aboutPlace")}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  About the Place
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center rounded-md ${
                    activeSection === "weather"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("weather")}
                >
                  <Cloud className="h-5 w-5 mr-2" />
                  Weather
                </button>
                <button className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md">
                  <MapPin className="h-5 w-5 mr-2" />
                  Top Activities
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center rounded-md ${
                    activeSection === "topPlaces"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("topPlaces")}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Top places to visit
                </button>
                <button className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md">
                  <Calendar className="h-5 w-5 mr-2" />
                  Itinerary
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center rounded-md ${
                    activeSection === "localCuisine"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("localCuisine")}
                >
                  <Utensils className="h-5 w-5 mr-2" />
                  Local Cuisines
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center rounded-md ${
                    activeSection === "packingChecklist"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("packingChecklist")}
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Packing Checklist
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center rounded-md ${
                    activeSection === "bestTime"
                      ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("bestTime")}
                >
                  <Clock className="h-5 w-5 mr-2" />
                  Best time to visit
                </button>
              </nav>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Control Center</h3>
              <nav className="space-y-2">
                <button className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Expense Tracker
                </button>
                <button className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md">
                  <Users className="h-5 w-5 mr-2" />
                  Collaborate
                </button>
                <button className="w-full px-3 py-2 text-left flex items-center text-gray-700 hover:bg-gray-100 rounded-md">
                  <Settings className="h-5 w-5 mr-2" />
                  Settings
                </button>
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
