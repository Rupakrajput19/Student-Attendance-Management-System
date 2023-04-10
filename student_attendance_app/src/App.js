import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import AttendanceList from "./Components/AttendanceList";
import Attendance from "./Components/Attendance";
import StudentForm from './Components/StudentForm';
import EditStudentForm from "./Components/EditStudents";
import Footer from "./Components/Footer";
import NotFound from "./Components/NotFound";

import ContactUs from "./Components/ContactUs";
import Events from "./Components/Events";
import Marksheet from "./Components/Marksheet";
import MyProfile from "./Components/MyProfile";
import StudentsList from "./Components/StudentsList";
import ForgotPassword from "./Components/ForgotPassword";
import UsersList from "./Components/UsersList";
import EditUsers from "./Components/EditUsers";

const pageTitle = "Student Attendance Management System";
const text = "Page is in Progress...";
const textFuture = `${text} , I will Add this Functionality In Future`;
function App() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login PageTitle='Login' pageTitle={pageTitle}/>} />
          <Route exact path="/login" element={<Login PageTitle='Login'  pageTitle={pageTitle}/>} />
          <Route exact path="/Signup" element={<SignUp PageTitle='Registered'  pageTitle={pageTitle}/>} />
          <Route exact path="/home" element={<Home pageTitle={pageTitle}/>} />
          <Route exact path="/attendanceList" element={<AttendanceList   pageTitle={pageTitle}/>} />
          <Route exact path="/form" element={<StudentForm pageTitle={pageTitle}/>} />
          <Route exact path="/editStudent/:StudentID" element={<EditStudentForm   pageTitle={pageTitle}/>} />
          {/* <Route exact path="/forgotPassword" element={<ForgotPassword  pageTitle={pageTitle}/>} /> */}
          <Route exact path="/usersList" element={<UsersList pageTitle={pageTitle}/>} />
          <Route exact path="/editUser/:UserID" element={<EditUsers pageTitle={pageTitle}/>} />
          {/* <Route exact path="/attendance" element={<Attendance pageTitle={pageTitle}/>} /> */}


          <Route exact path="/profile" element={<MyProfile WIP_text={text}  pageTitle={pageTitle}/>} />
          <Route exact path="/studentList" element={<StudentsList WIP_text={text}  pageTitle={pageTitle}/>} />
          <Route exact path="/marksheet" element={<Marksheet WIP_text={textFuture}  pageTitle={pageTitle}/>} />
          <Route exact path="/events" element={<Events WIP_text={textFuture}  pageTitle={pageTitle}/>} />
          <Route exact path="/contactUs" element={<ContactUs WIP_text={text}  pageTitle={pageTitle}/>} />
          
          <Route path="*" element={<NotFound  pageTitle={pageTitle}/>} />
        </Routes>
      <Footer pageTitle={pageTitle}/>
    </>
  );
}

export default App;
