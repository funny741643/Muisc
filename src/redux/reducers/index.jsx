import { combineReducers } from "redux";

import playlist from "./playlist";
import album from "./album";
import singer from "./singer";
import mv from "./mv";

const reducers = {
  playlist,
  album,
  singer,
  mv,
};

export default combineReducers(reducers);
