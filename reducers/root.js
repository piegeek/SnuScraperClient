import { combineReducers } from 'redux';
import { appState } from 'appState';
import { lectures } from 'lectures';
import { seasonYear, pickSeasonYear } from 'seasonYear';

const rootReducer = combineReducers({
    appState,
    lectures,
    seasonYear,
    pickSeasonYear
});

export default rootReducer;