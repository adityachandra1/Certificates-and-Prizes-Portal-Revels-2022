import React from "react";
import "./CSS/preview.css";
// import PreviewRow from "./components/PreviewRow";
import { Fragment, useState, useEffect } from "react";
import SearchSubCategories from "./components/SearchSubCategories";
import { useLocation } from "react-router-dom";
import domains from "./components/json-data/domains.json";
import { button, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from './components/Message';
import Progress from './components/Progress';

const { TextArea } = Input;
const jwt = sessionStorage.getItem("currentUser");

const Preview = () => {
  const navigate = useNavigate();

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [mailBody, setMailBody] = useState("");
  const location = useLocation();
  const current = location.state.selectedDomain;

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email_list", file);

    try {
      const res = await axios.post("http://localhost:8080/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Key" : "email_list"
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });

      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };

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
    console.log("Uploading File Started");
    axios
      .post("http://localhost:8080/upload", {
        email_list: file,
      })
      .then(function (response) {
        console.log(response);
        alert(response.message);
      })
      .catch(function (error) {
        console.log(error);
        alert("Error: " + error.message);
      });
    console.log("Uploading File Done");
  };

  const sendMails = async () => {
    console.log("Generating Certificates and Sending Mails");
    axios
      .post("http://localhost:8080/cert", {
        category: current,
        email_body: mailBody,
      })
      .then(function (response) {
        console.log(response);
        alert("SUCCESSFUL: " + response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("Error: " + error.message);
      });
  };

  // const [participants, setParticipants] = useState([
  //   { name: "Chintan", designation: "Winner" },
  //   { name: "Ayush", designation: "Winner" },
  //   { name: "Diya", designation: "Winner" },
  //   { name: "Shreyansh", designation: "Winner" },
  //   { name: "xyz", designation: "Participant" },
  //   { name: "abc", designation: "Organizer" },
  //   { name: "Chintan", designation: "Winner" },
  //   { name: "Ayush", designation: "Winner" },
  //   { name: "Diya", designation: "Winner" },
  //   { name: "Shreyansh", designation: "Winner" },
  //   { name: "xyz", designation: "Participant" },
  //   { name: "abc", designation: "Organizer" },
  //   { name: "Chintan", designation: "Winner" },
  //   { name: "Ayush", designation: "Winner" },
  //   { name: "Diya", designation: "Winner" },
  //   { name: "Shreyansh", designation: "Winner" },
  //   { name: "xyz", designation: "Participant" },
  //   { name: "abc", designation: "Organizer" },
  //   { name: "Chintan", designation: "Winner" },
  //   { name: "Ayush", designation: "Winner" },
  //   { name: "Diya", designation: "Winner" },
  //   { name: "Shreyansh", designation: "Winner" },
  //   { name: "xyz", designation: "Participant" },
  //   { name: "abc", designation: "Organizer" },
  // ]);

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

          <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
              <div className="custom-file mb-4">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={onChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {filename}
                </label>
              </div>

              <Progress percentage={uploadPercentage} />

              <input
                type="submit"
                value="Upload"
                className=""
              />
            </form>
            {uploadedFile ? (
              <div className="row mt-5">
                <div className="col-md-6 m-auto">
                  <h3 className="text-center">{uploadedFile.fileName}</h3>
                  <img
                    style={{ width: "100%" }}
                    src={uploadedFile.filePath}
                    alt=""
                  />
                </div>
              </div>
            ) : null}
          </Fragment>

          <br />
          <TextArea
            rows={4}
            placeholder="Enter Email Body"
            maxLength={3000}
            id="email-body"
            value={mailBody}
            onChange={(e) => setMailBody(e.target.value)}
          />

          <button onClick={sendMails}>Send All Mails</button>
          {/* <div className="preview-main">
            <div className="preview-table-header">
              <h3 className="table-row-header">Name</h3>
              <h3 className="table-row-header">Designation</h3>
            </div>
            <div className="table-header-underline"></div>

            {currentCategory !== null &&
              participants &&
              participants.map((d) => {
                return <PreviewRow name={d.name} designation={d.designation} />;
              })}
            {currentCategory === null && <h1>Please select a category</h1>}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Preview;
