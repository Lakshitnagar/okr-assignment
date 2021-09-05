import React from "react";
import PropTypes from "prop-types";
import "./NoData.scss";
import { DocumentSearchIcon } from "@heroicons/react/outline";

const NoData = ({ message }) => {
  return (
    <>
      <div className="no_data_container">
        <DocumentSearchIcon className="no_data_icon" />
        <div> {message} </div>
      </div>
    </>
  );
};

NoData.propTypes = {
  message: PropTypes.string,
};

export default NoData;
