import * as api from "api";
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import {routeHome} from "./routes";
import { store } from "configureStore";

// Actions
const SELECT_GENE = 'pegit/api/Genes/SELECT_GENE';

const SEARCH_GENES = 'pegit/api/home/SEARCH_GENES';
const SEARCH_GENES_SUCCEEDED = 'pegit/api/home/SEARCH_GENES_SUCCEEDED';
const SEARCH_GENES_FAILED = 'pegit/api/home/SEARCH_GENES_FAILED';

const SEARCH_CLINVAR = 'pegit/api/home/SEARCH_CLINVAR';
const SEARCH_CLINVAR_SUCCEEDED = 'pegit/api/home/SEARCH_CLINVAR_SUCCEEDED';
const SEARCH_CLINVAR_FAILED = 'pegit/api/home/SEARCH_CLINVAR_FAILED';

const CLEAR_SEARCH_GENES = 'pegit/home/CLEAR_GENES';

const SELECT_ORGANISM = 'pegit/home/SELECT_ORGANISM';

const REQUEST_ADD_EDIT = 'pegit/home/REQUEST_ADD_EDIT';
const ADD_EDIT = 'pegit/home/ADD_EDIT';
const ADD_EDIT_SUCCEEDED = 'pegit/home/ADD_EDIT_SUCCEEDED';
const ADD_EDIT_FAILED = 'pegit/home/ADD_EDIT_FAILED';
const REMOVE_EDIT = 'pegit/home/REMOVE_EDIT';
const RESET_EDIT_LIST = 'pegit/home/RESET_EDIT_LIST';

const REQUEST_ADD_MULTIPLE = 'pegit/home/REQUEST_ADD_MULTIPLE';
const ADD_MULTIPLE = 'pegit/home/ADD_MULTIPLE';
const ADD_MULTIPLE_SUCCEEDED = 'pegit/home/ADD_MULTIPLE_SUCCEEDED';
const ADD_MULTIPLE_FAILED = 'pegit/home/ADD_MULTIPLE_FAILED';

const REQUESTED_ADVANCED_OPTIONS = 'pegit/state/edits/REQUESTED_ADVANCED_OPTIONS';
const FETCH_ADVANCED_OPTIONS = 'pegit/state/edits/FETCH_ADVANCED_OPTIONS';
const FETCH_ADVANCED_OPTIONS_SUCCEEDED = 'pegit/state/edits/FETCH_ADVANCED_OPTIONS_SUCCEEDED';
const FETCH_ADVANCED_OPTIONS_FAILED = 'pegit/state/edits/FETCH_ADVANCED_OPTIONS_FAILED';

const CHANGE_ADVANCED_OPTION = 'pegit/home/CHANGE_ADVANCED_OPTION';
const CHANGE_BOWTIE = 'pegit/home/CHANGE_BOWTIE';
const CHANGE_PRIMERS = 'pegit/home/CHANGE_PRIMERS';


// Reducer
const INITIAL_STATE = {
    genes: {values: {}, loading: false, error: null},
    selectedOrganism: undefined,
    selectedGene: undefined,
    clinvar: {results: [], searching: false, error: null},
    edits: {validated: [], errors: []},
    addEdit: {submitting: false, error: null},
    designPrimers: true,
    runBowtie: true,
    advancedOptions: {
        pbsMinLength: 13,
        pbsMaxLength: 20,
        rtMinLength: 10,
        rtMaxLength: 34,
        nickingRange: 100,
        spacerSearchRange: 100,
        productMinSize: 150,
        productMaxSize: 300,
        primerMinLength: 18,
        primerMaxLength: 25,
        primerOptLength: 22,
        primerMinTm: 57,
        primerMaxTm: 63,
        primerOptTm: 60,
        numPegs: 5,
    }
};


export default function reducer(state = INITIAL_STATE, action) {
    let error = null;

    switch (action.type) {

        case SELECT_GENE:
            return { ...state, selectedGene: action.gene };

        case SEARCH_GENES:
            return { ...state, genes: { ...state.genes, loading: true, error: null  } };

        case SEARCH_GENES_SUCCEEDED:
            return { ...state, genes: { ...state.genes, values: { ...state.genes.values, [action.query]: action.genes }, loading: false, error: null } };

        case SEARCH_GENES_FAILED:
            error = action.error || { message: action.error.message };
            return { ...state, genes: { ...state.genes, values: { ...state.genes.values, [action.query]: []}, loading: false, error } };

        case SEARCH_CLINVAR:
            return { ...state, clinvar: { ...state.clinvar, searching: true, error: null  } };

        case SEARCH_CLINVAR_SUCCEEDED:
            return { ...state, clinvar: { ...state.clinvar, results: action.results, searching: false, error: null } };

        case SEARCH_CLINVAR_FAILED:
            error = action.error || { message: action.error.message };
            return { ...state, clinvar: { ...state.clinvar, results: [], searching: false, error } };

        case CLEAR_SEARCH_GENES:
            return { ...state, genes: INITIAL_STATE.genes };

        case ADD_EDIT:
        case ADD_MULTIPLE:
            return { ...state, addEdit: {submitting: true, error: null} };

        case ADD_EDIT_SUCCEEDED:
            return { ...state, edits: {validated: [...state.edits.validated, action.edit]}, addEdit: { submitting: false, error: null }};

        case ADD_EDIT_FAILED:
            error = (action.error.response && action.error.response.status === 400) ? action.error.response.data.nonFieldErrors[0] : action.error.message;
            return { ...state, addEdit: { submitting: false, error }};

        case ADD_MULTIPLE_FAILED:
            error = (action.error.response && action.error.response.status === 400) ? action.error.response.data.error : action.error.message;
            alert(error);
            return { ...state, addEdit: { submitting: false, error }};

        case ADD_MULTIPLE_SUCCEEDED:
            return { ...state, edits: {validated: action.edits, errors: action.errors}, addEdit: { submitting: false, error: null }};

        case REMOVE_EDIT:
            return { ...state, edits: {validated: state.edits.validated.filter((val, index) => index !== action.index)} };

        case SELECT_ORGANISM:
            return { ...state, selectedOrganism: state.edits.length > 0 ? state.selectedOrganism : action.organism };

        case RESET_EDIT_LIST:
            return { ...state, selectedOrganism: undefined, edits: {validated: [], errors: []} };

        case FETCH_ADVANCED_OPTIONS_SUCCEEDED:
            return { ...state, advancedOptions: action.options };

        case CHANGE_ADVANCED_OPTION:
            if(action.value === ''){return state}
            if(['designPrimers', 'runBowtie'].includes(action.option)){
                return { ...state, advancedOptions: { ...state.advancedOptions, [action.option]: action.value } };
            }
            return { ...state, advancedOptions: { ...state.advancedOptions, [action.option]: parseInt(action.value) } };

        case CHANGE_BOWTIE:
            return { ...state, runBowtie: !state.runBowtie };

        case CHANGE_PRIMERS:
            return { ...state, designPrimers: !state.designPrimers };

        default:
            return state;
    }
}

// Action creators
const selectGene = (gene) => ({ type: SELECT_GENE, gene });

const searchGenes = (organism, query) => ({ type: SEARCH_GENES, organism, query });
const searchGenesSuccess = (genes, query) => ({ type: SEARCH_GENES_SUCCEEDED, genes, query});
const searchGenesFailure = (error, query) => ({ type: SEARCH_GENES_FAILED, error, query});
const clearSearchGenes = () => ({ type: CLEAR_SEARCH_GENES });

const requestSearchClinVar = (query) => ({ type: SEARCH_CLINVAR, query });
const searchClinVarSuccess = (results) => ({ type: SEARCH_CLINVAR_SUCCEEDED, results});
const searchClinVarFailure = (error) => ({ type: SEARCH_CLINVAR_FAILED, error});

const requestAddEdit = (edit) => ({type: REQUEST_ADD_EDIT, edit});
const addEdit = () => ({type: ADD_EDIT});
const addEditSuccess = (edit) => ({type: ADD_EDIT_SUCCEEDED, edit});
const addEditFailure = (error) => ({type: ADD_EDIT_FAILED, error});
const removeEdit = (index) => ({type: REMOVE_EDIT, index});

const selectOrganism = (organism) => ({ type: SELECT_ORGANISM, organism });
const tickRunBowtie = () => ({ type: CHANGE_BOWTIE });
const tickDesignPrimers = () => ({ type: CHANGE_PRIMERS });

const resetEditList = () => ({ type: RESET_EDIT_LIST });


const requestAddMultiple = (edits) => ({type: REQUEST_ADD_MULTIPLE, edits});
const addMultiple = () => ({type: ADD_MULTIPLE});
const addMultipleSuccess = (edits, errors) => ({type: ADD_MULTIPLE_SUCCEEDED, edits, errors});
const addMultipleFailure = (error) => ({type: ADD_MULTIPLE_FAILED, error});

const changeAdvancedOption = (option, value) => ({type: CHANGE_ADVANCED_OPTION, option, value});
const requestAdvancedOptions = () => ({type: REQUESTED_ADVANCED_OPTIONS});
const fetchAdvancedOptions = () => ({type: FETCH_ADVANCED_OPTIONS});
const fetchAdvancedOptionsSuccess = (options) => ({type: FETCH_ADVANCED_OPTIONS_SUCCEEDED, options});
const fetchAdvancedOptionsFailure = (error) => ({type: FETCH_ADVANCED_OPTIONS_FAILED, error});// Side effects

// Here we would do checks for existing data and load whatever we need for this view. Also manage
// generic tasks such as showing/hiding loaders based on UI needs.

function* geneSearch(action) {
    let { organism, query } = action;
    let route = 'genes/';
    if(organism) {
        route += '?organism=' + organism.id
    }
    try {
        const response = yield call(api.search, route, query);
        yield put(searchGenesSuccess(response.data, query));
    } catch (error) {
        yield put(searchGenesFailure(error, query));
    }
}

function* watchSearchGenes() {
    yield takeLatest(SEARCH_GENES, geneSearch);
}

function* clinVarSearch(action) {
    try {
        const response = yield call(api.post, 'clinvar/', { query: action.query });
        yield put(searchClinVarSuccess(response.data.results))
    } catch (error) {
        yield put(searchClinVarFailure(error))
    }

}

function* watchSearchClinVar() {
    yield takeLatest(SEARCH_CLINVAR, clinVarSearch)
}

function* validateEditAndAdd (action) {
    const { edit, changeRoute=true } = action;
    const home = store.getState().home;
    const organism = home.selectedOrganism.id;
    const edits = home.edits;
    yield put(addEdit());
    const jsonEdit = JSON.stringify(edit);
    const identical = obj => JSON.stringify(obj) === jsonEdit;
    if (edits.validated.some(identical)){
        yield put(addEditFailure({message: 'Edit already added'}))
    } else {
        if(!organism){
            // ClinVar mode
            yield put(addEditSuccess(edit))
        } else {
            // Regular mode
            try {
                yield call(api.post, 'edits/validate/', { ...edit, organism });
                yield put(addEditSuccess(edit));
                if(changeRoute) {
                    yield put(routeHome());
                }
            } catch (error) {
                yield put(addEditFailure(error));
            }
        }
    }
}

function* watchRequestAddEdit () {
    yield takeEvery(REQUEST_ADD_EDIT, validateEditAndAdd)
}

function* validateMultipleAndAdd (action) {
    const organism = store.getState().home.selectedOrganism.id;
    yield put(addMultiple());
    if(!organism){
        // ClinVar mode
        try {
            const response = yield call(api.post, 'clinvar/validate_list/', action.edits);
            yield put(addMultipleSuccess(response.data.edits, response.data.errors));
        } catch (error) {
            yield put(addMultipleFailure(error));
        }
    } else {
        // Regular mode
        try {
            const response = yield call(api.post, 'edits/validate_list/', { edits: action.edits, organism });
            yield put(addMultipleSuccess(response.data.edits, response.data.errors));
        } catch (error) {
            yield put(addMultipleFailure(error));
        }
    }
}

function* watchRequestAddMultiple () {
    yield takeEvery(REQUEST_ADD_MULTIPLE, validateMultipleAndAdd)
}

function* loadAdvancedOptions () {
    yield put(fetchAdvancedOptions());
    try {
        const response = yield call(api.get, 'edits/advanced_options/');
        yield put(fetchAdvancedOptionsSuccess(response.data));
    } catch (error) {
        yield put(fetchAdvancedOptionsFailure(error));
    }
}

function* watchRequestAdvancedOptions () {
    yield takeEvery(REQUESTED_ADVANCED_OPTIONS, loadAdvancedOptions)
}

export { searchGenes, watchSearchGenes,
    requestSearchClinVar, watchSearchClinVar,
    selectGene, clearSearchGenes, selectOrganism,
    removeEdit, resetEditList, watchRequestAddEdit, requestAddEdit, watchRequestAddMultiple, requestAddMultiple,
    changeAdvancedOption, requestAdvancedOptions, watchRequestAdvancedOptions, tickRunBowtie, tickDesignPrimers }