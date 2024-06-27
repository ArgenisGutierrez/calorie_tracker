import { useEffect, useMemo, useReducer } from 'react'
import { Form } from './components/Form'
import { activityReducer, initialState } from './reducers/activity-reducer'
import { ActivityList } from './components/ActivityList'
import { CalorieTracker } from './components/CalorieTracker'

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestart = () => useMemo(() => state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-sky-600 py-3">
        <div className="flex justify-between mx-auto max-w-4xl items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">Contador de calorias</h1>
          <button className="bg-black hover:bg-gray-700 text-white rounded-lg text-sm p-2 font-bold cursor-pointer disabled:opacity-20"
            disabled={!canRestart()}
            onClick={() => dispatch({ type: 'restart-activity' })}
          >Reiniciar App</button>
        </div>
      </header>

      <section className="bg-sky-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className='bg-gray-900 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>

    </>
  )
}

export default App
