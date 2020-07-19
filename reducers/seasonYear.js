import {
    SET_SEASON_YEAR,
    PICK_SEASON_YEAR
} from '../constants/seasonYear';

// Season Year Reducers
export function seasonYear(state=[null, null], action) {
    switch (action.type) {
        case SET_SEASON_YEAR:
            const  [ season, year ] = action.seasonYear;
            return [ season, year ];
        default:
            return state;
    }
}

export function pickSeasonYear(state=false, action) {
    switch (action.type) {
        case PICK_SEASON_YEAR:
            return true;
        default:
            return state;
    }
}