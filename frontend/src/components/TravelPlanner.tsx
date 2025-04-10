"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
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
  ChevronDown,
  Plane,
  Moon,
  LogOut,
  Info,
  Edit,
  Plus,
  X,
  Share2,
  Sparkles,
  Eye,
} from "lucide-react"

// Import auth functions
import { doSignOut } from "../firebase/auth.js"
import { auth } from "../firebase/firebase.js"
import type { User } from "firebase/auth"

export const TravelPlanner = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("itinerary")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("map")
  const [showShareBanner, setShowShareBanner] = useState(true)
  const [showInsightsBanner, setShowInsightsBanner] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [newItemText, setNewItemText] = useState("")
  const mapRef = useRef(null)

  

  const [places, setPlaces] = useState([
    { id: 1, name: "Solang Valley", color: "text-red-500" },
    { id: 2, name: "Rohtang Pass", color: "text-teal-500" },
    { id: 3, name: "Hadimba Temple", color: "text-amber-500" },
    { id: 4, name: "Manali Sanctuary", color: "text-sky-500" },
  ])

  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      day: "Day 1: Arrival in Manali",
      activities: [
        {
          time: "Morning",
          title: "Arrival and Check-in at Hotel",
          description: "Settle into your hotel and refresh after your journey.",
        },
        {
          time: "Afternoon",
          title: "Explore Mall Road",
          description: "Visit local shops and cafes at Mall Road, the heart of Manali.",
        },
        {
          time: "Evening",
          title: "Dinner at Local Restaurant",
          description: "Enjoy authentic Himachali cuisine at a nearby restaurant.",
        },
      ],
    },
    {
      id: 2,
      day: "Day 2: Solang Valley Adventure",
      activities: [
        {
          time: "Morning",
          title: "Visit Solang Valley",
          description: "Head to Solang Valley for breathtaking views and adventure activities.",
        },
        {
          time: "Afternoon",
          title: "Paragliding or Zorbing",
          description: "Experience thrilling paragliding or zorbing in Solang Valley.",
        },
        {
          time: "Evening",
          title: "Return to Manali and Relax",
          description: "Head back to Manali and relax at your hotel or explore local cafés.",
        },
      ],
    },
    {
      id: 3,
      day: "Day 3: Rohtang Pass Expedition",
      activities: [
        {
          time: "Morning",
          title: "Rohtang Pass Visit",
          description: "Early morning departure for Rohtang Pass (subject to weather conditions).",
        },
        {
          time: "Afternoon",
          title: "Snow Activities",
          description: "Enjoy snow activities and capture panoramic views.",
        },
        {
          time: "Evening",
          title: "Local Market Visit",
          description: "Shop for local handicrafts and souvenirs.",
        },
      ],
    },
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

  const [weatherData, setWeatherData] = useState({
    temperature: 30,
    condition: "Few Clouds",
    humidity: 77,
    maxTemp: 31,
    minTemp: 29,
    feelsLike: 37,
    seaLevel: "1008 hPa",
    windSpeed: "3.88 m/s",
    windDirection: "53°",
    visibility: "10km",
  })

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

  const handleRemovePlace = (id: number) => {
    setPlaces(places.filter((place) => place.id !== id))
  }

  const handleAddItem = (type: string) => {
    if (!newItemText.trim()) return

    if (type === "place") {
      const colors = ["text-red-500", "text-teal-500", "text-amber-500", "text-sky-500", "text-purple-500"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setPlaces([...places, { id: places.length + 1, name: newItemText, color: randomColor }])
    } else if (type === "packing") {
      setPackingItems([...packingItems, { id: packingItems.length + 1, name: newItemText }])
    } else if (type === "cuisine") {
      setCuisines([...cuisines, { id: cuisines.length + 1, name: newItemText }])
    }

    setNewItemText("")
  }

  const renderItinerary = () => {
    return (
      <div className="p-6">
        <div className="space-y-6">
          {itinerary.map((day) => (
            <div
              key={day.id}
              className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>{day.day}</h2>
                <button className={`p-1.5 rounded-full ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <Trash2 className={`h-4 w-4 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                </button>
              </div>
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"}`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{activity.time}</span>
                    </div>
                    <h3 className={`font-medium mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {activity.title}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {activity.description}
                    </p>
                  </div>
                ))}
                <button
                  className={`w-full p-3 rounded-lg border border-dashed flex items-center justify-center gap-2 ${
                    isDarkMode
                      ? "border-gray-600 text-gray-400 hover:bg-gray-700"
                      : "border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  Add Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTopPlaces = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MapPin className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className="text-2xl font-bold text-gray-500">Top places to visit</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`p-2 rounded-full ${
                isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Edit className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/70 border border-gray-700" : "bg-blue-50/50"}`}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div
                className={`flex items-center gap-2 p-3 mb-4 rounded-lg ${isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white"}`}
              >
                <Search className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                <input
                  type="text"
                  placeholder="Search new location"
                  className={`w-full bg-transparent border-none outline-none ${
                    isDarkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-900 placeholder-gray-400"
                  }`}
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddItem("place")}
                />
                {newItemText && (
                  <button
                    onClick={() => handleAddItem("place")}
                    className={`p-1 rounded-full ${
                      isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
                    } text-white`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {places.map((place, index) => (
                  <div
                    key={place.id}
                    className={`p-4 rounded-lg flex items-center justify-between ${
                      isDarkMode
                        ? "bg-gray-700/90 hover:bg-gray-600 border border-gray-600"
                        : "bg-white hover:bg-gray-50"
                    } transition-colors cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-medium ${place.color}`}>{index + 1}.</span>
                      <span className={isDarkMode ? "text-gray-200" : "text-gray-900"}>{place.name}</span>
                    </div>
                    {editMode && (
                      <button
                        onClick={() => handleRemovePlace(place.id)}
                        className={`p-1.5 rounded-full ${
                          isDarkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 h-[400px] rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div ref={mapRef} className="w-full h-full">
                  {/* Map would be rendered here with a library like Google Maps or Mapbox */}
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-09%20at%207.13.44%E2%80%AFPM-kAoJivOFWbMOy3SwQMIayfZqCzuY6h.png"
                    alt="Map of Manali"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  className={`px-3 py-1.5 text-sm font-medium ${
                    activeView === "map"
                      ? isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                      : isDarkMode
                        ? "bg-gray-800/70 text-gray-300"
                        : "bg-gray-100/70 text-gray-700"
                  }`}
                >
                  Map
                </button>
                <button
                  className={`px-3 py-1.5 text-sm font-medium ${
                    activeView === "satellite"
                      ? isDarkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-gray-900"
                      : isDarkMode
                        ? "bg-gray-800/70 text-gray-300"
                        : "bg-gray-100/70 text-gray-700"
                  }`}
                >
                  Satellite
                </button>
              </div>
              <button className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md">
                <Maximize className="h-5 w-5 text-gray-700" />
              </button>
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
            <Utensils className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className="text-2xl font-bold text-gray-500">Local Cuisine Recommendations</h1>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
        >
          {editMode && (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Add new cuisine"
                className={`flex-1 p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200 placeholder-gray-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400"
                } border-none outline-none`}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddItem("cuisine")}
              />
              <button
                onClick={() => handleAddItem("cuisine")}
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          )}

          <ol className="list-decimal pl-6 space-y-3">
            {cuisines.map((cuisine) => (
              <li key={cuisine.id} className="text-lg   text-blue-500">
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? "text-gray-200" : "text-gray-900"}>{cuisine.name}</span>
                  {editMode && (
                    <button
                      onClick={() => setCuisines(cuisines.filter((c) => c.id !== cuisine.id))}
                      className={`p-1.5 rounded-full ${
                        isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  const renderPackingChecklist = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className="text-2xl font-bold text-gray-500">Packing Checklist</h1>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-2 rounded-full ${
              isDarkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Edit className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
        >
          {editMode && (
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Add new item"
                className={`flex-1 p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200 placeholder-gray-500"
                    : "bg-gray-100 text-gray-900 placeholder-gray-400"
                } border-none outline-none`}
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddItem("packing")}
              />
              <button
                onClick={() => handleAddItem("packing")}
                className={`p-3 rounded-lg ${
                  isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          )}

          <ol className="list-decimal pl-6 space-y-3">
            {packingItems.map((item) => (
              <li key={item.id} className="text-lg   text-blue-500">
                <div className="flex items-center justify-between">
                  <span className={isDarkMode ? "text-gray-200" : "text-gray-900"}>{item.name}</span>
                  {editMode && (
                    <button
                      onClick={() => setPackingItems(packingItems.filter((i) => i.id !== item.id))}
                      className={`p-1.5 rounded-full ${
                        isDarkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  const renderBestTimeToVisit = () => {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
          <h1 className="text-2xl font-bold text-gray-500">Best Time To Visit</h1>
        </div>

        <div
          className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
        >
          <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            The best time to visit Manali is from mid-December to February for snow sports and scenic winter landscapes,
            or from March to June for pleasant weather and outdoor activities.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"}`}>
              <h3 className={`font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Winter (December - February)
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Perfect for snow activities, winter sports, and experiencing the magical snow-covered landscapes.
                Temperature ranges from -1°C to 10°C.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"}`}>
              <h3 className={`font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Spring (March - May)
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Ideal for outdoor activities, trekking, and paragliding with pleasant weather. Temperature ranges from
                10°C to 25°C.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"}`}>
              <h3 className={`font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Summer (June - August)
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Popular tourist season with comfortable temperatures, but can get crowded. Temperature ranges from 15°C
                to 30°C.
              </p>
            </div>

            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"}`}>
              <h3 className={`font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                Autumn (September - November)
              </h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Less crowded with beautiful autumn colors and clear views of the mountains. Temperature ranges from 5°C
                to 20°C.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderWeather = () => {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Cloud className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
          <h1 className="text-2xl font-bold text-gray-500">Weather</h1>
        </div>

        <div
          className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className={`flex flex-col items-center justify-center p-6 rounded-lg ${isDarkMode ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30" : "bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"}`}
            >
              <h2 className="text-xl font-semibold mb-4">Manali</h2>
              <div className="flex items-center gap-4">
                <Cloud className={`h-16 w-16 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <div className="text-6xl font-light">{weatherData.temperature}°</div>
              </div>
              <div className={`mt-2 ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}>{weatherData.condition}</div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className={`h-5 w-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Humidity</span>
                </div>
                <span className="font-medium   text-blue-500">{weatherData.humidity}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className={`h-5 w-5 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Max Temperature</span>
                </div>
                <span className="font-medium  text-blue-500">{weatherData.maxTemp}°</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className={`h-5 w-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Min Temperature</span>
                </div>
                <span className="font-medium  text-blue-500">{weatherData.minTemp}°</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className={`h-5 w-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Feels like</span>
                </div>
                <span className="font-medium  text-blue-500">{weatherData.feelsLike}°</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation2 className={`h-5 w-5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                  <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Sea Level</span>
                </div>
                <span className="font-medium  text-blue-500">{weatherData.seaLevel}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Wind className={`h-10 w-10 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Wind Speed</div>
                  <div className="font-medium   text-red-500">{weatherData.windSpeed}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Navigation2 className={`h-10 w-10 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <div>
                  <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Wind Direction</div>
                  <div className="font-medium   text-green-500">{weatherData.windDirection}</div>
                </div>
              </div>
            </div>

            <div>
              <div className={`mb-2 ${isDarkMode ? "text-gray-200" : ""}`}>Visibility</div>
              <div className="flex items-center justify-between">
                <div className={`p-1 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`}>
                  <Eye className={`h-4 w-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                </div>
                <div className={`flex-1 mx-4 h-2 ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full relative`}>
                  <div
                    className={`absolute inset-y-0 left-0 ${isDarkMode ? "bg-blue-400" : "bg-blue-500"} rounded-full w-3/4`}
                  ></div>
                </div>
                <div className={`p-1 rounded-full ${isDarkMode ? "bg-gray-600" : "bg-gray-300"}`}>
                  <Eye className={`h-4 w-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                </div>
              </div>
              <div className="mt-1 text-right   text-yellow-600">{weatherData.visibility}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderAboutPlace = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Info className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <h1 className="text-2xl font-bold text-gray-500">About the Place</h1>
          </div>
          <button className={`p-2 rounded-full ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
            <Edit className={`h-5 w-5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
          </button>
        </div>

        <div
          className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
        >
          <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            Manali, a picturesque hill station nestled in the mountains of Himachal Pradesh, India, is renowned for its
            stunning natural beauty, lush green valleys, and snow-capped peaks. It serves as a gateway to adventure and
            tranquility alike. Visitors can indulge in various activities such as trekking, skiing, and paragliding, or
            simply relax by the Beas River. The rich cultural heritage is evident in the local temples and traditional
            architecture, while the vibrant markets offer a taste of local handicrafts and cuisine. Whether you are an
            adventure enthusiast or seeking peace, Manali has something for everyone, making it a perfect destination
            for a memorable getaway.
          </p>
        </div>
      </div>
    )
  }

  const renderBudgetTracker = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DollarSign className={`h-6 w-6 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`} />
            <h1 className="text-2xl font-bold text-gray-500">Trip Budget</h1>
          </div>
          <button
            className={`p-2 rounded-full ${
              isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Total Budget</p>
              <p className="text-2xl font-bold text-blue-500">₹25,000</p>
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Spent</p>
              <p className="text-2xl font-bold text-pink-500">₹12,350</p>
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Remaining</p>
              <p className="text-2xl font-bold text-green-500">₹12,650</p>
            </div>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
              style={{ width: "49%" }}
            ></div>
          </div>

          <div className="space-y-4">
            <div
              className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} flex justify-between items-center`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-pink-100">
                  <Utensils className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium  text-green-500">Food & Dining</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>5 transactions</p>
                </div>
              </div>
              <p className="font-bold  text-blue-500">₹4,500</p>
            </div>

            <div
              className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} flex justify-between items-center`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium  text-green-500">Accommodation</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>2 transactions</p>
                </div>
              </div>
              <p className="font-bold  text-blue-500">₹6,000</p>
            </div>

            <div
              className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} flex justify-between items-center`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium  text-green-500">Activities</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>3 transactions</p>
                </div>
              </div>
              <p className="font-bold  text-blue-500">₹1,850</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "itinerary":
        return renderItinerary()
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
      case "aboutPlace":
        return renderAboutPlace()
      case "budget":
        return renderBudgetTracker()
      default:
        return renderItinerary()
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
              <button onClick={() => navigate("/Dashboard")}
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
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  } rounded-md`}
                >
                  <LightbulbIcon className="h-5 w-5 mr-2" />
                  Your Imagination
                </button>
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
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  } rounded-md`}
                >
                  <DollarSign className="h-5 w-5 mr-2" />
                  Expense Tracker
                </button>
                <button
                  className={`w-full px-3 py-2 text-left flex items-center ${
                    isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                  } rounded-md`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Collaborate
                </button>
                <button
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
                  <h3 className="font-medium">Share Your Travel Plans</h3>
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
