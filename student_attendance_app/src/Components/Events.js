import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Events(props) {
  document.title = `Events - ${props.pageTitle}`;
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">Events {props.WIP_text}</div>
    </>
  );
}
