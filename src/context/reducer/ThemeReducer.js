import { TOGGLE_SWITCH } from "../ActionType";

const ThemeReducer = (state,action) => {
    switch(action.type) {
        case TOGGLE_SWITCH: 
            return  {
                Theme : action.payload
            };
        default :
            return state
    }
}

export default ThemeReducer