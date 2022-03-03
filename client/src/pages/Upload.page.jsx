import React, {useState} from "react";
import SearchSubCategories from "./components/SearchSubCategories";
import "./CSS/upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
   const handleClick = async () =>{
       console.log(file);
       alert("Your file has been uploaded!")

   }

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
            <h3 className="table-row-drag">Drag or Upload your file for winner here</h3>
            <input type="file" onChange={(e) => {
                setFile(e.target.files[0])
            }} />
            <button onClick={handleClick}>&rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
