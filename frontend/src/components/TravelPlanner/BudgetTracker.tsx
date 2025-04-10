import type React from "react"
import { DollarSign, Plus, Utensils, Briefcase, MapPin } from "lucide-react"

interface BudgetTrackerProps {
  isDarkMode: boolean
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ isDarkMode }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <DollarSign className={`h-6 w-6 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`} />
          <h1 className="text-2xl font-bold text-gray-600">Trip Budget</h1>
        </div>
        <button
          className={`p-2 rounded-full ${
            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Total Budget</p>
            <p className="text-2xl font-bold text-blue-400">₹25,000</p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Spent</p>
            <p className="text-2xl font-bold text-red-400">₹12,350</p>
          </div>
          <div>
            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Remaining</p>
            <p className="text-2xl font-bold text-green-400">₹12,650</p>
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
                <p className="font-medium text-purple-400">Food & Dining</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>5 transactions</p>
              </div>
            </div>
            <p className="font-bold text-blue-500">₹4,500</p>
          </div>

          <div
            className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} flex justify-between items-center`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-purple-400">Accommodation</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>2 transactions</p>
              </div>
            </div>
            <p className="font-bold text-blue-500">₹6,000</p>
          </div>

          <div
            className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"} flex justify-between items-center`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-100">
                <MapPin className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-purple-400">Activities</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>3 transactions</p>
              </div>
            </div>
            <p className="font-bold text-blue-500">₹1,850</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetTracker
