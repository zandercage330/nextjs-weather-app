import { WeatherCard } from '@/components/weather/weather-card'

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Weather App
        </h1>
        <WeatherCard />
      </div>
    </main>
  )
}