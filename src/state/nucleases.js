import *  as api from 'api'
import {call, put, takeLatest} from "@redux-saga/core/effects";
import { store } from "configureStore";

// Actions
const REQUESTED_NUCLEASES = 'pegit/state/nucleases/REQUESTED_NUCLEASES';
const FETCH_NUCLEASES = 'pegit/state/nucleases/FETCH_NUCLEASES';
const FETCH_NUCLEASES_SUCCEEDED = 'pegit/state/nucleases/FETCH_NUCLEASES_SUCCEEDED';
const FETCH_NUCLEASES_FAILED = 'pegit/state/nucleases/FETCH_NUCLEASES_FAILED';

const SELECT_NUCLEASE = 'pegit/state/nucleases/SELECT_NUCLEASE';
const SELECT_CLONING_STRATEGY = 'pegit/state/nucleases/SELECT_CLONING_STRATEGY';

// Reducer
const INITIAL_STATE = {
    nucleases: [],
    selectedNuclease: 0,
    selectedCloningStrategy: 0,
    loading: false,
    error: null,
};

export default function reducer (state = INITIAL_STATE, action) {
    let error = null;

    switch(action.type) {
        case FETCH_NUCLEASES:
            return { ...state, nucleases: INITIAL_STATE.nucleases, loading: true, error: null };
        case FETCH_NUCLEASES_SUCCEEDED:
            return { ...state, nucleases: action.nucleases, selectedNuclease: action.nucleases[0].name, selectedCloningStrategy: action.nucleases[0].cloningStrategies[0], loading: false, error: null };
        case FETCH_NUCLEASES_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, nucleases: INITIAL_STATE.nucleases, error };
        case SELECT_NUCLEASE:
            return { ...state, selectedNuclease: action.nuclease };
        case SELECT_CLONING_STRATEGY:
            return { ...state, selectedCloningStrategy: action.strategy };
        default:
            return state;
    }
};
// Action creators
const requestNucleases = () => ({type: REQUESTED_NUCLEASES});
const fetchNucleases = () => ({type: FETCH_NUCLEASES});
const fetchNucleasesSuccess = (nucleases) => ({type: FETCH_NUCLEASES_SUCCEEDED, nucleases});
const fetchNucleasesFailure = (error) => ({type: FETCH_NUCLEASES_FAILED, error});
const selectNuclease = (nuclease) => ({type: SELECT_NUCLEASE, nuclease});
const selectCloningStrategy = (strategy) => ({type: SELECT_CLONING_STRATEGY, strategy});

// Side effects
function* loadNucleases () {
    if (store.getState().nucleases.nucleases.length === 0) {
        try {
            yield put(fetchNucleases());
            const response = yield call(api.get, 'nucleases/');
            yield put(fetchNucleasesSuccess(response.data));
        } catch (error) {
            yield put(fetchNucleasesFailure(error));
        }
    }
}

function* watchRequestNucleases() {
    yield takeLatest(REQUESTED_NUCLEASES, loadNucleases)
}

export { requestNucleases, watchRequestNucleases, selectNuclease, selectCloningStrategy }