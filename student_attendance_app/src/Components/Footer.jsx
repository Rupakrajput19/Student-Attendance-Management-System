import React from "react";

const f_style = {
  color: "black",
  fontSize: "medium",
  textAlign: "center",
};

const time = new Date();
const current_year = time.getFullYear();

function Footer() {
  return (
    <>
    <div style={f_style}>
      <footer>
        <br />
        <br />
        Design and Developed by :-- <b> Ritu Kumar ( "Rupak Rajput" )</b>
        <div className="social-media">
          <a
            href="https://www.instagram.com/rupakrajput161/"
            target="_blank"
            className="fa fa-instagram"
          ></a>
          <a
            href="https://github.com/Rupakrajput19"
            target="_blank"
            className="fa fa-github"
          ></a>
          <a
            href="https://mobile.twitter.com/RupakRajput10"
            target="_blank"
            className="fa fa-twitter"
          ></a>
          <a
            href="https://www.linkedin.com/in/ritu-kumar-a0a5aa1b2"
            target="_blank"
            className="fa fa-linkedin"
          ></a>
          <a
            href="https://m.facebook.com/100016564753676/"
            target="_blank"
            className="fa fa-facebook"
          ></a>
          <a
            href="https://youtube.com/channel/UCvmxiRqoHxKCimgpvIxTaFw"
            target="_blank"
            className="fa fa-youtube"
          ></a>
        </div>
        Student Attendance Management System &copy; {current_year}
      </footer>
    </div>
    </>
  );
}

export default Footer;
