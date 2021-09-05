import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOkrs } from "../../utils/container/actions/fetchOkrsAction";
import PropTypes from "prop-types";
import "./OkrDashboard.scss";
import { hierarchalOkrs } from "../../utils/helper/okrHelper";
import Objective from "../objective/Objective";
import KeyResult from "../keyResult/KeyResult";

const OkrDashboard = ({ processedOkrs, fetchOkrs }) => {
  useEffect(() => {
    fetchOkrs();
  }, []);

  let count = 1;
  let objectiveCount = 1;
  // let keyResultCount = 1;

  return (
    <>
      <div className="dashboard_container">
        {Object.keys(processedOkrs).map((objectiveId) => (
          <div key={processedOkrs[objectiveId].keyId}>
            {/* O: {count++} :  */}
            <Objective
              order={objectiveCount++}
              data={processedOkrs[objectiveId]}
            >
              {processedOkrs[objectiveId].children.length ? (
                processedOkrs[objectiveId].children.map((keyResult, idx) => {
                  return (
                    <KeyResult
                      key={keyResult.keyId}
                      order={idx + 1}
                      data={keyResult}
                    >
                      K: {count++}
                    </KeyResult>
                  );
                })
              ) : (
                <div>No Key Results</div>
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
};

const mapStateToProps = (state) => {
  return {
    processedOkrs: hierarchalOkrs(state.okrs.data.data),
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOkrs: () => dispatch(fetchOkrs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OkrDashboard);
