'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Search, Wind, Droplets, Sun, Gauge } from 'lucide-react'
import useSWR from 'swr'
import { WeatherResponse } from '@/lib/types'
import { ForecastCard } from './forecast-card'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function WeatherCard() {
  const [location, setLocation] = useState('London')
  const { register, handleSubmit } = useForm()

  const { data, error, isLoading } = useSWR<WeatherResponse>(
    `/api/weather?location=${encodeURIComponent(location)}`,
    fetcher
  )

  const onSubmit = (data: { search: string }) => {
    setLocation(data.search)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            {...register('search')}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search location..."
          />
        </form>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error loading weather data</div>
        ) : data ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.location.name}, {data.location.country}
              </h2>
              <div className="mt-2 text-5xl font-bold text-gray-900 dark:text-white">
                {Math.round(data.current.temp_c)}°C
              </div>
              <p className="text-gray-500 dark:text-gray-400">{data.current.condition.text}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Wind className="mx-auto text-blue-500" />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Wind</p>
                <p className="font-semibold">{data.current.wind_kph} km/h</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Droplets className="mx-auto text-blue-500" />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="font-semibold">{data.current.humidity}%</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Sun className="mx-auto text-blue-500" />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Feels like</p>
                <p className="font-semibold">{Math.round(data.current.feelslike_c)}°C</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Gauge className="mx-auto text-blue-500" />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Pressure</p>
                <p className="font-semibold">{data.current.pressure_mb} mb</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      
      {data && <ForecastCard location={location} />}
    </div>
  )
}