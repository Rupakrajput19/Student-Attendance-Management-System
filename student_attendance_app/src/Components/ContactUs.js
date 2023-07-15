import React, { useState } from "react";
import { Ring } from "../Ring";
import Header from "./Header";
import Sidebar from "./Sidebar";
import emailIcon from "../Images/email-icon.png";
import phoneIcon from "../Images/phone-icon.png";

export default function ContactUs(props) {
  document.title = `Contact Us - ${props.pageTitle}`;

  // const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {/* {isLoading && <Ring />}
    {!isLoading &&  */}
      <div>
        <Header />
        <Sidebar />

        <div className="contact-us-container">
          <h1>Contact Us</h1>
          <p>
            For any inquiries or assistance, please feel free to reach out to us
            via email or phone.
          </p>
          <div className="contact-details">
            <div className="contact-info">
              <a href="tel:+919599408303">
                <img src={phoneIcon} alt="Phone" className="contact-icon" />
              </a>
              <div className="contact-text">
                <h3>Phone:</h3>
                <p>+91-9599408303 || +91-7065308276</p>
              </div>
            </div>
            <div className="contact-info">
              <a href="mailto:ritukumar456061@gmail.com">
                <img src={emailIcon} alt="Email" className="contact-icon" />
              </a>
              <div className="contact-text">
                <h3>Email:</h3>
                <p>ritukumar456061@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="WIP_text">Contact Us {props.WIP_text}</div>
      <div className="contactUsPageText">
        <marquee behavior="alternate" direction="">
          <b>
            <u>Contact No</u> 9599408303, 7065308276 & <u>Email Adderess</u> - "
            ritukumar456061@gmail.com "
          </b>
        </marquee>
      </div>*/}
      </div>
      {/* } */}
    </>
  );
}
