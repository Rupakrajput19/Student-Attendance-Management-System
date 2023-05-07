import React, { useState } from "react";
import { Ring } from "../Ring";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function ContactUs(props) {
  document.title = `Contact Us - ${props.pageTitle}`;

  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <>
    {isLoading && <Ring />}
    {!isLoading && 
    <div>
      <Header />
      <Sidebar />

      <div className="WIP_text">Contact Us {props.WIP_text}</div>
      <Ring />
      <div className="contactUsPageText">
        <marquee behavior="alternate" direction="">
          <b>
            <u>Contact No</u> 9599408303, 7065308276 & <u>Email Adderess</u> - "
            ritukumar456061@gmail.com "
          </b>
        </marquee>
      </div>
      </div>
      }
    </>
  );
}
