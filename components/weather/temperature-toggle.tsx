'use client'

import { useTemperatureStore } from '@/lib/stores/temperature-store'
import { Button } from '@/components/ui/button'
import { Thermometer } from 'lucide-react'

export function TemperatureToggle() {
  const { unit, setUnit } = useTemperatureStore()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
      className="flex items-center gap-2"
      aria-label={`Switch to ${unit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
    >
      <Thermometer className="h-4 w-4" />
      <span>{unit === 'celsius' ? '°C' : '°F'}</span>
    </Button>
  )
}