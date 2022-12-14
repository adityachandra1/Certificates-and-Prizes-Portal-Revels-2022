import "./App.css";
import Login from "./pages/login.page";
import { Routes, Route } from "react-router-dom";
import Event from "./pages/Event.page";
import Preview from "./pages/Preview.page";
import Domain from "./pages/domain.page";
import Upload from "./pages/Upload.page";
import Subdomain from "./pages/SubDomain.page";

function App() {
  return (
    <div className="App">
      {" "}
      {/* Routes */}{" "}
      <Routes>
        <Route exact path="/" element={<Login />} />{" "}
        <Route exact path="/event" element={<Event />} />{" "}
        <Route exact path="/domain" element={<Domain />} />{" "}
        <Route exact path="/certificates-preview" element={<Preview />} />{" "}
        <Route exact path="/upload-winners" element={<Upload />} />{" "}
        <Route exact path="/subdomain" element={<Subdomain />} />{" "}
      </Routes>{" "}
    </div>
  );
}

export default App;
