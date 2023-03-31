import React from "react";
import { Ring } from "../Ring";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Marksheet(props) {
  document.title = `Marksheet - ${props.pageTitle}`;
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">Marksheet {props.WIP_text}</div>
      <Ring />
    </>
  );
}
