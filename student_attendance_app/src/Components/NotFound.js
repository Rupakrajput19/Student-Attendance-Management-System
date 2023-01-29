import React from 'react';
import { Link } from 'react-router-dom';
 
const style_notfound = {
        color:"black",
        textAlign:"center",
        margin:"100px auto"      
  };


function NotFound(props) {
  document.title = `😒Page Not Found - ${props.pageTitle}`;
  return (
    <div style={style_notfound}>
      <h1>OOPS!</h1 >
      <br />
      <h1 >404 Page Not Found!</h1>
      <br />
      <h4>The page are you looking for that is not available or doesn't exist on this websites,for to go main application click on <span><Link to="/" className="login_btn" style={{color:"White", textDecoration:"underline"}}>
              Login
            </Link></span></h4> 
    </div>
  );
}

export default NotFound;
