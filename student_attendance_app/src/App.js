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
import EventsList from "./Components/EventsList";
import Marksheet from "./Components/Marksheet";
import MyProfile from "./Components/MyProfile";
import StudentsList from "./Components/StudentsList";
import ForgotPassword from "./Components/ForgotPassword";
import UsersList from "./Components/UsersList";
import EditUsers from "./Components/EditUsers";
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { loadUserFromStorage } from "./Redux/userActions";

const pageTitle = "Student Attendance Management System";
const text = "Page is in Progress...";
const textFuture = `${text} , I will Add this Functionality In Future`;
const textForStudents = "If You Are Student Then You Can Direct Login For Dashboard, For Login Details Please Contact Administrator!";
function App() {
  
  const dispatch = useDispatch();
  
  // useEffect(() => {
    dispatch(loadUserFromStorage());
  // }, []);

  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login PageTitle='Login' pageTitle={pageTitle} textForStudents={textForStudents}/>} />
          <Route exact path="/login" element={<Login PageTitle='Login'  pageTitle={pageTitle} textForStudents={textForStudents}/>} />
          <Route exact path="/Signup" element={<SignUp PageTitle='Registered'  pageTitle={pageTitle} textForStudents={textForStudents}/>} />
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
          <Route exact path="/eventsList" element={<EventsList WIP_text={textFuture}  pageTitle={pageTitle}/>} />
          <Route exact path="/contactUs" element={<ContactUs WIP_text={text}  pageTitle={pageTitle}/>} />
          
          <Route path="*" element={<NotFound  pageTitle={pageTitle}/>} />
        </Routes>
      <Footer pageTitle={pageTitle}/>
    </>
  );
}

export default App;
