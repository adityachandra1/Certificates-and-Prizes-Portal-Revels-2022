import "./App.css";
import Login from "./pages/login.page";
import { Routes, Route } from "react-router-dom";
import Event from "./pages/Event.page";
import Preview from './pages/Preview.page';

function App() {
  return (
    <div className="App">
      
      {/* Routes */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/event" element={<Event />} />
        <Route exact path="/certificates-preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
