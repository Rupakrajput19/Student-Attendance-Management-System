import { React, useState, useEffect } from "react";
import registration_image from "../Images/registration_image.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Variables } from "../Variables";
import { APIs } from "../APIs";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { Ring } from "../Ring";
import moment from "moment";
import dayjs from "dayjs";

function EditUsers(props) {
  document.title = `Edit - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const location = useLocation();
  const userData = location.state.UserData;
  console.log(userData);
  const UserDetail = {
    userId: userData.UserID,
    name: userData.Name,
    userName: userData.UserName,
    email: userData.Email,
    mobile: userData.Mobile,
    password: userData.Password,
    confirmPassword: userData.ConfirmPassword,
    isAdmin: userData.IsAdmin,
    isStudent: userData.IsStudent,
  };

  const isdisable = UserDetail.isStudent;
  const [details, setDetails] = useState(UserDetail);
  const [errors, setErrors] = useState({});
  const [isAdmins, setActive] = useState(UserDetail.isAdmin);
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onStudentCheckboxClick = () => {
    // window.alert(`This action is not allowed! \n restricted by the admin`);
    swal({
      title: "This action is not allowed!",
      text: "Restricted by the admin",
      icon: "error",
      timer: 2000,
    });
  };

  const onCheckboxClick = () => {
    const checked = document.getElementById("isAdmin").checked;
    const checkbox_text = document.getElementById("checkbox_text");
    if (checked) {
      // when checked box is checked
      setActive(true);
      // checkbox_text.innerHTML = "";
    } else {
      // when checked box is unchecked
      setActive(false);
      // checkbox_text.innerHTML = "User is Not Admin";
    }
  };

  const checkErrors = (InputValues) => {
    let errors = {};
    let nam = InputValues.name.trim();
    let eml = InputValues.email.trim();
    let mob = InputValues.mobile.trim();
    let usr = InputValues.userName.trim();
    let pass = InputValues.password.trim();
    let cpass = InputValues.confirmPassword.trim();

    let validEmail = eml.match(Variables.EmailRegex);
    let validPassword = pass.match(Variables.PasswordRegex);

    if (nam === "") {
      errors.name = "Please Enter Full Name!";
    } else if (nam.length < 3 || nam.length > 30) {
      errors.name = "Please Enter Name Between 3-30 Characters!";
    } else if (!isNaN(nam)) {
      errors.name = "Only Characters Allowed In Name!";
    } else if (eml === "") {
      errors.email = "Please Enter Email!";
    } else if (!validEmail) {
      errors.email = "Enter Valid Email! ex:abc@gmail.com";
    } else if (mob === "") {
      errors.mobile = "Please Enter Mobile No.!";
    } else if (isNaN(mob)) {
      errors.mobile = "Only No. Allowed In Mobile!";
    } else if (mob.length < 10 || mob.length > 12) {
      errors.mobile = "Please Enter 10-12 Digits No.!";
    } else if (usr === "") {
      errors.userName = "Please Enter Your Username";
    } else if (usr.length < 5 || usr.length > 15) {
      errors.userName = "Username Should be in 5-15 Characters";
    } else if (pass === "") {
      errors.password = "Please Enter Password!";
    } else if (!validPassword) {
      errors.password =
        "Password must be in 8 - 20 character and containt atleast 1 Number, 1 Uppercase , 1 Lowercase & 1 Special character!";
    } else if (cpass === "") {
      errors.confirmPassword = "Please Enter Confirm Password!";
    } else if (!(cpass === pass)) {
      errors.confirmPassword =
        "Confirm Password Must Be Same As Above Password!";
    }
    setErrors(errors);
    return Object.entries(errors).length > 0;
  };

  const InputChange = (events) => {
    const { name, value } = events.target;
    const tempDetails = { ...details, [name]: value };
    setDetails(tempDetails);
    checkErrors(details);
  };

  const onSubmitClick = (events) => {
    const { userId, name, userName, email, mobile, password, confirmPassword } =
      details;
    const isAdmin = isAdmins;
    const isStudent = UserDetail.isStudent;

    events.preventDefault();

    if (!checkErrors(details)) {
      console.log("details:--", details);
      console.log("isAdmin value:--", isAdmin);
      setIsLoading(true);
      axios
        .put(APIs.USER, {
          userId,
          name,
          userName,
          email,
          mobile,
          password,
          confirmPassword,
          isAdmin,
          isStudent,
        })
        .then((response) => {
          console.log("Response from backend -> ", response);
          if (
            response.data == "Users Updated Successfully" &&
            response.status == 200
          ) {
            swal({
              title: `${response.data}`,
              text: `User Id - ${userId}`,
              icon: "success",
              timer: 1500,
            });
            Navigator("/usersList", { replace: "true" });
          }
        })
        .catch((errors) => {
          swal({
            title: `Something went wrong: ${errors}`,
            text: "Unable to get response from backend, please try again later!",
            icon: "error",
            timer: 2000,
          });
        });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Ring />}
      {!isLoading && (
        <div>
          <Header />

          <Sidebar />

          <Typography variant="h4" component="div" className="typographyText">
            Edit User Details
          </Typography>
          <div className="contactUsPageText">
            <marquee behavior="alternate" direction="left">
              <p>
                If User is Student then the user details can not be editable due to
                security issue, Please contact to your administrator for more details!
              </p>
            </marquee>
          </div>
          <div className="student_form container_box">
            <Box
              className="registration_form"
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="UserId"
                type="number"
                name="UserId"
                label="User Id"
                variant="outlined"
                className="input_field"
                defaultValue={details.userId}
                disabled
                focused
              />
              <TextField
                id="Name"
                type="text"
                name="name"
                label="Full Name "
                variant="outlined"
                className="input_field"
                required
                defaultValue={details.name}
                // defaultValue={name}
                onChange={InputChange}
                disabled={isdisable}
                focused
              />
              {errors.name ? <p className="clear_error">{errors.name}</p> : ""}
              <TextField
                id="userName"
                type="text"
                name="userName"
                label="userName"
                variant="outlined"
                className="input_field"
                required
                defaultValue={details.userName}
                // defaultValue={userName}
                onChange={InputChange}
                focused
                disabled
              />
              {errors.userName ? (
                <p className="clear_error">{errors.userName}</p>
              ) : (
                ""
              )}
              <TextField
                id="Email"
                type="email"
                name="email"
                label="Email ID"
                variant="outlined"
                className="input_field"
                required
                defaultValue={details.email}
                // defaultValue={email}
                onChange={InputChange}
                focused
                disabled
              />
              {errors.email ? (
                <p className="clear_error">{errors.email}</p>
              ) : (
                ""
              )}
              <Button
                variant="contained"
                id="submit_btn"
                onClick={() => {
                  // setDetails(intitial);
                  Navigator("/usersList", { replace: "true" });
                }}
              >
                Cancel
              </Button>
            </Box>

            <Box
              className="registration_form"
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="Mobile"
                type="tel"
                name="mobile"
                label="Mobile"
                variant="outlined"
                className="input_field"
                required
                defaultValue={details.mobile}
                // defaultValue={mobile}
                onChange={InputChange}
                disabled
                focused
              />
              {errors.mobile ? (
                <p className="clear_error">{errors.mobile}</p>
              ) : (
                ""
              )}
              <TextField
                id="Password"
                type="text"
                name="password"
                label="Password"
                variant="outlined"
                className="input_field"
                defaultValue={details.password}
                required
                onChange={InputChange}
                disabled={isdisable}
              />
              {errors.password ? (
                <p className="clear_error">{errors.password}</p>
              ) : (
                ""
              )}
              <TextField
                id="confirmPassword"
                type="text"
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                className="input_field"
                required
                defaultValue={details.confirmPassword}
                onChange={InputChange}
                disabled={isdisable}
              />
              {errors.confirmPassword ? (
                <p className="clear_error">{errors.confirmPassword}</p>
              ) : (
                ""
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    // checked={details.isAdmin}
                    defaultChecked={details.isAdmin}
                    id="isAdmin"
                    name="isAdmin"
                    // color="primary"
                    sx={{
                      color: "red",
                      "&.Mui-checked": {
                        color: "blue",
                      },
                    }}
                  />
                }
                label="Is User Admin ?"
                onChange={onCheckboxClick}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    // defaultChecked={details.isStudent}
                    checked={details.isStudent}
                    id="isStudent"
                    name="isStudent"
                    // color="primary"
                    sx={{
                      color: "red",
                      "&.Mui-checked": {
                        color: "blue",
                      },
                    }}
                  />
                }
                label="Is User Student ?"
                onClick={onStudentCheckboxClick}
              />
              {/* <p className="clear_errors" id="checkbox_text">
                Is User Active ?
              </p> */}
              <Button
                variant="contained"
                id="submit_btn"
                onClick={onSubmitClick}
              >
                Save
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUsers;
