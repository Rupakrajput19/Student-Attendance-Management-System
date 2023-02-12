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
import { variables } from "../Variables";

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

    if (InputValues.username === "") {
      errors.username = "Please Enter Your Username or ID!";
    }

    // let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let trueEmail = InputValues.email;
    // let validEmailregex = trueEmail.match(emailregex);

    // if (InputValues.email === "") {
    //   errors.username = "Please Enter Your Email ID!";
    // }
    // else if (!validEmailregex) {
    //   errors.email = "Enter Valid Email! ex:abc@gmail.com";
    // }

    // let passwordregex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#.$!^%*?&]{8,20}$/;
    // let truePassword = InputValues.password;
    // let validPassregex = truePassword.match(passwordregex);

    if (InputValues.password === "") {
      errors.password = "Please Enter Your Password!";
    } else if (InputValues.password.length < 5) {
      errors.password = "Password should be in min. 5 characters!";
    }
    // else if (!validPassregex) {
    //   errors.password =
    //     "Password must be in 8 - 20 character and containt atleast 1 Number, 1 Uppercase , 1 Lowercase & 1 Special character!";
    // }

    // let UserName = (InputValues.password == 'admin' || InputValues.password == 'Admin');
    // let PassWord = (InputValues.username == 'admin' || InputValues.username == 'Admin');
    // if(!(UserName && PassWord)){
    //   // debugger;
    //   // swal({
    //   //   title: "Invalid Login Details",
    //   //   text: "Please try again!" ,
    //   //   icon: "error",
    //   // });
    //   window.alert('Galat Hai');
    //   setDetails(intitial);
    // }

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
      // axios.post("backend url/login user", { username, password })
      //   .then((result) => {
      //     console.log("Response from backend -> ", result);
      //     if (result.data && result.data.success) {
      //       Navigator("/home", { replace: true });
      //     } else {
      //       setDetails(intitial);
      //       return swal({
      //         title: "Login Failed!",
      //         text: "Invalid login credentials... \n If you are new user please first registered your self.",
      //         icon: "error",
      //         button: "Try Again",
      //       });
      //     }
      //   })
      //   .catch((error) => {
      //     alert(`Something went wrong ${error}`);
      //   });
      Navigator("/home", { replace: true });
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
            label="Username or ID"
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
          {/* <TextField
            id="Email"
            type="email"
            name="email"
            label="Email ID"
            variant="outlined"
            className="input_field"
            value={details.email}
            required
            onChange={InputChange}
          />
          {errors.email ? <p className="clear_error">{errors.email}</p> : ""} */}
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
          <Typography className="login_link">
            <Link to="forget_password" className="login_btn">
              Forgot your password?
            </Link>
          </Typography>
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
