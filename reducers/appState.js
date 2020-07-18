import { 
    APP_STATE_ACTIVE, 
    APP_STATE_INACTIVE, 
    SET_APP_STATE_ACTIVE, 
    SET_APP_STATE_INACTIVE 
} from '../constants/appState';

// App State Reducers
export function appState(state = APP_STATE_ACTIVE, action) {
    switch (action.type) {
        case SET_APP_STATE_ACTIVE:
            return APP_STATE_ACTIVE;
        case SET_APP_STATE_INACTIVE:
            return APP_STATE_INACTIVE;
        default:
            return state;
    }
}