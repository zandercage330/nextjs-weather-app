export interface WeatherCondition {
  text: string
  icon: string
}

export interface Location {
  name: string
  country: string
  lat: number
  lon: number
}

export interface CurrentWeather {
  temp_c: number
  condition: WeatherCondition
  wind_kph: number
  humidity: number
  feelslike_c: number
  uv: number
  pressure_mb: number
}

export interface WeatherResponse {
  location: Location
  current: CurrentWeather
}