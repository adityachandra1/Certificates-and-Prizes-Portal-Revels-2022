import React, { useState } from "react";
import "./CSS/choose_domain.css";
import LOGO from "./images/domains/logo.png";
import { Link } from "react-router-dom";

const Domain = () => {
  const [domain, setDomain] = useState("");

  const onSelectDomain = (e) => {
    setDomain(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="domainpage">
      <div className="header">
        <img className="logo" src={LOGO} alt="logo"></img>
        <Link to="/" className="loginbtn">
          Log in
        </Link>
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
            to={{
              pathname: "/subdomain",
              state: {
                selectedDomain: "sports",
              },
            }}
          >
            <button
              className="Sportsbtn"
              value="sports"
              onClick={(e) => onSelectDomain(e)}
            >
              Sports Category
            </button>
          </Link>

          <button
            className="culturalbtn"
            value="cultural"
            onClick={(e) => onSelectDomain(e)}
          >
            Cultural Category
          </button>
          <button
            className="Supportingbtn"
            value="supportings"
            onClick={(e) => onSelectDomain(e)}
          >
            Supporting Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Domain;
