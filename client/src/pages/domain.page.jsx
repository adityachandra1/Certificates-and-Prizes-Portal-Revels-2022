import React from 'react'
import "./CSS/choose_domain.css";
import LOGO from "./images/domains/logo.png";
import { Link } from "react-router-dom";

const domain = () => {
  return (
    <div className='domainpage'>
      <div className="header">
        <img className="logo" src={LOGO} alt="logo"></img>
        <Link to="/" className="loginbtn">
          Log in
        </Link>
      </div>
      <div className='curve'></div>
      <div className="mainbody">
        <div className='title'>Certificate Delivery Application</div>
        <div className='subtitle'>Please pick one of the categories from below to help us streamline the process better</div>
        <div className='domainbtns'>
          <button className='Sportsbtn'>Sports Category</button>
          <button className='culturalbtn'>Cultural Category</button>
          <button className='Supportingbtn'>Supporting Category</button>
        </div>
      </div>
      
    </div>
  );
};

export default domain;
