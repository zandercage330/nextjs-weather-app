import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TemperatureUnit = 'celsius' | 'fahrenheit'

interface TemperatureState {
  unit: TemperatureUnit
  setUnit: (unit: TemperatureUnit) => void
  convertTemperature: (temp: number, targetUnit?: TemperatureUnit) => number
}

export const useTemperatureStore = create<TemperatureState>()(
  persist(
    (set, get) => ({
      unit: 'celsius',
      setUnit: (unit) => set({ unit }),
      convertTemperature: (temp: number, targetUnit?: TemperatureUnit) => {
        const unit = targetUnit || get().unit
        if (unit === 'celsius') {
          return temp
        }
        return (temp * 9) / 5 + 32
      },
    }),
    {
      name: 'temperature-settings',
    }
  )
)