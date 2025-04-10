

import type React from "react"
import { useState } from "react"
import { Clock, Trash2, Plus } from "lucide-react"

interface ItineraryProps {
  isDarkMode: boolean
}

const Itinerary: React.FC<ItineraryProps> = ({ isDarkMode }) => {
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

  const handleRemoveDay = (id: number) => {
    setItinerary(itinerary.filter((day) => day.id !== id))
  }

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
              <button
                onClick={() => handleRemoveDay(day.id)}
                className={`p-1.5 rounded-full ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
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
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{activity.description}</p>
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

export default Itinerary
