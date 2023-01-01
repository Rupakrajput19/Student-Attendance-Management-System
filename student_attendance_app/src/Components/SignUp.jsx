import { React, useState } from "react";
import registration_image from "../Images/registration_image.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  document.title = "SignUp - Student Attendance App";
  const Navigator = useNavigate();
  const intitial = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  };
  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});
  
  const onSubmitClick = (events) => {
    const { name, email, mobile, password} = details;
    events.preventDefault();
    console.log("details:--", details);

    if(!Errors_check(details)){
    Navigator("/", {replace : "true"});
  }
};

  const Errors_check = (InputValues) => {
    let errors = {};

    if (InputValues.name === "") {
      errors.name = "Please Enter Full Name!";
    } else if (InputValues.name.length < 3 || InputValues.name.length > 30) {
      errors.name = "Please Enter Name Between 3-30 Characters!";
    } else if (!isNaN(InputValues.name)) {
      errors.name = "Only Characters Allowed In Name!";
    }

    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let trueEmail = InputValues.email;
    let validEmailregex = trueEmail.match(emailregex);

    if (InputValues.email === "") {
      errors.email = "Please Enter Email!";
    } else if (!validEmailregex) {
      errors.email = "Enter Valid Email! ex:abc@gmail.com";
    }

    if (InputValues.mobile === "") {
      errors.mobile = "Please Enter Mobile No.!";
    } else if (isNaN(InputValues.mobile)) {
      errors.mobile = "Only No. Allowed In Mobile!";
    } else if ((InputValues.mobile.length < 10) || (InputValues.mobile.length > 12)) {
      errors.mobile = "Please Enter 10-12 Digits No.!";
    }

    let passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#.$!^%*?&]{8,20}$/;
    let truePassword = InputValues.password;
    let validPassregex = truePassword.match(passwordregex);

    if (InputValues.password === "") {
      errors.password = "Please Enter Password!";
    } else if (!validPassregex) {
      errors.password =
        "Password must be in 8 - 20 character and containt atleast 1 Number, 1 Uppercase , 1 Lowercase & 1 Special character!";
    }

    if (InputValues.confirm_password === "") {
      errors.confirm_password = "Please Enter Confirm Password!";
    } else if (!(InputValues.confirm_password === InputValues.password)) {
      errors.confirm_password = "Confirm Password Must Be Same As Above Password!";
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
            id="name"
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
            id="email"
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
            id="mobile"
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
            id="password"
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
            id="confirm_password"
            type="password"
            name="confirm_password"
            label="Confirm Password"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.confirm_password ? (
            <p className="clear_error">{errors.confirm_password}</p>) : ("")}
          <Button variant="contained" id="submit_btn" onClick={onSubmitClick}>
            Submit
          </Button>
          <Typography className="login_link">
            <p>Already have an account?</p>
            <Link to="/login" id="login_btn">
              Login
            </Link>
          </Typography>
        </Box>
      </div>
    </>
  );
}

export default SignUp;