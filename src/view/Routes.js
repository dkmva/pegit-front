import React from 'react'
import { connect } from 'react-redux'
import { NOT_FOUND } from 'redux-first-router'

import { routeType, ROUTE_ABOUT, ROUTE_CONTACT, ROUTE_FAQ, ROUTE_GENE, ROUTE_REGION, ROUTE_HOME, ROUTE_INSTRUCTIONS, ROUTE_JOB_SUMMARY, ROUTE_JOB_DETAIL, ROUTE_PEGRNADETAIL, ROUTE_NICKINGDETAIL, ROUTE_TRANSCRIPT, ROUTE_CUSTOMSEQUENCE } from 'state/routes'
import { About } from 'view/About'
import { Contact } from 'view/Contact'
import { FAQ } from 'view/FAQ'
import { Instructions } from 'view/Instructions'
import { ConnectedGene } from 'view/Submission/Gene'
import { ConnectedRegion } from 'view/Submission/Region'
import { ConnectedHome } from 'view/Home'
import { ConnectedSummary } from 'view/Job/Summary';
import { ConnectedJob } from 'view/Job/List'
import { ConnectedPegRNADetail } from 'view/Job/Detail'
import { ConnectedNickingDetail } from 'view/Job/NickingDetail'
import { ConnectedTranscript } from 'view/Submission/Transcript'
import { CustomSequence } from 'view/Submission/CustomSequence'

const routesMap = {
  [ROUTE_HOME]: ConnectedHome,
  [ROUTE_ABOUT]: About,
  [ROUTE_CONTACT]: Contact,
  [ROUTE_FAQ]: FAQ,
  [ROUTE_INSTRUCTIONS]: Instructions,
  [ROUTE_CUSTOMSEQUENCE]: CustomSequence,
  [ROUTE_GENE]: ConnectedGene,
  [ROUTE_REGION]: ConnectedRegion,
  [ROUTE_TRANSCRIPT]: ConnectedTranscript,
  [ROUTE_JOB_SUMMARY]: ConnectedSummary,
  [ROUTE_JOB_DETAIL]: ConnectedJob,
  [ROUTE_PEGRNADETAIL]: ConnectedPegRNADetail,
  [ROUTE_NICKINGDETAIL]: ConnectedNickingDetail,
  [NOT_FOUND]: ConnectedHome
};

const Container = ({route}) => {
  const Route = routesMap[route] ? routesMap[route] : routesMap[NOT_FOUND];
  return (
    <Route />
  )
};

const mapStateToProps = (state) => ({ route: routeType(state) });

export const Routes = connect(mapStateToProps)(Container);