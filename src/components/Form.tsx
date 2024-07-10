import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

import { categories } from "../data/categories"
import type { Activity } from "../types/"
import { useActivity } from "../hooks/useActivity"


export function Form() {
  const { state, dispatch } = useActivity()

  const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
  }

  useEffect(() => {
    if (state.activeId) {
      const activitiToEdit = state.activities.filter(stateActivvity => stateActivvity.id === state.activeId)[0]
      setActivity(activitiToEdit)
    }
  }, [state.activeId])

  const [activity, setActivity] = useState<Activity>(initialState)

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch({ type: "save-activity", payload: { newActivity: activity } })
    setActivity(initialState)
  }

  function isValidActivity() {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  return (
    <form className="space-y-5 bg-white shadow shadow-slate-700 p-10 rounded-lg"
      onSubmit={handleSubmit}>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select id="category" className="border border-slate-300 rounded-lg w-full bg-white p-2"
          value={activity.category}
          onChange={handleChange}>
          {categories.map(category => (
            <option value={category.id} key={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input type="text"
          id="name"
          value={activity.name}
          onChange={handleChange}
          autoComplete="off"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Ej. Comidad, Jugo de naranja, Ejercicio, Pesas, Correr" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input type="number"
          id="calories"
          min={0}
          value={activity.calories}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. 100, 200, 300" />
      </div>

      <input type="submit"
        className="bg-gray-800 hover:bg-gray-900 text-white p-2 w-full font-bold uppercase cursor-pointer disabled:opacity-25"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()} />

    </form>
  )
}
