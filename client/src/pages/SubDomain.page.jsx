import React, { useState, useEffect } from "react";
import wave1 from "./images/login/wave1.svg";
import wave2 from "./images/login/wave2.svg";
import LOGO from "./images/domains/logo.png";
import RevelsMark from "./images/revelsmark.svg";
import "./CSS/subDomain.css";
import { Button } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const jwt = sessionStorage.getItem("currentUser");
const Subdomain = (props) => {
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

  const [subDomainList, setSubDomainList] = useState({
    sports: ["Football", "hockey", "Cricket", "Tennis", "Badminton"],
    cultural: ["dancing", "singing"],
    supporting: ["Xventure", "abc", "xyz"],
  });
  const location = useLocation();
  const current = location.state.selectedDomain;

  return (
    <div className="trial">
      {/* {console.log(location.state.selectedDomain)} */}
      {console.log(current)}
      <div className="sub-domain-container">
        <div className="nav-container">
          <img className="logo" src={LOGO} alt="logo"></img>
          <img className="logo" src={RevelsMark} alt="logo"></img>
        </div>
        <div className="main-data">
          <h1 className="subdomain-title">
            Find your category within the given the list of categories for the
            event
          </h1>
          <div className="cat-group">
            {subDomainList.sports.map((d, i) => {
              return <button key={i}>{d}</button>;
            })}
            {/* 
            <button>Xventure</button>
            <button>Abc</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>
            <button>Xventure</button>

            <button>Xyz</button> */}
          </div>
        </div>
      </div>
      {/* <div className="waves">
        <img src={wave1} alt="" className="wave-svg1" />
        <img src={wave2} alt="" className="wave-svg2" />
      </div> */}
    </div>
  );
};

export default Subdomain;
