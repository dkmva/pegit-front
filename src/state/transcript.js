import *  as api from 'api'
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { store } from "configureStore";

import { routeHome } from "./routes";

// Actions
const REQUESTED_TRANSCRIPT = 'pegit/state/transcript/REQUESTED_TRANSCRIPT';
const FETCH_TRANSCRIPT = 'pegit/state/transcript/FETCH_TRANSCRIPT';
const FETCH_TRANSCRIPT_SUCCEEDED = 'pegit/state/transcript/FETCH_TRANSCRIPT_SUCCEEDED';
const FETCH_TRANSCRIPT_FAILED = 'pegit/state/transcript/FETCH_TRANSCRIPT_FAILED';

// Reducer
const INITIAL_STATE = {
    transcript: {
    },
    loading: false,
    error: null,
};

export default function reducer (state = INITIAL_STATE, action) {
    let error = null;

    switch(action.type) {
        case FETCH_TRANSCRIPT:
            return { ...state, transcript: INITIAL_STATE.transcript, loading: true, error: null };
        case FETCH_TRANSCRIPT_SUCCEEDED:
            return { ...state, transcript: action.transcript, loading: false, error: null };
        case FETCH_TRANSCRIPT_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, transcript: INITIAL_STATE.transcript, error };
        default:
            return state;
    }
};
// Action creators
const requestTranscript = (id) => ({type: REQUESTED_TRANSCRIPT, id});
const fetchTranscript = (id) => ({type: FETCH_TRANSCRIPT, id});
const fetchTranscriptSuccess = (transcript) => ({type: FETCH_TRANSCRIPT_SUCCEEDED, transcript});
const fetchTranscriptFailure = (error) => ({type: FETCH_TRANSCRIPT_FAILED, error});

// Side effects
function* loadTranscript (action) {
    const { id } = action;
    if (store.getState().transcript.transcript.id !== id) {
        try {
            yield put(fetchTranscript(id));
            const response = yield call(api.get, 'transcripts/' + id);
            yield put(fetchTranscriptSuccess(response.data));
        } catch (error) {
            yield put(fetchTranscriptFailure(error));
        }
    }
}

function* loadRouteTranscript() {
    const id = store.getState().location.payload.transcriptId;
    const selectedOrganism = store.getState().home.selectedOrganism;

    if(!selectedOrganism){
        yield put(routeHome())
    }
    yield put(requestTranscript(id));
}

function* watchRequestTranscript() {
    yield takeLatest(REQUESTED_TRANSCRIPT, loadTranscript)
}

export { requestTranscript, loadRouteTranscript, watchRequestTranscript };