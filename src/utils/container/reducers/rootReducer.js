import { combineReducers } from "redux";
import { fetchOkrsReducer } from "../reducers/fetchOkrsReducer";

export const rootReducer = combineReducers({
  okrs: fetchOkrsReducer,
});
