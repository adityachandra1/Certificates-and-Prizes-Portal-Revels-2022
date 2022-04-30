import React, { useState, useEffect } from "react";
import "./CSS/searchComponent.css";
import logo from "../images/login/logo.png";
import SubcategoryBox from "./SubcategoryBox";

const SearchSubCategories = (props) => {
  const [categories, setCategories] = useState(...props.categories);

  useEffect(() => {
    setCategories(props.categories);
  }, [props.currentCategory]);

  // const onselectCategory = (e) => {
  //   props.setCurrentCategory(e.target.value);
  //   const tempcat = [...categories];
  //   tempcat.map((d) => {
  //     if (d.name == e.target.value) {
  //       if (d.selected == "selected-box") {
  //         d.selected = "not-selected";
  //       } else {
  //         d.selected = "selected-box";
  //       }
  //     } else {
  //       d.selected = "not-selected";
  //     }
  //     setCategories(tempcat);
  //   });
  // };
  return (
    <div className="search-component">
      <img className="search-component-logo" src={logo} alt="LOGO" />
      <h1 className="search-heading">Categories</h1>
      <div className="search-bar">
        <input
          type="search"
          name=""
          id="searchbar"
          placeholder="Search by category name"
        />
      </div>
      <div className="subcategories-container">
        {props &&
          props.categories &&
          props.categories.map((d, i) => {
            return (
              <SubcategoryBox
                name={d.name}
                selected={d.selected}
                value={d.name}
                onselectCategory={() => {
                  props.setCurrentCategory(d.name);
                }}
                key={i}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchSubCategories;
