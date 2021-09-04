import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchOkrs } from "../utils/container/actions/fetchOkrsAction";
import PropTypes from "prop-types";

const OkrDashboard = ({ fetchOkrs }) => {
  useEffect(() => {
    fetchOkrs();
  }, []);

  return <div>OkrDashboard</div>;
};

OkrDashboard.propTypes = {
  okrs: PropTypes.object,
  fetchOkrs: PropTypes.func,
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOkrs: () => dispatch(fetchOkrs()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OkrDashboard);
