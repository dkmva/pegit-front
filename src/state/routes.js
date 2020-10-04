import {select, spawn, take, put} from 'redux-saga/effects'
import { connectRoutes } from 'redux-first-router'

import { loadCustomSequence } from "state/customsequence";
import { requestEdits } from 'state/edits'
import { loadRouteGene } from 'state/gene'
import { requestAdvancedOptions } from 'state/home'
import { loadRouteSummary, loadRouteDetail } from 'state/job'
import { requestNucleases } from 'state/nucleases'
import { requestOrganisms } from 'state/organisms'
import { loadRouteRegion } from 'state/region'
import { loadRouteTranscript } from "state/transcript";


// Actions
const ROUTE_HOME = 'route/ROUTE_HOME';
const ROUTE_ABOUT = 'route/ROUTE_ABOUT';
const ROUTE_CONTACT = 'route/ROUTE_CONTACT';
const ROUTE_FAQ = 'route/ROUTE_FAQ';
const ROUTE_INSTRUCTIONS = 'route/ROUTE_INSTRUCTIONS';

const ROUTE_GENE = 'route/ROUTE_GENE';
const ROUTE_TRANSCRIPT = 'route/ROUTE_TRANSCRIPT';
const ROUTE_REGION = 'route/ROUTE_REGION';
const ROUTE_CUSTOMSEQUENCE = 'route/ROUTE_CUSTOMSEQUENCE';

const ROUTE_JOB_SUMMARY = 'route/ROUTE_JOB_SUMMARY';
const ROUTE_JOB_DETAIL = 'route/ROUTE_JOB_DETAIL';
const ROUTE_PEGRNADETAIL = 'route/ROUTE_PEGRNADETAIL';
const ROUTE_NICKINGDETAIL = 'route/ROUTE_NICKINGDETAIL';

// Reducer
const routesMap = {
  [ROUTE_HOME]: '/',
  [ROUTE_ABOUT]: '/about',
  [ROUTE_CONTACT]: '/contact',
  [ROUTE_FAQ]: '/faq',
  [ROUTE_INSTRUCTIONS]: '/instructions',
  [ROUTE_GENE]: '/gene/:geneId',
  [ROUTE_REGION]: '/region/:region',
  [ROUTE_CUSTOMSEQUENCE]: '/customsequence/',
  [ROUTE_TRANSCRIPT]: '/transcript/:transcriptId',
  [ROUTE_JOB_SUMMARY]: '/job/:jobId',
  [ROUTE_JOB_DETAIL]: '/job/:jobId/:edit',
  [ROUTE_PEGRNADETAIL]: '/job/:jobId/:edit/:pegRNA',
  [ROUTE_NICKINGDETAIL]: '/job/:jobId/:edit/:pegRNA/:nicking',
};

const { reducer, middleware, enhancer } = connectRoutes(routesMap);


// Action creators
const routeAbout = () => ({ type: ROUTE_ABOUT });
const routeContact = () => ({ type: ROUTE_CONTACT });
const routeFAQ = () => ({ type: ROUTE_FAQ });
const routeHome = () => ({ type: ROUTE_HOME });
const routeInstructions = () => ({ type: ROUTE_INSTRUCTIONS });

const routeCustomSequence = () => ({ type: ROUTE_CUSTOMSEQUENCE });
const routeGene = (geneId) => ({ type: ROUTE_GENE, payload: { geneId } });
const routeRegion = (region) => ({ type: ROUTE_REGION, payload: { region } });
const routeTranscript = (transcriptId) => ({ type: ROUTE_TRANSCRIPT, payload: { transcriptId } });

const routeJobSummary = (jobId) => ({ type: ROUTE_JOB_SUMMARY, payload: { jobId } });
const routeJobDetail = (jobId, edit) => ({ type: ROUTE_JOB_DETAIL, payload: { jobId, edit } });
const routePegRNADetail = (jobId, edit, pegRNA) => ({ type: ROUTE_PEGRNADETAIL, payload: { jobId, edit, pegRNA } });
const routeNickingDetail = (jobId, edit, pegRNA, nicking) => ({ type: ROUTE_NICKINGDETAIL, payload: { jobId, edit, pegRNA, nicking } });


// Side effects

const routeType = state => state.location.type;

const sideEffectsRoutesMap = {
    [ROUTE_GENE]: loadRouteGene,
    [ROUTE_REGION]: loadRouteRegion,
    [ROUTE_TRANSCRIPT]: loadRouteTranscript,
    [ROUTE_CUSTOMSEQUENCE]: loadCustomSequence,
    [ROUTE_JOB_SUMMARY]: loadRouteSummary,
    [ROUTE_JOB_DETAIL]: loadRouteDetail,
    [ROUTE_PEGRNADETAIL]: loadRouteDetail,
    [ROUTE_NICKINGDETAIL]: loadRouteDetail,
};

function * routes () {
  const initialRoute = yield select(routeType);
  yield put(requestAdvancedOptions());
  yield put(requestEdits());
  yield put(requestNucleases());
  yield put(requestOrganisms());
  // Run saga in route map that matches initialRoute if exists
  if (sideEffectsRoutesMap[initialRoute]) {
    yield spawn(sideEffectsRoutesMap[initialRoute])
  }
  // Watch for future navigation events and run the correct saga if needed.
  while (true) {
    const {type} = yield take(Object.keys(sideEffectsRoutesMap));
    yield spawn(sideEffectsRoutesMap[type])
  }
}


// Exports
export {
    middleware, enhancer, routes, routeType,
    ROUTE_HOME, routeHome,
    ROUTE_ABOUT, routeAbout,
    ROUTE_CONTACT, routeContact,
    ROUTE_FAQ, routeFAQ,
    ROUTE_INSTRUCTIONS, routeInstructions,
    ROUTE_CUSTOMSEQUENCE, routeCustomSequence,
    ROUTE_REGION, routeRegion,
    ROUTE_GENE, routeGene,
    ROUTE_TRANSCRIPT, routeTranscript,
    ROUTE_JOB_SUMMARY, routeJobSummary,
    ROUTE_JOB_DETAIL, routeJobDetail,
    ROUTE_PEGRNADETAIL, routePegRNADetail,
    ROUTE_NICKINGDETAIL, routeNickingDetail,
}

export default reducer;