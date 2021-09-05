import React, { useEffect } from "react";
import { connect } from "react-redux";
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

const OkrDashboard = ({ processedOkrs, fetchOkrs }) => {
  useEffect(() => {
    fetchOkrs();
  }, []);

  return (
    <>
      <div className="dashboard_container">
        {Object.keys(processedOkrs).map((objectiveId, idx) => (
          <div key={processedOkrs[objectiveId].keyId}>
            <Objective order={idx + 1} data={processedOkrs[objectiveId]}>
              {processedOkrs[objectiveId].children.length ? (
                processedOkrs[objectiveId].children.map((keyResult, idx) => {
                  return (
                    <KeyResult
                      key={keyResult.keyId}
                      order={idx + 1}
                      data={keyResult}
                    />
                  );
                })
              ) : (
                <NoData message={"No Key Results"} />
              )}
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
};

const mapStateToProps = (state, ownProps) => {
  const okrs = state.okrs.data.data;
  return {
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
