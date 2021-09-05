import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { APP_CONSTANTS } from "../utils/constant/appConstants";
import { rootReducer } from "./reducers/rootReducer";

function configureStore(initialState = APP_CONSTANTS.APP_INITIAL_STATE) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

export const appStore = configureStore();
