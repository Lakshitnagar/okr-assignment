import { getOkrs } from "../../utils/api/okrClient";
import { ACTION_CONSTANTS } from "../../utils/constant/actionContants";
import { APP_CONSTANTS } from "../../utils/constant/appConstants";

const fetchOkrsSet = (data) => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_DATA,
    payload: data,
  });
};

const fetchOkrsReset = () => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_DATA,
    payload: {},
  });
};

const fetchOkrsInProgress = () => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_STATUS,
    payload: APP_CONSTANTS.API_STATUS.IN_PROGRESS,
  });
};

const fetchOkrsSuccess = () => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_STATUS,
    payload: APP_CONSTANTS.API_STATUS.SUCCESS,
  });
};

const fetchOkrsFail = () => (dispatch) => {
  dispatch({
    type: ACTION_CONSTANTS.FETCH_OKRS.FETCH_OKRS_API_STATUS,
    payload: APP_CONSTANTS.API_STATUS.FAIL,
  });
};

export const fetchOkrs = () => async (dispatch) => {
  fetchOkrsInProgress()(dispatch);

  try {
    const okrsData = await getOkrs();

    fetchOkrsReset()(dispatch);
    fetchOkrsSet(okrsData)(dispatch);
    fetchOkrsSuccess()(dispatch);
  } catch (e) {
    fetchOkrsFail()(dispatch);
  }
};
