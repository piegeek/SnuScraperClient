import { SET_APP_STATE_ACTIVE, SET_APP_STATE_INACTIVE } from '../constants/appState';

// App State Action Creators
export function setAppStateActive() {
    return { type: SET_APP_STATE_ACTIVE };
}

export function setAppStateInactive() {
    return { type: SET_APP_STATE_INACTIVE };
}

