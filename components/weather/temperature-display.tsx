'use client'

import { useTemperatureStore } from '@/lib/stores/temperature-store'
import { cn } from '@/lib/utils'

interface TemperatureDisplayProps {
  temperature: number
  className?: string
  showUnit?: boolean
}

export function TemperatureDisplay({
  temperature,
  className,
  showUnit = true,
}: TemperatureDisplayProps) {
  const { unit, convertTemperature } = useTemperatureStore()
  const convertedTemp = Math.round(convertTemperature(temperature))

  return (
    <span className={cn('font-semibold', className)}>
      {convertedTemp}
      {showUnit && <span className="ml-1">{unit === 'celsius' ? '°C' : '°F'}</span>}
    </span>
  )
}