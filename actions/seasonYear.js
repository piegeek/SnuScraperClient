import { SET_SEASON_YEAR, PICK_SEASON_YEAR } from '../constants/seasonYear';

// Season Year Action Creators
export function setSeasonYear(seasonYear) {
    return { type: SET_SEASON_YEAR, seasonYear };
}

export function pickSeasonYear() {
    return { type: PICK_SEASON_YEAR };
}