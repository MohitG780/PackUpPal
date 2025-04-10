

import type React from "react"
import { useState } from "react"
import { Utensils, Edit, Trash2, Plus } from "lucide-react"

interface LocalCuisineProps {
  isDarkMode: boolean
}

const LocalCuisine: React.FC<LocalCuisineProps> = ({ isDarkMode }) => {
  const [editMode, setEditMode] = useState(false)
  const [newItemText, setNewItemText] = useState("")
  const [cuisines, setCuisines] = useState([
    {
      id: 1,
      name: "Siddu",
      description: "Steamed wheat bread stuffed with a mixture of lentils and spices, served with ghee and chutney.",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Trout Fish",
      description: "Fresh river trout cooked with local herbs and spices, a specialty of Manali.",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Chha Gosht",
      description: "A traditional lamb curry cooked with yogurt and aromatic spices.",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Babru",
      description:
        "A local bread stuffed with black gram paste and deep-fried, served with sweet and tangy tamarind chutney.",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Tudkiya Bhath",
      description: "A flavorful rice dish cooked with lentils and spices, similar to a pulao.",
      rating: 4.5,
    },
  ])

  const handleAddItem = () => {
    if (!newItemText.trim()) return
    setCuisines([
      ...cuisines,
      {
        id: cuisines.length + 1,
        name: newItemText,
        description: "A delicious local specialty.",
        rating: 4.0,
      },
    ])
    setNewItemText("")
  }

  const handleRemoveCuisine = (id: number) => {
    setCuisines(cuisines.filter((cuisine) => cuisine.id !== id))
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Utensils className={`h-6 w-6 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`} />
          <h1 className="text-2xl font-bold text-gray-500">Local Cuisines</h1>
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

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
        {editMode && (
          <div className="flex items-center gap-2 mb-6">
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
              onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
              className={`p-3 rounded-lg ${
                isDarkMode ? "bg-pink-500 hover:bg-pink-600" : "bg-pink-500 hover:bg-pink-600"
              } text-white`}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="space-y-4">
          {cuisines.map((cuisine) => (
            <div
              key={cuisine.id}
              className={`p-4 rounded-lg ${
                isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"
              } relative`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className={`text-lg font-medium ${isDarkMode ? "text-pink-300" : "text-pink-600"}`}>
                  {cuisine.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(cuisine.rating)
                            ? "text-yellow-400"
                            : i < cuisine.rating
                              ? "text-yellow-200"
                              : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className={`ml-1 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {cuisine.rating.toFixed(1)}
                    </span>
                  </div>
                  {editMode && (
                    <button
                      onClick={() => handleRemoveCuisine(cuisine.id)}
                      className={`p-1.5 rounded-full ${
                        isDarkMode ? "hover:bg-gray-600 text-gray-400" : "hover:bg-gray-200 text-gray-500"
                      }`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{cuisine.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Where to Try Local Cuisine
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-pink-50"}`}>
              <h4 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Johnson's Cafe</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Known for its trout dishes and cozy ambiance
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-pink-50"}`}>
              <h4 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Drifters' Inn</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Excellent for authentic Himachali cuisine
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-pink-50"}`}>
              <h4 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Cafe 1947</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Great for fusion dishes with local ingredients
              </p>
            </div>
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-pink-50"}`}>
              <h4 className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                Renaissance Restaurant
              </h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Offers traditional Himachali thali
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalCuisine
