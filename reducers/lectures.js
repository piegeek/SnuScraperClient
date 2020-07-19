import {
    ADD_LECTURE,
    REMOVE_LECTURE
} from '../constants/lectures';

// Lectures Reducers
export function lectures(state = [], action) {
    switch (action.type) {
        case ADD_LECTURE:
            return [...state, action.lectureData]
        case REMOVE_LECTURE:
            return state.filter(lectureData => lectureData.lectureId != action.lectureId);
        default:
            return state;
    }
}