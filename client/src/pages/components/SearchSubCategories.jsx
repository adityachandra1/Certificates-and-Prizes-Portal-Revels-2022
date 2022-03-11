import React from "react";
import "./CSS/searchComponent.css";
import logo from "../images/login/logo.png";
import SubcategoryBox from "./SubcategoryBox";
import { useState } from "react";

const SearchSubCategories = (props) => {
  const [cat, setCat] = useState("");
  const [categories, setCategories] = useState([
    {
      name: "Anubhuti",
      selected: "",
    },
    {
      name: "Ampersand",
      selected: "not-selected",
    },
    {
      name: "Ergo",
      selected: "not-selected",
    },
    {
      name: "Psychus",
      selected: "not-selected",
    },
    {
      name: "Kalakriti",
      selected: "not-selected",
    },
    {
      name: "Crescendo",
      selected: "not-selected",
    },
    {
      name: "Footloose",
      selected: "not-selected",
    },
    {
      name: "Haute Couture",
      selected: "not-selected",
    },
    {
      name: "Animania",
      selected: "not-selected",
    },
    {
      name: "Xventure",
      selected: "not-selected",
    },
    {
      name: "Human Library",
      selected: "not-selected",
    },
    {
      name: "Lensation",
      selected: "not-selected",
    },
    {
      name: "Iridescent",
      selected: "not-selected",
    },
    {
      name: "Altaebir",
      selected: "not-selected",
    },
    {
      name: "Consulere",
      selected: "not-selected",
    },
    {
      name: "Dramebaaz",
      selected: "not-selected",
    },
  ]);

  const onselectCategory = (e) => {
    // console.log(e);
    setCat(e.target.value);
    // console.log(e.target.value);
    const tempcat = [...categories];
    tempcat.map((d) => {
      if (d.name == e.target.value) {
        if (d.selected == "selected-box") {
          d.selected = "not-selected";
        } else {
          d.selected = "selected-box";
        }
      } else {
        d.selected = "not-selected";
      }
      setCategories(tempcat);
    });
  };
  return (
    <div className="search-component">
      <img className="search-component-logo" src={logo} alt="LOGO" />
      <h1 className="search-heading">Cultural Category</h1>
      <div className="search-bar">
        <input
          type="search"
          name=""
          id="searchbar"
          placeholder="Search by category name"
        />
      </div>
      <div className="subcategories-container">
        {categories.map((d, i) => {
          return (
            <SubcategoryBox
              name={d.name}
              selected={d.selected}
              value={d.name}
              onselectCategory={onselectCategory}
              key={i}
            />
          );
        })}
        {/* <SubcategoryBox name="Xventure" selected="selected-box" />
          <SubcategoryBox name="Iridescent" />
          <SubcategoryBox name="Psychus" /> */}
      </div>
    </div>
  );
};

export default SearchSubCategories;
