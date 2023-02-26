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

function SignUp(props) {
  document.title = `SignUp - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const intitial = {
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});
  
  const Errors_check = (InputValues) => {
    let errors = {};
    let nam = InputValues.name.trim();
    let eml = InputValues.email.trim();
    let mob = InputValues.mobile.trim();
    let usr = InputValues.username.trim();
    let pass = InputValues.password.trim();
    let cpass = InputValues.confirmPassword.trim();

    if (nam === "") {
      errors.name = "Please Enter Full Name!";
    } else if (nam.length < 3 || nam.length > 30) {
      errors.name = "Please Enter Name Between 3-30 Characters!";
    } else if (!isNaN(nam)) {
      errors.name = "Only Characters Allowed In Name!";
    }

    let validEmail = eml.match(Variables.EmailRegex);

    if (eml === "") {
      errors.email = "Please Enter Email!";
    } else if (!validEmail) {
      errors.email = "Enter Valid Email! ex:abc@gmail.com";
    }

    if (mob === "") {
      errors.mobile = "Please Enter Mobile No.!";
    } else if (isNaN(mob)) {
      errors.mobile = "Only No. Allowed In Mobile!";
    } else if ((mob.length < 10) || (mob.length > 12)) {
      errors.mobile = "Please Enter 10-12 Digits No.!";
    }

    if (usr === "") {
      errors.username = "Please Enter Your Username";
    } else if ((usr.length < 5) || (usr.length > 10)) {
      errors.username = "Username Should be in 5-10 Characters";
    }

    let validPassword = pass.match(Variables.PasswordRegex);

    if (pass === "") {
      errors.password = "Please Enter Password!";
    } else if (!validPassword) {
      errors.password =
        "Password must be in 8 - 20 character and containt atleast 1 Number, 1 Uppercase , 1 Lowercase & 1 Special character!";
    }

    if (cpass === "") {
      errors.confirmPassword = "Please Enter Confirm Password!";
    } else if (!(cpass === pass)) {
      errors.confirmPassword = "Confirm Password Must Be Same As Above Password!";
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
    const { name, email, mobile, username, password, confirmPassword} = details;
    events.preventDefault();
    console.log("details:--", details);

  if(!Errors_check(details)){
    axios.post(APIs.USER , {name, email, mobile, username, password, confirmPassword})
    .then((response) => {
      debugger
      console.log("Response from backend -> ", response);
      if(response.data == "Users Successfully Registered" && response.status == 200){
        swal({
          title: "User Succesfully Registered",
          text: "Please Login with your Credentials!",
          icon: "success"
        });
        Navigator("/", {replace : "true"});
      }
      else if(response.data == "User Already Registered" || response.data == "Email Already Registered" && response.status == 200){
        swal({
          title: `${response.data}!`,
          text: `${response.data} with us, please login with your registered details or you can forgot your password!`,
          icon: "error"
        });
      }
      // else{
      //   swal({
      //     title: "Something went wrong!",
      //     text: "Unable to get response from backend, please try again later!",
      //     icon: "error"
      //   });
      // }
    })
    .catch((errors) => {
      swal({
        title: `Something went wrong: ${errors}`,
        text: "Unable to get response from backend, please try again later!",
        icon: "error"
      });
      // debugger
      // alert(`Something went wrong: ${errors}`);
      // alert(`Something went wrong: ${errors.response.data}`);
      // alert(`Something went wrong: ${errors.request.response}`);
      // alert(`Something went wrong: ${errors.request.responseText}`);
    })
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
          <Typography id="text_home">{props.PageTitle} at portal</Typography>
          <TextField
            id="Name"
            type="name"
            name="name"
            label="Name "
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.name ? <p className="clear_error">{errors.name}</p> : ""}
          <TextField
            id="Email"
            type="email"
            name="email"
            label="Email ID"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.email ? <p className="clear_error">{errors.email}</p> : ""}
          <TextField
            id="Mobile"
            type="tel"
            name="mobile"
            label="Mobile"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.mobile ? <p className="clear_error">{errors.mobile}</p> : ""}
          <TextField
            id="Username"
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            className="input_field"
            value={details.username}
            required
            onChange={InputChange}
          />
          {errors.username ? (<p className="clear_error">{errors.username}</p>) : ("")}
          <TextField
            id="Password"
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.password ? (
            <p className="clear_error">{errors.password}</p>) : ("")}
          <TextField
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.confirmPassword ? (
            <p className="clear_error">{errors.confirmPassword}</p>) : ("")}
          <Button variant="contained" id="submit_btn" onClick={onSubmitClick}>
            Submit
          </Button>
          <Typography className="login_link">
            <p>Already have an account?</p>
            <Link to="/login" className="login_btn">
              Login
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default SignUp;