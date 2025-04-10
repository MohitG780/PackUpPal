import type React from "react"
import { Info, Edit } from "lucide-react"

interface AboutPlaceProps {
  isDarkMode: boolean
}

const AboutPlace: React.FC<AboutPlaceProps> = ({ isDarkMode }) => {
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

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
        <p className={`text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Manali, a picturesque hill station nestled in the mountains of Himachal Pradesh, India, is renowned for its
          stunning natural beauty, lush green valleys, and snow-capped peaks. It serves as a gateway to adventure and
          tranquility alike. Visitors can indulge in various activities such as trekking, skiing, and paragliding, or
          simply relax by the Beas River. The rich cultural heritage is evident in the local temples and traditional
          architecture, while the vibrant markets offer a taste of local handicrafts and cuisine. Whether you are an
          adventure enthusiast or seeking peace, Manali has something for everyone, making it a perfect destination for
          a memorable getaway.
        </p>
      </div>
    </div>
  )
}

export default AboutPlace
