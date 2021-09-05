import React from "react";
import PropTypes from "prop-types";
import "./KeyResult.scss";
import { UserCircleIcon } from "@heroicons/react/solid";

const KeyResult = ({ order, data }) => {
  return (
    <>
      <div className={`key_result_container ${order % 2 ? "odd" : "even"}`}>
        <div className="key_result_left_panel">
          <div className="key_result_item_line" />
          <div className="key_result_indent_line" />
        </div>

        <div className="key_result_right_panel">
          <div className="key_result_control">
            <UserCircleIcon className="key_result_user" />
          </div>

          <div className="key_result_detail">
            {order}. {data.title}
          </div>
        </div>
      </div>
    </>
  );
};

KeyResult.propTypes = {
  order: PropTypes.number,
  data: PropTypes.object,
  children: PropTypes.object,
};

export default KeyResult;
