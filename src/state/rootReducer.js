import { combineReducers } from "redux";

import location from './routes'
import home from './home'
import organisms from './organisms'
import job from './job'
import edits from "./edits";
import gene from './gene'
import region from './region'
import transcript from "./transcript";
import customsequence from "./customsequence";

const rootReducer = combineReducers({
    location,
    home,
    gene,
    organisms,
    job,
    edits,
    transcript,
    customsequence,
    region,
});

export default rootReducer;