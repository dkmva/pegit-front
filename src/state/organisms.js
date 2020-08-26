import * as api from "api";
import { put, call } from 'redux-saga/effects'

import { store } from 'configureStore'
import {takeLatest} from "@redux-saga/core/effects";

// Actions
const REQUESTED_ORGANISMS = 'pegit/state/organisms/REQUESTED_ORGANISMS';
const FETCH_ORGANISMS = 'pegit/state/organisms/FETCH_ORGANISMS';
const FETCH_ORGANISMS_SUCCEEDED = 'pegit/state/organisms/FETCH_ORGANISMS_SUCCEEDED';
const FETCH_ORGANISMS_FAILED = 'pegit/state/organisms/FETCH_ORGANISMS_FAILED';


// Reducer
const INITIAL_STATE = {
    values: [],
    loading: false,
    error: null,
    selectedOrganism: null,
};


export default function reducer(state = INITIAL_STATE, action) {
    let error = null;

    switch (action.type) {

        case FETCH_ORGANISMS:
            return { ...state, values: [], loading: true, error };

        case FETCH_ORGANISMS_SUCCEEDED:
            return { ...state , values: action.organisms, loading: false, error };

        case FETCH_ORGANISMS_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, values: [], error, loading: false };

        default:
            return state;
    }
}

// Action creators

const requestOrganisms = () => ({ type: REQUESTED_ORGANISMS });
const fetchOrganisms = () => ({ type: FETCH_ORGANISMS });
const fetchOrganismsSuccess = (organisms) => ({ type: FETCH_ORGANISMS_SUCCEEDED, organisms});
const fetchOrganismsFailure = (error) => ({ type: FETCH_ORGANISMS_FAILED, error });

// Side effects

function * loadOrganisms () {
    if (store.getState().organisms.values.length === 0) {
        try {
            yield put(fetchOrganisms());
            const response = yield call(api.get, 'organisms');
            yield put(fetchOrganismsSuccess(response.data.results));
        } catch (error) {
            yield put(fetchOrganismsFailure(error));
        }
    }
}

function* watchRequestOrganisms() {
    yield takeLatest(REQUESTED_ORGANISMS, loadOrganisms)
}

export { requestOrganisms, watchRequestOrganisms }