import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OkrDashboard from "./pages/okrDashboard/OkrDashboard";
import "./App.scss";
import { getCategoryList } from "./utils/helper/okrHelper";

function App({ categoryList }) {
  const defaultCategory = "all";

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const onCategorySelect = (e) => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="app_container">
      <div>
        <header>OKR Dashboard</header>

        <main>
          <div className="filters_container">
            <span> Filter: </span>
            <select onChange={onCategorySelect}>
              <option key="all" value="all">
                {" "}
                All Category{" "}
              </option>
              {categoryList.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          <OkrDashboard selectedCategory={selectedCategory} />
        </main>
      </div>

      <div>
        <footer>@Company</footer>
      </div>
    </div>
  );
}

App.propTypes = {
  categoryList: PropTypes.array,
};

const mapStateToProps = (state) => {
  const okrs = state.okrs.data.data;
  return {
    categoryList: getCategoryList(okrs),
  };
};

export default connect(mapStateToProps)(App);
