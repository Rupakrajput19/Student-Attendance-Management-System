import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Attendance from "./Components/Attendance";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";

function App() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login PageTitle='Login'/>} />
          <Route exact path="/login" element={<Login PageTitle='Login'/>} />
          <Route exact path="/Signup" element={<SignUp PageTitle='Registered'/>} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/attendance" element={<Attendance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
