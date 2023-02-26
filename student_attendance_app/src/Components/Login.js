import { React, useEffect, useState } from "react";
import registration_image from "../Images/registration_image.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios, {isCancel, AxiosError} from 'axios';
import { APIs } from "../APIs";
import { Variables } from "../Variables";
import ForgotPassword from "./ForgotPassword";

function Login(props) {
  document.title = `Login - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const intitial = {
    username: "",
    password: "",
    // email: ""
  };
  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});

  const Errors_check = (InputValues) => {
    let errors = {};

    if (InputValues.username.trim() === "") {
      errors.username = "Please Enter Your Username or Email!";
    }

    let inputPassword = InputValues.password.trim();
    let validPassword = inputPassword.match(Variables.PasswordRegex);

    if (InputValues.password.trim() === "") {
      errors.password = "Please Enter Your Password!";
    } else if (!validPassword) {
      errors.password =
        "Password must be in 8 - 20 character and containt atleast 1 Number, 1 Uppercase , 1 Lowercase & 1 Special character!";
    }

    setErrors(errors);
    return Object.entries(errors).length > 0;
  };

  const InputChange = (events) => {
    const { name, value } = events.target;
    const tempDetails = { ...details, [name]: value };
    setDetails(tempDetails);
    Errors_check(details);
  };

  const onSubmitClick = (events) => {
    const { username, password } = details;
    events.preventDefault();
    console.log("details:--", details);

    if (!Errors_check(details)) {
      axios.post(APIs.LOGIN , { username, password })
        .then((result) => {
          console.log("Response from backend -> ", result);
          if (result.data.length == 1 && result.status == 200) {
            if((result.data[0].UserName == username || result.data[0].Email == username) && (result.data[0].Password == password)){
              Navigator("/home", { replace: true });
            }
          console.log(`UserID:-> ${result.data[0].UserID} \n
                      Name:-> ${result.data[0].Name} \n
                      UserName:-> ${result.data[0].UserName} \n
                      Mobile:-> ${result.data[0].Mobile} \n
                      Email:-> ${result.data[0].Email} \n
                      Password:-> ${result.data[0].Password} \n
                      IsAdmin:-> ${result.data[0].IsAdmin}
                      `);
          } else {
            setDetails(intitial);
            return swal({
              title: "Login Failed!",
              text: "Invalid login credentials ... \n If you are new user please signup/registered your self.",
              icon: "error",
              button: "Try Again",
            });
          }
        })
        .catch((error) => {
          swal({
            title: `Something went wrong: ${error}`,
            text: "Unable to get response from backend, please try again later!",
            icon: "error",
          });
        });
    }
  };

  return (
    <>
      <div className="home_style">
        <img
          src={registration_image}
          alt="Registration Img"
          className="registration_img"
        />
        <Box
          className="registration_form"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography id="text_home_regis">Welcome!</Typography>
          <Typography id="text_home">
            {props.PageTitle} to your portal
          </Typography>
          <TextField
            id="Username"
            type="text"
            name="username"
            label="Username or UserID or Email"
            variant="outlined"
            className="input_field"
            value={details.username}
            required
            onChange={InputChange}
          />
          {errors.username ? (
            <p className="clear_error">{errors.username}</p>
          ) : (
            ""
          )}
          <TextField
            id="Password"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            className="input_field"
            value={details.password}
            required
            onChange={InputChange}
          />
          {errors.password ? (
            <p className="clear_error">{errors.password}</p>
          ) : (
            ""
          )}

          <Button variant="contained" id="submit_btn" onClick={onSubmitClick}>
            Login
          </Button>
            <ForgotPassword />
          <Typography className="login_link">
            <p>Don't have an account?</p>
            <Link to="/Signup" className="login_btn">
              SignUp
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default Login;
