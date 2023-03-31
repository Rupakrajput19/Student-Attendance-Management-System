import React, { useState } from "react";
import { Ring } from "../Ring";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Events(props) {
  document.title = `Events - ${props.pageTitle}`;

  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
    {isLoading && <Ring />}
    {!isLoading && 
    <div>
      <Header />

      <Sidebar />
      
      <div className="WIP_text">Events {props.WIP_text}</div>
      <Ring />
      </div>
    }
    </>
  );
}
