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

const CHANGE_NUCLEASE_OPTION = 'pegit/state/nucleases/CHANGE_NUCLEASE_OPTION';
const CHANGE_CLONING_OPTION = 'pegit/state/nucleases/CHANGE_CLONING_OPTION';

// Reducer
const INITIAL_STATE = {
    nucleases: [],
    selectedNuclease: '',
    selectedCloningStrategy: '',
    loading: false,
    error: null,
    nucleaseOptions: {},
    cloningOptions: {},
};

export default function reducer (state = INITIAL_STATE, action) {
    let error = null;

    switch(action.type) {
        case FETCH_NUCLEASES:
            return { ...state, nucleases: INITIAL_STATE.nucleases, loading: true, error: null };
        case FETCH_NUCLEASES_SUCCEEDED:
            return { ...state, nucleases: action.nucleases, loading: false, error: null };
        case FETCH_NUCLEASES_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, nucleases: INITIAL_STATE.nucleases, error };
        case SELECT_NUCLEASE:
            return { ...state, selectedNuclease: action.nuclease, nucleaseOptions: state.nucleases.find(n => n.name === action.nuclease).options };
        case SELECT_CLONING_STRATEGY:
            return { ...state, selectedCloningStrategy: action.strategy, cloningOptions: state.nucleases.find(n => n.name === state.selectedNuclease).cloningStrategies.find(e => e[0] === action.strategy)[2] };
        case CHANGE_NUCLEASE_OPTION:
            return { ...state, nucleaseOptions: { ...state.nucleaseOptions, [action.option]: { ...state.nucleaseOptions[action.option], value: action.value } } };
        case CHANGE_CLONING_OPTION:
            return { ...state, cloningOptions: { ...state.cloningOptions, [action.option]: { ...state.cloningOptions[action.option], value: action.value } } };
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
const changeNucleaseOption = (option, value) => ({ type: CHANGE_NUCLEASE_OPTION, option, value });
const changeCloningOption = (option, value) => ({ type: CHANGE_CLONING_OPTION, option, value });

// Side effects
function* loadNucleases () {
    if (store.getState().nucleases.nucleases.length === 0) {
        try {
            yield put(fetchNucleases());
            const response = yield call(api.get, 'nucleases/');
            const nucleases = response.data;
            yield put(fetchNucleasesSuccess(nucleases));
            yield put(selectNuclease(nucleases[0].name));
            yield put(selectCloningStrategy(nucleases[0].cloningStrategies[0][0]));
        } catch (error) {
            yield put(fetchNucleasesFailure(error));
        }
    }
}

function* watchRequestNucleases() {
    yield takeLatest(REQUESTED_NUCLEASES, loadNucleases)
}

export { requestNucleases, watchRequestNucleases, selectNuclease, selectCloningStrategy, changeNucleaseOption, changeCloningOption }