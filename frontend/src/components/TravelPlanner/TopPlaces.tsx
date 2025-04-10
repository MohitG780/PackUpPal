

import type React from "react"
import { useState, useRef } from "react"
import { MapPin, Search, Trash2, Maximize, Edit, Plus } from "lucide-react"

interface TopPlacesProps {
  isDarkMode: boolean
}

const TopPlaces: React.FC<TopPlacesProps> = ({ isDarkMode }) => {
  const [editMode, setEditMode] = useState(false)
  const [newItemText, setNewItemText] = useState("")
  const [activeView, setActiveView] = useState("map")
  const mapRef = useRef(null)
  const [places, setPlaces] = useState([
    { id: 1, name: "Solang Valley", color: "text-red-500" },
    { id: 2, name: "Rohtang Pass", color: "text-teal-500" },
    { id: 3, name: "Hadimba Temple", color: "text-amber-500" },
    { id: 4, name: "Manali Sanctuary", color: "text-sky-500" },
  ])

  const handleRemovePlace = (id: number) => {
    setPlaces(places.filter((place) => place.id !== id))
  }

  const handleAddItem = () => {
    if (!newItemText.trim()) return
    const colors = ["text-red-500", "text-teal-500", "text-amber-500", "text-sky-500", "text-purple-500"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setPlaces([...places, { id: places.length + 1, name: newItemText, color: randomColor }])
    setNewItemText("")
  }

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
                onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
              />
              {newItemText && (
                <button
                  onClick={handleAddItem}
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
                    isDarkMode ? "bg-gray-700/90 hover:bg-gray-600 border border-gray-600" : "bg-white hover:bg-gray-50"
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
                onClick={() => setActiveView("map")}
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
                onClick={() => setActiveView("satellite")}
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

export default TopPlaces
