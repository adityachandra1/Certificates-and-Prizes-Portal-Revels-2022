import React from "react";
import "./CSS/preview.css";
import PreviewRow from "./components/PreviewRow";
import { useState } from "react";
import SearchSubCategories from "./components/SearchSubCategories";

const Preview = () => {
  return (
    <div className="main-preview-container">
      {/* Left Component */}
      <SearchSubCategories />

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
