import { ACTION_CONSTANTS } from "../../constant/actionContants";

export const fetchOkrsReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
