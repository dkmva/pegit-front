import { put } from "@redux-saga/core/effects";

import { routeHome } from "./routes";
import { store } from "configureStore";


// Actions
const SET_CUSTOM_SEQUENCE = 'pegit/customsequence/SET_CUSTOM_SEQUENCE';

// Reducer
const INITIAL_STATE = {
    sequence: '',
    name: '',
    organism: '',
};

export default function reducer (state = INITIAL_STATE, action) {

    switch(action.type) {
        case SET_CUSTOM_SEQUENCE:
            return { ...state, sequence: action.sequence, name: action.name, organism: action.organism };
        default:
            return state;
    }
};
// Action creators
const setCustomSequence = (name, sequence, organism) => ({ type: SET_CUSTOM_SEQUENCE, name, sequence, organism });

// Side effects
function* loadCustomSequence() {
    const sequence = store.getState().customsequence.sequence;
    if(!sequence.length){
        yield put(routeHome())
    }
}

export { loadCustomSequence, setCustomSequence };