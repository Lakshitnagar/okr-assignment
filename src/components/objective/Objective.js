import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Objective.scss";
import {
  UserCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";

const Objective = ({ order, data, children }) => {
  const [expand, setExpand] = useState(true);

  const onExpand = () => {
    setExpand(!expand);
  };

  return (
    <>
      <div className="objective_container">
        <div className="objective_parent">
          <div className="objective_left_panel" onClick={onExpand}>
            <div className="objective_control">
              {expand ? (
                <ChevronDownIcon className="objective_show_hide" />
              ) : (
                <ChevronRightIcon className="objective_show_hide" />
              )}
              <UserCircleIcon className="objective_user" />
            </div>

            {expand ? <div className="objective_indent_line" /> : ""}
          </div>

          <div
            className="objective_right_panel"
            style={!expand ? { display: "flex", alignItems: "center" } : {}}
          >
            <span>
              {order}. {data.title}
            </span>
          </div>
        </div>

        {expand ? <div>{children}</div> : ""}
      </div>
    </>
  );
};

Objective.propTypes = {
  order: PropTypes.number,
  data: PropTypes.object,
  children: PropTypes.object,
};

export default Objective;
