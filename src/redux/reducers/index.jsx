import { combineReducers } from "redux";

import playlist from "./playlist";
import album from "./album";

const reducers = {
  playlist,
  album,
};

export default combineReducers(reducers);
