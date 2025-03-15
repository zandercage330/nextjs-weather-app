'use client'

import { Cloud, Sun, Moon } from 'lucide-react'
import useSWR from 'swr'

interface ForecastDay {
  date: string
  day: {
    maxtemp_c: number
    mintemp_c: number
    condition: {
      text: string
      icon: string
    }
  }
  astro: {
    sunrise: string
    sunset: string
  }
}

interface ForecastData {
  forecast: {
    forecastday: ForecastDay[]
  }
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function ForecastCard({ location }: { location: string }) {
  const { data, error, isLoading } = useSWR<ForecastData>(
    `/api/forecast?location=${encodeURIComponent(location)}`,
    fetcher
  )

  if (isLoading) return <div className="text-center">Loading forecast...</div>
  if (error) return <div className="text-center text-red-500">Error loading forecast</div>
  if (!data) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.forecast.forecastday.map((day) => (
          <div key={day.date} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <img 
                src={day.day.condition.icon} 
                alt={day.day.condition.text}
                className="w-12 h-12"
              />
              <div className="text-right">
                <div className="font-semibold text-gray-900 dark:text-white">
                  {Math.round(day.day.maxtemp_c)}°C
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(day.day.mintemp_c)}°C
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
              <div className="flex items-center">
                <Sun className="w-4 h-4 mr-1" />
                {day.astro.sunrise}
              </div>
              <div className="flex items-center">
                <Moon className="w-4 h-4 mr-1" />
                {day.astro.sunset}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}