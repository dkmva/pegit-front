import *  as api from 'api'
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { store } from "configureStore";

import { requestEdits } from "./edits";
import { routeHome } from "./routes";

// Actions
const REQUESTED_GENE = 'pegit/state/gene/REQUESTED_GENE';
const FETCH_GENE = 'pegit/state/gene/FETCH_GENE';
const FETCH_GENE_SUCCEEDED = 'pegit/state/gene/FETCH_GENE_SUCCEEDED';
const FETCH_GENE_FAILED = 'pegit/state/gene/FETCH_GENE_FAILED';

// Reducer
const INITIAL_STATE = {
    gene: {},
    loading: false,
    error: null,
};

export default function reducer (state = INITIAL_STATE, action) {
    let error = null;

    switch(action.type) {
        case FETCH_GENE:
            return { ...state, gene: {}, loading: true, error: null };
        case FETCH_GENE_SUCCEEDED:
            return { ...state, gene: action.gene, loading: false, error: null };
        case FETCH_GENE_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, gene: INITIAL_STATE.gene, error };
        default:
            return state;
    }
};
// Action creators
const requestGene = (id) => ({type: REQUESTED_GENE, id});
const fetchGene = (id) => ({type: FETCH_GENE, id});
const fetchGeneSuccess = (gene) => ({type: FETCH_GENE_SUCCEEDED, gene});
const fetchGeneFailure = (error) => ({type: FETCH_GENE_FAILED, error});

// Side effects
function* loadGene (action) {
    const { id } = action;
    if (store.getState().gene.gene.id !== id) {
        yield put(fetchGene(id));
        try {
            const response = yield call(api.get, 'genes/' + id);
            yield put(fetchGeneSuccess(response.data));
        } catch (error) {
            yield put(fetchGeneFailure(error));
        }
    }
}

function* loadRouteGene() {
    const id = store.getState().location.payload.geneId;
    const selectedOrganism = store.getState().home.selectedOrganism;

    if(!selectedOrganism){
        yield put(routeHome())
    }
    yield put(requestEdits());
    yield put(requestGene(id));
}

function* watchRequestGene() {
    yield takeLatest(REQUESTED_GENE, loadGene)
}

export { requestGene, loadRouteGene, watchRequestGene };