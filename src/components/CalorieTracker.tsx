import { useMemo } from "react"
import { Activity } from "../types"
import { CalorieDisplay } from "./CaloriDisplay"

type CalorieTrackerProps = {
  activities: Activity[]
}
export function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsume = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities])

  const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities])

  const netCalories = useMemo(()=>caloriesConsume - caloriesBurned, [caloriesConsume, caloriesBurned])

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