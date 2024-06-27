import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities: Activity[]
  dispatch: Dispatch<ActivityActions>
}
export function ActivityList({ activities, dispatch }: ActivityListProps) {

  const categoryName = useMemo(() => (category: Activity['category']) =>
    categories.map(cat => cat.id === category ? cat.name : '')
    , [activities])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y Actividades:</h2>
      {isEmptyActivities ?
        <p className="text-center my-2">No hay Actividades registradas...</p> :
        activities.map(activitiy => (
          <div key={activitiy.id} className="flex justify-between px-5 py-2 mt-5 bg-sky-100 shadow shadow-slate-400 rounded-md">
            <div className="space-y-2 relative my-2">
              <p className={`absolute -top-8 -left-8 px-10 p-2 text-white uppercase font-bold rounded-md 
              ${activitiy.category == 1 ? 'bg-orange-500' : 'bg-lime-500'}`}>{categoryName(activitiy.category)}</p>
              <p className="text-2xl font-bold pt-5">{activitiy.name}</p>
              <p className="font-black text-4xl text-sky-500">{activitiy.calories}{''} <span>Calorias</span></p>
            </div>
            <div className="flex gap-5 items-center">
              <button
                onClick={() => dispatch({ type: 'set-activeId', payload: { id: activitiy.id } })}
              >
                <PencilSquareIcon
                  className="h-8 w-8 text-yellow-500 my-2"
                />
              </button>
              <button
                onClick={() => dispatch({ type: 'delete-activity', payload: { id: activitiy.id } })}
              >
                <XMarkIcon
                  className="h-8 w-8 text-red-500 my-2"
                />
              </button>
            </div>
          </div>
        ))}
    </>
  )
}
