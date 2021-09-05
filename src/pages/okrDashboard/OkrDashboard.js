import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RefreshIcon } from "@heroicons/react/solid";
import { fetchOkrs } from "../../container/actions/fetchOkrsAction";
import PropTypes from "prop-types";
import "./OkrDashboard.scss";
import {
  filterOkrsByCategory,
  getCategoryList,
  hierarchalOkrs,
} from "../../utils/helper/okrHelper";
import Objective from "../../components/objective/Objective";
import KeyResult from "../../components/keyResult/KeyResult";
import NoData from "../../components/noData/NoData";
import { APP_CONSTANTS } from "../../utils/constant/appConstants";
import { EmojiSadIcon } from "@heroicons/react/outline";

const OkrDashboard = ({ processedOkrs, fetchOkrs, okrsApiStatus }) => {
  useEffect(() => {
    fetchOkrs();
  }, []);

  const refreshDashboard = () => {
    fetchOkrs();
  };

  return (
    <>
      <div className="dashboard_container">
        <button
          className="dashboard_refresh"
          disabled={okrsApiStatus === APP_CONSTANTS.API_STATUS.IN_PROGRESS}
          onClick={refreshDashboard}
        >
          <RefreshIcon className="dashboard_refresh_icon" />
        </button>

        {okrsApiStatus !== APP_CONSTANTS.API_STATUS.SUCCESS && (
          <div className="dashboard_api_status">
            {!okrsApiStatus && <div>Refresh the dashboard</div>}

            {okrsApiStatus === APP_CONSTANTS.API_STATUS.FAIL && (
              <>
                <EmojiSadIcon className="dashboard_api_status_icon" />
                Oops! Something went wrong. Try refreshing again.
              </>
            )}

            {okrsApiStatus === APP_CONSTANTS.API_STATUS.IN_PROGRESS && (
              <div>Loading...</div>
            )}
          </div>
        )}

        {okrsApiStatus === APP_CONSTANTS.API_STATUS.SUCCESS &&
          Object.keys(processedOkrs).map((objectiveId, idx) => (
            <div key={processedOkrs[objectiveId].keyId}>
              <Objective order={idx + 1} data={processedOkrs[objectiveId]}>
                <>
                  {processedOkrs[objectiveId].children.length ? (
                    processedOkrs[objectiveId].children.map(
                      (keyResult, idx) => {
                        return (
                          <KeyResult
                            key={keyResult.keyId}
                            order={idx + 1}
                            data={keyResult}
                          />
                        );
                      }
                    )
                  ) : (
                    <NoData message={"No Key Results"} />
                  )}
                </>
              </Objective>
            </div>
          ))}
      </div>
    </>
  );
};

OkrDashboard.propTypes = {
  processedOkrs: PropTypes.object,
  fetchOkrs: PropTypes.func,
  selectedCategory: PropTypes.string,
  okrsApiStatus: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  const okrs = state.okrs.data.data;
  const okrsApiStatus = state.okrs.status;
  return {
    okrsApiStatus,
    categoryList: getCategoryList(okrs),
    processedOkrs: hierarchalOkrs(
      filterOkrsByCategory(okrs, ownProps.selectedCategory)
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOkrs: () => dispatch(fetchOkrs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OkrDashboard);
