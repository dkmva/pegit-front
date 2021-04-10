import *  as api from 'api'
import { call, put, takeLatest, delay } from "@redux-saga/core/effects";
import { routeJobSummary, routeJobDetail } from 'state/routes';
import { store } from "configureStore";

// Actions

const REQUESTED_SUMMARY = 'pegit/state/job/REQUESTED_SUMMARY';
const REQUESTED_SUMMARY_SUCCEEDED = 'pegit/state/job/REQUESTED_SUMMARY_SUCCEEDED';
const REQUESTED_SUMMARY_FAILED = 'pegit/state/job/REQUESTED_SUMMARY_FAILED';

const ADD_QUEUE_POSITION = 'pegit/state/job/ADD_QUEUE_POSITION';
const ADD_DESIGN_PERCENT = 'pegit/state/job/ADD_DESIGN_PERCENT';

const REQUESTED_DETAIL = 'pegit/state/job/REQUESTED_DETAIL';
const REQUESTED_DETAIL_SUCCEEDED = 'pegit/state/job/REQUESTED_DETAIL_SUCCEEDED';
const REQUESTED_DETAIL_FAILED = 'pegit/state/job/REQUESTED_DETAIL_FAILED';

const SUBMIT_JOB = 'pegit/state/gene/SUBMIT_JOB';
const SUBMIT_JOB_SUCCEEDED = 'pegit/state/gene/SUBMIT_JOB_SUCCEEDED';
const SUBMIT_JOB_FAILED = 'pegit/state/gene/SUBMIT_JOB_FAILED';

const SUBMIT_CLINVAR = 'pegit/state/gene/SUBMIT_CLINVAR';
const SUBMIT_CLINVAR_SUCCEEDED = 'pegit/state/gene/SUBMIT_CLINVAR_SUCCEEDED';
const SUBMIT_CLINVAR_FAILED = 'pegit/state/gene/SUBMIT_CLINVAR_FAILED';


// Reducer
const INITIAL_STATE = {
    summary: {},
    detail: {},
    loading: false,
    error: null,
    submitting: false,
};

export default function reducer(state = INITIAL_STATE, action) {

    let error = null;
    switch(action.type) {

        case REQUESTED_SUMMARY:
            return { ...state, loading: true, error: null, summary: state.summary.jobId === action.id ? state.summary : {} };

        case REQUESTED_SUMMARY_SUCCEEDED:
            return { ...state, summary: { ...action.data, designPercent: state.summary.designPercent }, loading: false, error: null };

        case REQUESTED_SUMMARY_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, summary: {jobId: action.id, status: error.response.statusText, warning: error.message}, loading: false, error };

        case ADD_QUEUE_POSITION:
            return { ...state, summary: { ...state.summary, queuePosition: action.position }, loading: false, error };

        case ADD_DESIGN_PERCENT:
            return { ...state, summary: { ...state.summary, designPercent: action.percent }, loading: false, error };


        case REQUESTED_DETAIL:
            return { ...state, loading: true, error: null, detail: state.summary.jobId === action.id ? state.detail : {} };

        case REQUESTED_DETAIL_SUCCEEDED:
            return { ...state, detail: action.data, loading: false, error: null };

        case REQUESTED_DETAIL_FAILED:
            error = action.error || {message: action.error.message };
            return { ...state, detail: {jobId: action.id, status: error.response.statusText, warning: error.message}, loading: false, error };

        case SUBMIT_JOB:
        case SUBMIT_CLINVAR:
            return { ...state, submitting: true, data: {}};

        case SUBMIT_JOB_SUCCEEDED:
        case SUBMIT_CLINVAR_SUCCEEDED:
            return { ...state, submitting: false, data: {}};

        case SUBMIT_JOB_FAILED:
        case SUBMIT_CLINVAR_FAILED:
            error = action.error.response.status === 400 ? action.error.response.data.nonFieldErrors[0] : action.error.response.statusText;
            return { ...state, submitting: false, error, data: {}};

        default:
            return state;
    }
}

// Action creators
const requestSummary = (id) => ({type: REQUESTED_SUMMARY, id});
const requestSummarySuccess = (data) => ({type: REQUESTED_SUMMARY_SUCCEEDED, data});
const requestSummaryFailure = (error, id) => ({type: REQUESTED_SUMMARY_FAILED, error, id});


const addQueuePosition = (position) => ({type: ADD_QUEUE_POSITION, position});
const addDesignPercent = (percent) => ({type: ADD_DESIGN_PERCENT, percent});


const requestDetail = (id, edit) => ({type: REQUESTED_DETAIL, id, edit});
const requestDetailSuccess = (data) => ({type: REQUESTED_DETAIL_SUCCEEDED, data});
const requestDetailFailure = (error, id) => ({type: REQUESTED_DETAIL_FAILED, error, id});

const submitJob = (jobData) => ({type: SUBMIT_JOB, jobData});
const submitJobSuccess = (job) => ({type: SUBMIT_JOB_SUCCEEDED, job});
const submitJobFailure = (error) => ({type: SUBMIT_JOB_FAILED, error});

const submitClinVar = (jobData) => ({type: SUBMIT_CLINVAR, jobData});
const submitClinVarSuccess = (job) => ({type: SUBMIT_CLINVAR_SUCCEEDED, job});
const submitClinVarFailure = (error) => ({type: SUBMIT_CLINVAR_FAILED, error});


// Side effects

const RELOAD_TIMER = 2 * 1000

function* loadSummary (id) {
    let status = 'Queued';
    while( !['Completed', 'Failed'].includes(status) && store.getState().location.payload.jobId === id) {
        try {
            yield put(requestSummary(id));
            let response = yield call(api.get, 'jobs/' + id + '/');
            yield put(requestSummarySuccess(response.data));

            if(response.data.edits.length === 1){
                yield put(routeJobDetail(response.data.jobId, 'edit0'));
            }

            status = response.data.status;
            if(status === 'Queued'){
                response = yield call(api.get, 'jobs/' + id + '/queue_position');
                yield put(addQueuePosition(response.data.position))
            }/* else if (status === 'Finding pegRNAs'){
                //response = yield call(api.get, 'jobs/' + id + '/design_progress');
                yield put(addDesignPercent(response.data.percent))
            }*/
        } catch(error) {
            status = "Failed";
            yield put(requestSummaryFailure(error, id));
        }
        yield delay(RELOAD_TIMER);
    }
}

function* loadRouteSummary() {
    const id = store.getState().location.payload.jobId;
    yield loadSummary(id);
}

function* loadDetail (id, edit) {
    let status = 'Queued';
    while( !['Completed', 'Failed'].includes(status) && store.getState().location.payload.edit === edit) {
        try {
            yield put(requestSummary(id));
            let response = yield call(api.get, 'jobs/' + id + '/');
            yield put(requestSummarySuccess(response.data));
            status = response.data.status;

            yield put(requestDetail(id, edit));
            response = yield call(api.get, 'jobs/' + id + '/' + edit);
            yield put(requestDetailSuccess(response.data));

        } catch(error) {
            status = "Failed";
            yield put(requestDetailFailure(error, id));
        }
        yield delay(RELOAD_TIMER);
    }
}

function* loadRouteDetail() {
    const id = store.getState().location.payload.jobId;
    const edit = store.getState().location.payload.edit;
    yield loadDetail(id, edit);
}

function* doSubmitJob (action) {
    const { jobData } = action;
    try {
        const response = yield call(api.post, 'jobs/', jobData);
        yield put(submitJobSuccess(response.data));
        yield put(routeJobSummary(response.data.jobId));
    } catch (error) {
        yield put(submitJobFailure(error));
    }
}

function* watchSubmitJob () {
    yield takeLatest(SUBMIT_JOB, doSubmitJob)
}

function* doSubmitClinVar (action) {
    const { jobData } = action;
    try {
        const response = yield call(api.post, 'jobs/clinvar/', jobData);
        yield put(submitClinVarSuccess(response.data));
        yield put(routeJobSummary(response.data.jobId));
    } catch (error) {
        yield put(submitClinVarFailure(error));
    }
}

function* watchSubmitClinVar () {
    yield takeLatest(SUBMIT_CLINVAR, doSubmitClinVar)
}

export { submitJob, watchSubmitJob, loadRouteSummary, loadRouteDetail, watchSubmitClinVar, submitClinVar }