import React from "react"


import { useState, useEffect } from "react"
import { Cloud, Droplets, Thermometer, Navigation2, Wind, Eye } from "lucide-react"

interface WeatherProps {
  isDarkMode: boolean
}

const Weather: React.FC<WeatherProps> = ({ isDarkMode }) => {
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
    const fetchWeather = async () => {
      try {
        // Replace with your actual API key and store it in an environment variable
        const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "YOUR_API_KEY"
        const city = "Manali"
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
        )
        const data = await response.json()

        setWeatherData({
          temperature: data.main.temp,
          condition: data.weather[0].description,
          humidity: data.main.humidity,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          feelsLike: data.main.feels_like,
          seaLevel: data.main.sea_level ? `${data.main.sea_level} hPa` : "N/A",
          windSpeed: `${data.wind.speed} m/s`,
          windDirection: `${data.wind.deg}°`,
          visibility: `${data.visibility / 1000} km`,
        })
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Cloud className={`h-6 w-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
        <h1 className="text-2xl font-bold text-gray-500">Weather</h1>
      </div>

      <div className={`p-6 rounded-xl ${isDarkMode ? "bg-gray-800/80 border border-gray-600" : "bg-white"} shadow-sm`}>
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
              <span className="font-medium text-blue-500">{weatherData.humidity}%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className={`h-5 w-5 ${isDarkMode ? "text-red-400" : "text-red-600"}`} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Max Temperature</span>
              </div>
              <span className="font-medium text-blue-500">{weatherData.maxTemp}°</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className={`h-5 w-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Min Temperature</span>
              </div>
              <span className="font-medium text-blue-500">{weatherData.minTemp}°</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className={`h-5 w-5 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Feels like</span>
              </div>
              <span className="font-medium text-blue-500">{weatherData.feelsLike}°</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation2 className={`h-5 w-5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`} />
                <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Sea Level</span>
              </div>
              <span className="font-medium text-blue-500">{weatherData.seaLevel}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Wind className={`h-10 w-10 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
              <div>
                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Wind Speed</div>
                <div className="font-medium text-purple-400">{weatherData.windSpeed}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Navigation2 className={`h-10 w-10 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
              <div>
                <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Wind Direction</div>
                <div className="font-medium text-green-500">{weatherData.windDirection}</div>
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
            <div className="mt-1 text-right text-yellow-600">{weatherData.visibility}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
