import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function StudentDetails(props) {
  document.title = "Student Details - Student Attendance Management System";
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">Student Details {props.WIP_text}</div>
    </>
  );
}
