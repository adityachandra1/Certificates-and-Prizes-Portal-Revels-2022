import React from "react";
import { useState, useEffect } from "react";
import "./CSS/event.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const jwt = sessionStorage.getItem("currentUser");
const Event = () => {
  const [file, setFile] = useState(null);

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

  const handleClick = async () => {
    console.log(file);
    alert("Your file has been uploaded!");
    //no idea
    document.write(file.name);
  };

  return (
    <div>
      <div className="event-container">
        <h1>Heading</h1>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
};

export default Event;
