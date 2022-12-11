import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Attendance from "./Components/Attendance";
import StudentForm from './Components/StudentForm';
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";

import ContactUs from "./Components/ContactUs";
import Events from "./Components/Events";
import Marksheet from "./Components/Marksheet";
import MyProfile from "./Components/MyProfile";
import StudentDetails from "./Components/StudentDetails";

function App() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login PageTitle='Login'/>} />
          <Route exact path="/login" element={<Login PageTitle='Login'/>} />
          <Route exact path="/Signup" element={<SignUp PageTitle='Registered'/>} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/attendance" element={<Attendance />} />
          <Route exact path="/form" element={<StudentForm />} />
          <Route path="*" element={<NotFound />} />

          <Route exact path="/profile" element={<MyProfile WIP_text='Page is in Progress...'/>} />
          <Route exact path="/student_details" element={<StudentDetails WIP_text='Page is in Progress...'/>} />
          <Route exact path="/marksheet" element={<Marksheet WIP_text='Page is in Progress... ,I will Add this Functionality In Future'/>} />
          <Route exact path="/events" element={<Events WIP_text='Page is in Progress... ,I will Add this Functionality In Future'/>} />
          <Route exact path="/contactUs" element={<ContactUs WIP_text='Page is in Progress...'/>} />
          
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
