import React, { useEffect } from 'react';      
import swal from "sweetalert";
import { APIs } from "../APIs";
import { gapi } from 'gapi-script';
import { Variables } from "../Variables";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userActions";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import axios, { isCancel, AxiosError } from "axios";

export default function Google() {

  const Navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({clientId: Variables.ClientId})
    });
    // console.log(gapi.auth.getToken().access_token);
  }, []);
  
  const onSuccess = (res) => {
    const userName = res.profileObj.email;
    const tokenId = res.tokenId; // Checking user detail at backend via tokenId
      axios
        .post(APIs.GoogleLogin, { tokenId })
        .then((result) => {
          const user = result.data[0];
          console.log("Response from backend -> ", result);
          if (result.data.length == 1 && result.status == 200) {
            if (result.data[0].Email == userName) {
              dispatch(login(user));
              Navigator("/home", { replace: true });
            }
            console.log(`UserID:-> ${result.data[0].UserID} \n
                      Name:-> ${result.data[0].Name} \n
                      UserName:-> ${result.data[0].UserName} \n
                      Mobile:-> ${result.data[0].Mobile} \n
                      Email:-> ${result.data[0].Email} \n
                      Password:-> ${result.data[0].Password} \n
                      IsAdmin:-> ${result.data[0].IsAdmin} \n
                      IsStudent:-> ${result.data[0].IsStudent}
                      StudentID:-> ${result.data[0].StudentID}
                      `);
          } else {
            return swal({
              title: "Login Failed!",
              text: "Invalid User... \n If you are new user please signup/registered your self.",
              icon: "error",
              timer: 2500,
              button: "Try Again",
            });
          }
        })
        .catch((error) => {
          swal({
            title: `Something went wrong: ${error}`,
            text: "Unable to get response from backend, please try again later!",
            icon: "error",
            timer: 2000,
          });
        });
}

const onFailure = (err) => {
    swal({
        title: "Unable Login with Goole",
        text: `${err.error}`,
        icon: "error",
      });
}
  return (
    <GoogleLogin
    clientId={Variables.ClientId}
    buttonText="Login with Google"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={'single_host_origin'}
    isGoogleLogin={true}
    />
  )
}
