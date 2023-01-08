import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Marksheet(props) {
  document.title = "Marksheet - Student Attendance Management System";
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">Marksheet {props.WIP_text}</div>
    </>
  );
}
