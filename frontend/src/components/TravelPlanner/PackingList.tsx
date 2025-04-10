

import type React from "react"
import { useState } from "react"
import { Briefcase, Edit, Trash2, Plus } from "lucide-react"

interface PackingChecklistProps {
  isDarkMode: boolean
}

const PackingChecklist: React.FC<PackingChecklistProps> = ({ isDarkMode }) => {
  const [editMode, setEditMode] = useState(false)
  const [newItemText, setNewItemText] = useState("")
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

  const handleAddItem = () => {
    if (!newItemText.trim()) return
    setPackingItems([...packingItems, { id: packingItems.length + 1, name: newItemText }])
    setNewItemText("")
  }

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

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
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
              onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            />
            <button
              onClick={handleAddItem}
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
            <li key={item.id} className="text-lg text-blue-500">
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

export default PackingChecklist
