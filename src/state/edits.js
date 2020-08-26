import *  as api from 'api'
import {call, put, takeLatest} from "@redux-saga/core/effects";
import { store } from "configureStore";

// Actions
const REQUESTED_EDITS = 'prime_design/state/edits/REQUESTED_EDITS';
const FETCH_EDITS = 'prime_design/state/edits/FETCH_EDITS';
const FETCH_EDITS_SUCCEEDED = 'prime_design/state/edits/FETCH_EDITS_SUCCEEDED';
const FETCH_EDITS_FAILED = 'prime_design/state/edits/FETCH_EDITS_FAILED';

// Reducer
const INITIAL_STATE = {
    edits: [],
    loading: false,
    error: null,
};

export default function reducer (state = INITIAL_STATE, action) {
    let error = null;

    switch(action.type) {
        case FETCH_EDITS:
            return { ...state, edits: INITIAL_STATE.edits, loading: true, error: null };
        case FETCH_EDITS_SUCCEEDED:
            return { ...state, edits: action.edits, loading: false, error: null };
        case FETCH_EDITS_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, edits: INITIAL_STATE.edits, error };
        default:
            return state;
    }
};
// Action creators
const requestEdits = () => ({type: REQUESTED_EDITS});
const fetchEdits = () => ({type: FETCH_EDITS});
const fetchEditsSuccess = (edits) => ({type: FETCH_EDITS_SUCCEEDED, edits});
const fetchEditsFailure = (error) => ({type: FETCH_EDITS_FAILED, error});

// Side effects
function* loadEdits () {
    if (store.getState().edits.edits.length === 0) {
        try {
            yield put(fetchEdits());
            const response = yield call(api.get, 'edits/');
            yield put(fetchEditsSuccess(response.data));
        } catch (error) {
            yield put(fetchEditsFailure(error));
        }
    }
}

function* watchRequestEdits() {
    yield takeLatest(REQUESTED_EDITS, loadEdits)
}

export { requestEdits, watchRequestEdits }