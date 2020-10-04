import { combineReducers } from "redux";

import customsequence from "./customsequence";
import edits from "./edits";
import gene from './gene'
import home from './home'
import job from './job'
import nucleases from './nucleases'
import organisms from './organisms'
import region from './region'
import location from './routes'
import transcript from "./transcript";

const rootReducer = combineReducers({
    customsequence,
    edits,
    gene,
    home,
    job,
    location,
    nucleases,
    organisms,
    transcript,
    region,
});

export default rootReducer;