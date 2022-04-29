import React from "react";
import "./CSS/preview.css";
import PreviewRow from "./components/PreviewRow";
import { useState, useEffect } from "react";
import SearchSubCategories from "./components/SearchSubCategories";
import { useLocation } from "react-router-dom";
import domains from "./components/json-data/domains.json";
import { button, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ExcelRenderer, OutTable } from "react-excel-renderer";

const { TextArea } = Input;
const jwt = sessionStorage.getItem("currentUser");

const handleSendButtonClick = () => {
  axios.get("http://localhost:8080/cert").then((res) => {});
};

const Preview = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  useEffect(() => {
    const jwt = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(jwt);
    axios
      .get("http://localhost:8080/checklogin", {
        headers: {
          authorization: jwt,
        },
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
        navigate("/");
      });
  }, []);

  const handleClick = async () => {
    console.log(file);
    alert("Your file has been uploaded!");
    //no idea
    document.write(file.name);
  };

  const [participants, setParticipants] = useState([
    { name: "Chintan", designation: "Winner" },
    { name: "Ayush", designation: "Winner" },
    { name: "Diya", designation: "Winner" },
    { name: "Shreyansh", designation: "Winner" },
    { name: "xyz", designation: "Participant" },
    { name: "abc", designation: "Organizer" },
    { name: "Chintan", designation: "Winner" },
    { name: "Ayush", designation: "Winner" },
    { name: "Diya", designation: "Winner" },
    { name: "Shreyansh", designation: "Winner" },
    { name: "xyz", designation: "Participant" },
    { name: "abc", designation: "Organizer" },
    { name: "Chintan", designation: "Winner" },
    { name: "Ayush", designation: "Winner" },
    { name: "Diya", designation: "Winner" },
    { name: "Shreyansh", designation: "Winner" },
    { name: "xyz", designation: "Participant" },
    { name: "abc", designation: "Organizer" },
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
            <h1 className="preview-subheading">Send the certificates</h1>
          </div>
          <br />
          <br />

          <br />
          <br />

          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button onClick={handleClick}>Submit</button>
          <br />
          <br />
          <br />
          <TextArea
            rows={4}
            placeholder="Enter Email Body"
            maxLength={3000}
            id="email-body"
          />
          <br />
          <br />

          <button>Send All Mails</button>
          <div className="preview-main">
            <div className="preview-table-header">
              {/* <h3 className="table-row-header">Name</h3>
              <h3 className="table-row-header">Designation</h3> */}
            </div>
            {/* <div className="table-header-underline"></div> */}

            {/* {currentCategory !== null &&
              participants &&
              participants.map((d) => {
                return <PreviewRow name={d.name} designation={d.designation} />;
              })} */}
            {currentCategory === null && <h1>Please select a category</h1>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
