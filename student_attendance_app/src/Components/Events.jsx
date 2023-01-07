import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Events(props) {
  document.title = "Events - Student Attendance Management System";
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">Events {props.WIP_text}</div>
    </>
  );
}
