import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function ContactUs(props) {
  document.title = "Contact Us - Student Attendance App";
  return (
    <>
      <Header />
      <Sidebar />

      <div className="WIP_text">Contact Us {props.WIP_text}</div>

      <div style={{ marginLeft: '0 2px 0 222px',background: 'lightgreen' }}>
        <marquee behavior="alternate" direction="">
        <b><u>Contact No.</u> 9599408303, 7065308276</b>
        </marquee>
      </div>
    </>
  );
}
