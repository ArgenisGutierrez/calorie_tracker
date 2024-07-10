import { useMemo } from "react"
import { CalorieDisplay } from "./CaloriDisplay"
import { useActivity } from "../hooks/useActivity"

export function CalorieTracker() {
  const { state } = useActivity()

  const caloriesConsume = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

  const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

  const netCalories = useMemo(() => caloriesConsume - caloriesBurned, [caloriesConsume, caloriesBurned])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsume}
          text={'Consumidas'}
        />
        <CalorieDisplay
          calories={caloriesBurned}
          text={'Quemadas'}
        />
        <CalorieDisplay
          calories={netCalories}
          text={'Calorias Netas'}
        />

      </div>
    </>
  )
}
