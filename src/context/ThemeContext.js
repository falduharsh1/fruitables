import { createContext, useReducer } from "react"
import ThemeReducer from "./reducer/ThemeReducer"
import { TOGGLE_SWITCH } from "./ActionType"

const initialState = {
    Theme: 'light'
}

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialState)

    const toggle_theme = (data) => {
        const NewTheme = data === 'light' ? 'dark' : 'light';

        dispatch({ type: TOGGLE_SWITCH, payload: NewTheme })
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggle_theme
            }}

        >
            {children}
        </ThemeContext.Provider>
    )
}
