import *  as api from 'api'
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { store } from "configureStore";

import { routeHome } from "./routes";

// Actions
const REQUESTED_REGION = 'pegit/state/region/REQUESTED_REGION';
const FETCH_REGION = 'pegit/state/region/FETCH_REGION';
const FETCH_REGION_SUCCEEDED = 'pegit/state/region/FETCH_REGION_SUCCEEDED';
const FETCH_REGION_FAILED = 'pegit/state/region/FETCH_REGION_FAILED';

// Reducer
const INITIAL_STATE = {
    sequence: '',
    loading: false,
    error: null,
};

export default function reducer (state = INITIAL_STATE, action) {
    let error = null;

    switch(action.type) {
        case FETCH_REGION:
            return { ...state, sequence: '', loading: true, error: null };
        case FETCH_REGION_SUCCEEDED:
            return { ...state, sequence: action.sequence, loading: false, error: null };
        case FETCH_REGION_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, loading: false, sequence: '', error };
        default:
            return state;
    }
};
// Action creators
const requestRegion = (organismId, region) => ({type: REQUESTED_REGION, organismId, region});
const fetchRegion = () => ({type: FETCH_REGION});
const fetchRegionSuccess = (sequence) => ({type: FETCH_REGION_SUCCEEDED, sequence});
const fetchRegionFailure = (error) => ({type: FETCH_REGION_FAILED, error});

// Side effects
function* loadRegion (action) {
    const { organismId, region } = action;
    //if (store.getState().region.region.id !== id) {
        yield put(fetchRegion());
        try {
            const response = yield call(api.get, 'organisms/' + organismId + '/region/' + region);
            yield put(fetchRegionSuccess(response.data.sequence));
        } catch (error) {
            yield put(fetchRegionFailure(error));
        }
    //}
}

function* loadRouteRegion() {
    const region = store.getState().location.payload.region;
    const selectedOrganism = store.getState().home.selectedOrganism;

    if(!selectedOrganism){
        yield put(routeHome())
    } else {
        yield put(requestRegion(selectedOrganism.id, region));
    }
}

function* watchRequestRegion() {
    yield takeLatest(REQUESTED_REGION, loadRegion)
}

export { requestRegion, loadRouteRegion, watchRequestRegion };