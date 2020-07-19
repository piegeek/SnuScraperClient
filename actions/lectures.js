import { ADD_LECTURE, REMOVE_LECTURE } from '../constants/lectures';

// Lectures Action Creators
export function addLecture(lectureData) { // TODO: May have to include season and year as parameters
    return { type: ADD_LECTURE, lectureData };
}

export function removeLecture(lectureId) {
    return { type: REMOVE_LECTURE, lectureId };
}