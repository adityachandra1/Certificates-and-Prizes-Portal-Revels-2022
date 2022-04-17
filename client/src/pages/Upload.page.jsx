import React, { useState, useEffect } from "react";
import SearchSubCategories from "./components/SearchSubCategories";
import "./CSS/upload.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const jwt = sessionStorage.getItem("currentUser");

const Upload = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("1");
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
  });

  const [file, setFile] = useState(null);
  const handleClick = async () => {
    console.log(file);
    alert("Your file has been uploaded!");
  };

  return (
    <div className="main-upload-container">
      {/* Left Component */}
      <SearchSubCategories />

      {/* Right Component */}
      <div className="upload-container">
        {/* Header */}
        <div className="upload-header">
          <h1 className="upload-heading">Xventure</h1>
          <div className="upload-underline"></div>
          <h1 className="upload-subheading">Upload the list of winners</h1>
          <h3 className="upload-para">
            Please make sure to mention the file format
            <span className="upload-imp"> *</span>
          </h3>
        </div>
        {/* Main */}
        <div className="upload-main">
          <div className="upload-table-content">
            <h3 className="table-row-drag">
              Drag or Upload your file for winner here
            </h3>
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button onClick={handleClick}>&rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
