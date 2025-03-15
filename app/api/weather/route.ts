import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location')

  if (!location) {
    return NextResponse.json({ error: 'Location is required' }, { status: 400 })
  }

  const apiKey = process.env.WEATHER_API_KEY
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!apiKey || !apiUrl) {
    return NextResponse.json(
      { error: 'Weather API configuration is missing' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `${apiUrl}/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`
    )

    if (!response.ok) {
      throw new Error('Weather API request failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}