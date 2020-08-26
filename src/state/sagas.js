import { all, fork } from 'redux-saga/effects'

import { routes } from 'state/routes'
import { watchSearchGenes, watchSearchClinVar, watchRequestAddEdit, watchRequestAddMultiple, watchRequestAdvancedOptions } from "state/home";
import { watchSubmitJob, watchSubmitClinVar } from "state/job";
import { watchRequestGene } from "state/gene";
import { watchRequestRegion } from "state/region";
import { watchRequestTranscript } from "state/transcript";
import { watchRequestEdits } from "state/edits";
import { watchRequestOrganisms } from "state/organisms";

export default function * rootSaga () {
  yield all([
      fork(routes),
      fork(watchSearchGenes),
      fork(watchSearchClinVar),
      fork(watchSubmitJob),
      fork(watchSubmitClinVar),
      fork(watchRequestGene),
      fork(watchRequestRegion),
      fork(watchRequestTranscript),
      fork(watchRequestEdits),
      fork(watchRequestOrganisms),
      fork(watchRequestAddEdit),
      fork(watchRequestAddMultiple),
      fork(watchRequestAdvancedOptions),
      ]
  )
}