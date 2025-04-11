import type React from "react"
import { useState, useRef, useEffect } from "react"
import { MapPin, Search, Trash2, Maximize, Edit, Plus } from "lucide-react"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY_HERE"

interface Place {
  id: number
  name: string
  color: string
  latitude?: number
  longitude?: number
  aiRecommended?: boolean
}

interface TopPlacesProps {
  isDarkMode: boolean
  destination?: string
  apiBaseUrl?: string
}

const TopPlaces: React.FC<TopPlacesProps> = ({ 
  isDarkMode, 
  destination = "Manali",
  apiBaseUrl = "http://localhost:3001/api" // Consistent base URL with HTTP protocol
}) => {
  const [editMode, setEditMode] = useState(false)
  const [newItemText, setNewItemText] = useState("")
  const [activeView, setActiveView] = useState("map")
  const [loading, setLoading] = useState(true)
  const [mapLoadError, setMapLoadError] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mapRef = useRef(null)
  const [places, setPlaces] = useState<Place[]>([])

  // Helper function for API calls
  const callApi = async (endpoint: string, options = {}) => {
    try {
      const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // Additional headers can be added here if needed
          ...options.headers
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (err) {
      console.error(`Error calling API ${endpoint}:`, err);
      throw err;
    }
  };

  // Fetch places data using AI API
  useEffect(() => {
    const fetchPlacesWithAI = async () => {
      setLoading(true)
      try {
        const data = await callApi('/ai/places', {
          method: 'POST',
          body: JSON.stringify({
            destination: destination,
            count: 5,
            includeCoordinates: true
          })
        });
        
        // Transform API data to match our Place interface
        const colors = ["text-red-500", "text-teal-500", "text-amber-500", "text-sky-500", "text-purple-500"]
        const formattedPlaces = data.places.map((place: any, index: number) => {
          return {
            id: place.id || index + 1,
            name: place.name,
            color: colors[index % colors.length],
            latitude: place.latitude,
            longitude: place.longitude
          }
        })
        
        setPlaces(formattedPlaces)
      } catch (err) {
        console.error("Error fetching places with AI:", err)
        setError("Failed to generate places. Using default recommendations instead.")
        
        // Fallback to default data if API fails
        setPlaces([
          { id: 1, name: "Solang Valley", color: "text-red-500" },
          { id: 2, name: "Rohtang Pass", color: "text-teal-500" },
          { id: 3, name: "Hadimba Temple", color: "text-amber-500" },
          { id: 4, name: "Manali Sanctuary", color: "text-sky-500" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPlacesWithAI()
  }, [destination, apiBaseUrl])

  const handleRemovePlace = async (id: number) => {
    // Optimistically remove from UI first
    setPlaces(places.filter((place) => place.id !== id))
    
    try {
      // If this is a user-added place (not AI generated), we might want to remove it from user's saved places
      await callApi(`/user/places/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error("Error removing place:", err)
      // Optionally: restore the item in state if removal failed
    }
  }

  const handleAddItem = async () => {
    if (!newItemText.trim()) return
    
    const colors = ["text-red-500", "text-teal-500", "text-amber-500", "text-sky-500", "text-purple-500"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    const newPlace = { 
      id: Date.now(), 
      name: newItemText, 
      color: randomColor 
    }
    
    // Optimistically update UI
    setPlaces([...places, newPlace])
    setNewItemText("")
    
    try {
      // Ask AI to validate and enrich the place information
      const enrichedData = await callApi('/ai/enrich-place', {
        method: 'POST',
        body: JSON.stringify({
          placeName: newItemText,
          destination: destination
        })
      });
      
      // Then save the enriched place to the user's collection
      const savedPlace = await callApi('/user/places', {
        method: 'POST',
        body: JSON.stringify({
          ...enrichedData,
          userAdded: true
        })
      });
      
      // Update the place with the enriched data from the server
      setPlaces(places.map(p => p.id === newPlace.id ? {
        ...savedPlace,
        color: randomColor // Retain the UI color
      } : p))
      
    } catch (err) {
      console.error("Error processing place:", err)
      // Optionally, show an error notification here
    }
  }

  const generateAIRecommendations = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Use AI to generate personalized recommendations
      const data = await callApi('/ai/recommendations', {
        method: 'POST',
        body: JSON.stringify({
          destination: destination,
          existingPlaces: places.map(p => p.name),
          preferences: {
            includeHistorical: true,
            includeNature: true,
            includeLocal: true
          }
        })
      });
      
      // Transform API data and add to the current places
      const colors = ["text-red-500", "text-teal-500", "text-amber-500", "text-sky-500", "text-purple-500"]
      const newRecommendations = data.recommendations.map((place: any, index: number) => {
        return {
          id: Date.now() + index,
          name: place.name,
          color: colors[(places.length + index) % colors.length],
          latitude: place.latitude,
          longitude: place.longitude,
          aiRecommended: true
        }
      })
      
      setPlaces([...places, ...newRecommendations])
    } catch (err) {
      console.error("Error generating AI recommendations:", err)
      setError("Failed to generate new recommendations. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // If no places have coordinates, use default center (Manali)
  const defaultCenter = {
    lat: 32.2396,
    lng: 77.1887
  }

  // Center the map based on the first valid place or the default center.
  const getMapCenter = () => {
    const validPlace = places.find(p => p.latitude && p.longitude)
    if (validPlace && validPlace.latitude && validPlace.longitude) {
      return { lat: validPlace.latitude, lng: validPlace.longitude }
    }
    return defaultCenter
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
          <h1 className="text-2xl font-bold text-gray-500">Top places to visit in {destination}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={generateAIRecommendations}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              isDarkMode ? "bg-purple-700 text-purple-100 hover:bg-purple-600" : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Get AI Recommendations
          </button>
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
                placeholder="Add your own location"
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

            {loading ? (
              <div className={`flex justify-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-transparent border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? "bg-yellow-900/20 text-yellow-400" : "bg-yellow-50 text-yellow-600"}`}>
                {error}
              </div>
            ) : null}
            
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
                    {place.aiRecommended && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isDarkMode ? "bg-purple-800/50 text-purple-300" : "bg-purple-100 text-purple-700"
                      }`}>
                        AI Pick
                      </span>
                    )}
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

              {places.length === 0 && !loading && (
                <div className={`p-4 text-center rounded-lg ${
                  isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"
                }`}>
                  No places added yet. Start by adding your own or get AI recommendations.
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 h-[400px] rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              {/* Real Google Map integration with error handling */}
              <LoadScript
                googleMapsApiKey={GOOGLE_MAPS_API_KEY}
                onError={(err) => {
                  console.error("Google Maps API failed to load:", err)
                  setMapLoadError(true)
                }}
              >
                {mapLoadError ? (
                  <div className="text-red-500">
                    Google Maps failed to load. Please check the API key and your network.
                  </div>
                ) : (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={getMapCenter()}
                    zoom={12}
                    options={{
                      mapTypeId: activeView === "satellite" ? "satellite" : "roadmap",
                      disableDefaultUI: true,
                    }}
                  >
                    {places.map((place, index) => {
                      // Render marker only if valid coordinates are available
                      if (place.latitude && place.longitude) {
                        return (
                          <Marker
                            key={place.id}
                            position={{ lat: place.latitude, lng: place.longitude }}
                            label={{
                              text: `${index + 1}`,
                              className: `font-bold ${place.color}`
                            }}
                          />
                        )
                      }
                      return null;
                    })}
                  </GoogleMap>
                )}
              </LoadScript>
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
