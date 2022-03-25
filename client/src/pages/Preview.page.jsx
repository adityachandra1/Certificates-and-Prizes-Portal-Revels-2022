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
  const [cat, setCat] = useState("");
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const current = location.state.selectedDomain;

  useEffect(() => {
    return () => {
      setCategories(domains[current]);
      console.log(categories);
      console.log(domains);
    };
  }, []);
  return (
    <div className="main-preview-container">
      {/* Left Component */}
      <SearchSubCategories categories={categories} />

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

          {participants.map((d) => {
            return <PreviewRow name={d.name} designation={d.designation} />;
          })}
          {/* <PreviewRow name="Sarah Jones" designation="Winner" />
          <PreviewRow name="Sarah Jones" designation="Winner" />
          <PreviewRow name="Sarah Jones" designation="Winner" />
          <PreviewRow name="Sarah Jones" designation="Participant" />
          <PreviewRow name="Sarah Jones" designation="Participant" />
          <PreviewRow name="Sarah Jones" designation="Organiser" />
          <PreviewRow name="Sarah Jones" designation="Organiser" />
          <PreviewRow name="Sarah Jones" designation="Organiser" /> */}
        </div>
      </div>
    </div>
  );
};

export default Preview;
