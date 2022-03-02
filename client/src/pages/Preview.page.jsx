import React from "react";
import "./CSS/preview.css";
import logo from "./images/login/logo.png";
import PreviewRow from "./components/PreviewRow";
import SubcategoryBox from "./components/SubcategoryBox";

const Preview = () => {
  return (
    <div className="main-preview-container">
        {/* Left Component */}
      <div className="search-component">
        <img className="search-component-logo" src={logo} alt="LOGO" />
        <h1 className="search-heading">Cultural Category</h1>
        <div className="search-bar">
            <input type="search" name="" id="searchbar" placeholder="Search by category name" />
        </div>
        <div className="subcategories-container">
            <SubcategoryBox name="Xventure" selected="selected-box" />
            <SubcategoryBox name="Iridescent" />
            <SubcategoryBox name="Psychus" />
        </div>
      </div>

      {/* Right Component */}
      <div className="preview-component">
        <div className="preview-header">
          <h1 className="preview-heading">Xventure</h1>
          <div className="preview-underline"></div>
          <h1 className="preview-subheading">Preview of the certificates</h1>
        </div>
        <div className="preview-main">
            <div className="preview-table-header">
                <h3 className="table-row-header">Name</h3>
                <h3 className="table-row-header">Designation</h3>
                <h3 className="table-row-header">Preview</h3>
            </div>
            <div className="table-header-underline"></div>
            <PreviewRow name="Sarah Jones" designation="Winner" />
            <PreviewRow name="Sarah Jones" designation="Winner" />
            <PreviewRow name="Sarah Jones" designation="Winner" />
            <PreviewRow name="Sarah Jones" designation="Participant" />
            <PreviewRow name="Sarah Jones" designation="Participant" />
            <PreviewRow name="Sarah Jones" designation="Organiser" />
            <PreviewRow name="Sarah Jones" designation="Organiser" />
            <PreviewRow name="Sarah Jones" designation="Organiser" />
            
        </div>
      </div>
    </div>
  );
};

export default Preview;
