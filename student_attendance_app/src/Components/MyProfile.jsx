import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MyProfile(props) {
  document.title = "MyProfile - Student Attendance App";
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">MyProfile {props.WIP_text}</div>
    </>
  );
}
