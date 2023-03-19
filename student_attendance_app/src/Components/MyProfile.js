import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Ring } from "../Ring";

export default function MyProfile(props) {
  document.title = `MyProfile - ${props.pageTitle}`;
  return (
    <>
      <Header />
      <Sidebar />
      <div className="WIP_text">MyProfile {props.WIP_text}
      <Ring />
      </div>
    </>
  );
}
