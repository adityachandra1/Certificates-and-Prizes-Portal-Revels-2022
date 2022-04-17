import React, { useState, useEffect } from "react";
import "./CSS/choose_domain.css";
import LOGO from "./images/domains/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const jwt = sessionStorage.getItem("currentUser");
const Domain = () => {
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

  return (
    <div className="domainpage">
      <div className="header">
        <img className="logo" src={LOGO} alt="logo"></img>
      </div>
      <div className="curve"></div>
      <div className="mainbody">
        <div className="title">Certificate Delivery Application</div>
        <div className="subtitle">
          Please pick one of the categories from below to help us streamline the
          process better
        </div>
        <div className="domainbtns">
          <Link
            to="/certificates-preview"
            state={{
              selectedDomain: 0,
            }}
          >
            <button
              className="Sportsbtn Sportsbtnm"
              value="sports"
              // onClick={(e) => onSelectDomain(e)}
            >
              Sports Category
            </button>
          </Link>
          <Link
            to="/certificates-preview"
            state={{
              selectedDomain: 1,
            }}
          >
            <button
              className="culturalbtn culturalbtnm"
              value="cultural"
              // onClick={(e) => onSelectDomain(e)}
            >
              Cultural Category
            </button>
          </Link>

          <Link
            to="/certificates-preview"
            state={{
              selectedDomain: 2,
            }}
          >
            <button
              className="Supportingbtn Supportingbtnm"
              value="supportings"
              // onClick={(e) => onSelectDomain(e)}
            >
              Supporting Category
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Domain;
