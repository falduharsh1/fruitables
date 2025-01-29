import { COUNT_DECREMENT, COUNT_INCREMENT } from "../ActionType";

const initial_value = {
    count : 0
}

const handleCounter = (state = initial_value , action) => {
    console.log(action);

    switch (action.type) {
        case COUNT_INCREMENT :
            return {count : state.count + 1 };
        case COUNT_DECREMENT :
            return {count : state.count - 1};
        default :
            return state
    }
}

export default handleCounter;