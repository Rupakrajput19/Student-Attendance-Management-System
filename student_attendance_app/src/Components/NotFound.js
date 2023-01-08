import React from 'react';
import { Link } from 'react-router-dom';
 
const style_notfound = {
        color:"black",
        textAlign:"center",
        margin:"100px auto"      
  };


function NotFound() {
  document.title = "😒Page Not Found - Student Attendance Management System";
  return (
    <div style={style_notfound}>
      <h1>OOPS!</h1 >
      <br />
      <h1 >404 Page Not Found!</h1>
      <br />
      <h4>The page are you looking for that is not available or doesn't exist on this websites,for to go main application click on <span><Link to="/" id="login_btn" style={{color:"White", textDecoration:"underline"}}>
              Login
            </Link></span></h4>
    </div>
  );
}

export default NotFound;
