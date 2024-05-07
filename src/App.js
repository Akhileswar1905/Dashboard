import Signup from "./components/SignUp/Signup";
import "./App.css";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
