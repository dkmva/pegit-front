import { all, fork } from 'redux-saga/effects'

import { watchRequestEdits } from "state/edits";
import { watchRequestGene } from "state/gene";
import { watchSearchGenes, watchSearchClinVar, watchRequestAddEdit, watchRequestAddMultiple, watchRequestAdvancedOptions } from "state/home";
import { watchSubmitJob, watchSubmitClinVar } from "state/job";
import { watchRequestNucleases } from "state/nucleases";
import { watchRequestOrganisms } from "state/organisms";
import { watchRequestRegion } from "state/region";
import { routes } from 'state/routes'
import { watchRequestTranscript } from "state/transcript";

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
      fork(watchRequestNucleases),
      fork(watchRequestOrganisms),
      fork(watchRequestAddEdit),
      fork(watchRequestAddMultiple),
      fork(watchRequestAdvancedOptions),
      ]
  )
}