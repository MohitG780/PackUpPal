import type React from "react"
import { Clock } from "lucide-react"

interface BestTimeToVisitProps {
  isDarkMode: boolean
}

const BestTimeToVisit: React.FC<BestTimeToVisitProps> = ({ isDarkMode }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
        <h1 className="text-2xl font-bold text-gray-500">Best Time To Visit</h1>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
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
              Popular tourist season with comfortable temperatures, but can get crowded. Temperature ranges from 15°C to
              30°C.
            </p>
          </div>

          <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/80 border border-gray-600" : "bg-gray-50"}`}>
            <h3 className={`font-medium mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
              Autumn (September - November)
            </h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Less crowded with beautiful autumn colors and clear views of the mountains. Temperature ranges from 5°C to
              20°C.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestTimeToVisit
