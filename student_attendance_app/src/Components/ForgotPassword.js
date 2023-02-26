import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { APIs } from "../APIs";
import { Variables } from "../Variables";
import axios, {isCancel, AxiosError} from 'axios';

export default function ForgotPassword(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const intitial = {
    userInput: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  };

  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});


  const Errors_check = (InputValues) => {
    let errors = {};
    let inp = InputValues.userInput.trim();
    let mob = InputValues.mobile.trim();
    let pass = InputValues.password.trim();
    let cpass = InputValues.confirmPassword.trim();

    if (inp === "") {
      errors.userInput = "Please Enter Your Registered Username or Email!";
    }

    if (mob === "") {
      errors.mobile = "Please Enter Your Registered Phone!";
    } else if (isNaN(mob)) {
      errors.mobile = "Only No. Allowed In Mobile!";
    } else if ((mob.length < 10) || (mob.length > 12)) {
      errors.mobile = "Please Enter 10-12 Digits No.!";
    }

    let validPassword = pass.match(Variables.PasswordRegex);

    if (pass === "") {
      errors.password = "Please Enter Your New Password!";
    } else if (!validPassword) {
      errors.password =
        "Password must be in 8 - 20 character and containt atleast 1 Number, 1 Uppercase , 1 Lowercase & 1 Special character!";
    }

    if (cpass === "") {
      errors.confirmPassword = "Please Enter Your Confirm Password!";
    } else if (!(cpass == pass)) {
      errors.confirmPassword = "Confirm Password Must Be Same As Above Password!";
    } 
  
    setErrors(errors);
    return Object.entries(errors).length > 0;
  };

  const InputChange = (events) => {
    const { name, value } = events.target;
    const InputDetails = { ...details, [name]: value };
    setDetails(InputDetails);
    Errors_check(details);
  };

  const onSubmitClick = (events) => {
    const { userInput, mobile, password, confirmPassword } = details;
    events.preventDefault();
    console.log("details:--", details);

    if (!Errors_check(details)) {
      debugger
      axios.put(APIs.FORGOTPASSWORD , { userInput, mobile, password, confirmPassword })
        .then((result) => {
          debugger
          console.log("Response from backend -> ", result);
          // if (result.data.length == 1 && result.status == 200) {
            // if(result.data[0].UserName == userInput || result.data[0].Email == userInput &&  result.data[0].Mobile == mobile){
              if(result.data == "Password Successfully Updated" && result.status == 200) {
                swal({
                  title: "Password Successfully Updated!",
                  text: "Please login with your given credentials",
                  icon: "success"
                })
            // setDetails(intitial);
              // swal({
              //   title: "Password Forgot Successfully!",
              //   text: `
              //   UserID: ${result.data[0].UserID}
              //   Name: ${result.data[0].Name}
              //   UserName: ${result.data[0].UserName}
              //   Mobile: ${result.data[0].Mobile}
              //   Email: ${result.data[0].Email}
              //   Password: ${result.data[0].Password}
              //   IsAdmin: ${result.data[0].IsAdmin}`,
              //   icon: "success",
              // });
          } else if (result.data == "Forgot Password Failed" && result.status == 200) {
            // setDetails(intitial);
            return swal({
              title: `${result.data}!`, 
              text: `No user found with entered \n Username/Email: "${userInput}", \n Phone No.: ${mobile} \n
              Notes: If you don't know your registered username and email then you need to contact on "9599408303 - ritukumar456061@gmail.com"`,
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
        setDetails(intitial);
        setOpen(false);
    }
  };
  return (
    <div>
      <Typography className="login_link">
        <span className="login_btn" onClick={handleClickOpen}>
          Forgot your password?
        </span>
      </Typography>
      <Dialog open={open}>
        {/* <DialogTitle>{props.pageTitle}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            To Forgot/Recover your password, please fill all required
            fields.
          </DialogContentText>
          <TextField
            required
            autoComplete="off"
            margin="dense"
            name="userInput"
            label="Username or Email"
            type="text"
            className="input_field"
            variant="standard"
            value={details.userInput}
            onChange={InputChange}
          />
          {errors.userInput ? (
          <p className="clear_errors">{errors.userInput}</p>
        ) : (
          ""
        )}
          <TextField
            required
            autoComplete="off"
            margin="dense"
            name="mobile"
            label="Phone"
            type="text"
            className="input_field"
            variant="standard"
            value={details.mobile}
            onChange={InputChange}
          />
          {errors.mobile ? (
          <p className="clear_errors">{errors.mobile}</p>
        ) : (
          ""
        )}
          <TextField
            required
            autoComplete="off"
            margin="dense"
            name="password"
            label="Password"
            type="text"
            className="input_field"
            variant="standard"
            value={details.password}
            onChange={InputChange}
          />
          {errors.password ? (
          <p className="clear_errors">{errors.password}</p>
        ) : (
          ""
        )}
          <TextField
            required
            autoComplete="off"
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            type="text"
            className="input_field"
            variant="standard"
            value={details.confirmPassword}
            onChange={InputChange}
          />
          {errors.confirmPassword ? (
          <p className="clear_errors">{errors.confirmPassword}</p>
        ) : (
          ""
        )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
