import { createContext, Dispatch, ReactNode, useReducer } from "react"
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reducer"

// Definir los types de los props del contexto
type ActivityContextProps = {
  state: ActivityState
  dispatch: Dispatch<ActivityActions>
}

//Definir los types del provider
type ActivityProviderProps = {
  children: ReactNode
}

//Definir el context
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

//Definir el provider
export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  // Conectar el context con el reducer
  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    //Conectar el context con el provider
    <ActivityContext.Provider
      value={{
        state,
        dispatch
      }}>
      {children}
    </ActivityContext.Provider>
  )
}
