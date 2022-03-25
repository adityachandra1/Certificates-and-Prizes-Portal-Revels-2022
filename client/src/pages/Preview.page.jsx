import React from "react";
import "./CSS/preview.css";
import PreviewRow from "./components/PreviewRow";
import { useState, useEffect } from "react";
import SearchSubCategories from "./components/SearchSubCategories";
import { useLocation } from "react-router-dom";
import domains from "./components/json-data/domains.json";

const Preview = () => {
  const [participants, setParticipants] = useState([
    { name: "Chintan", designation: "Winner" },
    { name: "Ayush", designation: "Winner" },
    { name: "Diya", designation: "Winner" },
    { name: "Shreyansh", designation: "Winner" },
    { name: "xyz", designation: "Participant" },
    { name: "abc", designation: "Organizer" },
  ]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const location = useLocation();
  const current = location.state.selectedDomain;
  return (
    <div className="main-preview-container">
      {/* Left Component */}

      <SearchSubCategories
        categories={domains[current]}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />

      {/* Right Component */}
      {currentCategory !== null && (
        <div className="preview-component">
          <div className="preview-header">
            <h1 className="preview-heading">
              {currentCategory && currentCategory.length > 0
                ? currentCategory
                : ""}
            </h1>
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

            {currentCategory !== null &&
              participants &&
              participants.map((d) => {
                return <PreviewRow name={d.name} designation={d.designation} />;
              })}
            {currentCategory === null && <h1>Please select a category</h1>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
