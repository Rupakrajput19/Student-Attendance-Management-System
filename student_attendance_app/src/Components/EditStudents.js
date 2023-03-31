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
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Variables } from "../Variables";
import { APIs } from "../APIs";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { Ring } from "../Ring";
import moment from "moment";
import dayjs from 'dayjs';

function StudentForm(props) {
  document.title = `Form - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const intitial = {
    name: "",
    email: "",
    className: "",
    addmissionDate: "",
    registrationId: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  };
  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [genders, setGender] = useState('');
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const Errors_check = (InputValues) => {
    let errors = {};
    // let inputEmail = InputValues.email.trim();
    // let validEmail = inputEmail.match(Variables.EmailRegex);

    var today = new Date();
    today = moment(today).format("YYYY-MM-DD");
    const dateExceededText = "Can't be Greater than Current Date!";

    // if (InputValues.name === "") {
    //   errors.name = "Please Enter Full Name!";
    // } else if (InputValues.name.length < 3 || InputValues.name.length > 30) {
    //   errors.name = "Please Enter Name Between 3-30 Characters!";
    // } else if (!isNaN(InputValues.name)) {
    //   errors.name = "Only Characters Allowed In Name!";
    // } else if (InputValues.registrationId === "") {
    //   errors.registrationId = "Please Enter Registration Id!";
    // } else if (InputValues.addmissionDate === "") {
    //   errors.addmissionDate = "Please Enter Addmission Date!";
    // } else if (InputValues.addmissionDate > today){
    //   errors.addmissionDate = `Addmission Date ${dateExceededText}`;
    // } else if (InputValues.className === "") {
    //   errors.className = "Please Enter Class Name!";
    // } else 
    // if (InputValues.mobile === "") {
    //   errors.mobile = "Please Enter Mobile No.!";
    // } else if (isNaN(InputValues.mobile)) {
    //   errors.mobile = "Only No. Allowed In Mobile!";
    // } else if (
    //   InputValues.mobile.length < 10 ||
    //   InputValues.mobile.length > 12
    // ) {
    //   errors.mobile = "Please Enter 10-12 Digits No.!";
    // } else 
    if (genders == undefined) {
      errors.gender = "Please Select Gender!";
    } 
    // else if (InputValues.email === "") {
    //   errors.email = "Please Enter Email!";
    // } else if (!validEmail) {
    //   errors.email = "Enter Valid Email! ex:abc@gmail.com";
    // } 
    else if (InputValues.dateOfBirth === "") {
      errors.dateOfBirth = "Please Enter Date of Birth!";
    } 
    // else if (InputValues.dateOfBirth == InputValues.addmissionDate) {
    //   errors.dateOfBirth = "Date of Birth and Addmission Date Can't be Same";
    //   errors.addmissionDate = "Addmission Date and Date of Birth Can't be Same";
    // } 
    else if (InputValues.dateOfBirth >= today){
      errors.dateOfBirth = `Date of Birth  ${dateExceededText}`;
    } else if (InputValues.fatherName === "") {
      errors.fatherName = "Please Enter Father Name!";
    } else if (InputValues.motherName === "") {
      errors.motherName = "Please Enter Mother Name!";
    } else if (InputValues.address === "") {
      errors.address = "Please Enter Address!";
    } else if (InputValues.city === "") {
      errors.city = "Please Enter City!";
    } else if (InputValues.state === "") {
      errors.state = "Please Enter State!";
    } else if (InputValues.country === "") {
      errors.country = "Please Enter Country!";
    } else if (InputValues.pincode === "") {
      errors.pincode = "Please Enter Pincode!";
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

  const handleChange = (event) => {
    setGender(event.target.value);
    const { name, value } = event.target;
    const genderValue = { [name]: value };
    console.log("gender:--", genderValue);
  };

  const onSubmitClick = (events) => {
    const {
      StudentID,
      Name,
      Email,
      Mobile,
      ClassName,
      DateOfBirth,
      AddmissionDate,
      RegistrationID,
      FatherName,
      MotherName,
      Address,
      City,
      State,
      Country,
      Pincode,
    } = details;
    const Gender = genders;

    events.preventDefault();

    if (!Errors_check(details)) {
      console.log("details:--", details);
      console.log("gender value:--", Gender);
      setIsLoading(true);
      axios
        .put(APIs.STUDENTS, {
          StudentID,
          Name,
          Email,
          Mobile,
          ClassName,
          Gender,
          DateOfBirth,
          AddmissionDate,
          RegistrationID,
          FatherName,
          MotherName,
          Address,
          City,
          State,
          Country,
          Pincode
        })
        .then((response) => {
          console.log("Response from backend -> ", response);
          if (
            response.data == "Student Succesfully Updated" &&
            response.status == 200
          ) {
            swal({
              title: `${response.data}`,
              // text: "!",
              icon: "success",
              timer: 1500,
            });
            Navigator("/student_details", { replace: "true" });
          } 
        })
        .catch((errors) => {
          swal({
            title: `Something went wrong: ${errors}`,
            text: "Unable to get response from backend, please try again later!",
            icon: "error",
            timer: 1500,
          });
        });
        setIsLoading(false);
    }
  };


  const studentid = 5; //need to get studentId

  useEffect(() => {
    axios
    .post(APIs.MYPROFILE, {
      studentid
    })
    .then((response) => {
        // debugger
        const fullrecords = response.data;
        const records = fullrecords[0];
        setDetails(records);
        setGender(records.Gender);
        console.log("Data->", response.data);
        console.log("type of data -> ", typeof response.data);
      })
      .catch((err) => {        
        swal({
        title:"Unable to fetch data",
        text: `${err.message}`,
        timer: 1500
      });
      });
  }, []);

  return (
    <>
    {isLoading && <Ring />}
     {!isLoading && (
      <div>
      <Header />

      <Sidebar />

      <Typography
        variant="h4"
        component="div"
        className="typographyText"
      >
        Edit Student Details
      </Typography>
      <div className="student_form" style={{ marginLeft: "250Px" }}>
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
            id="RollNo"
            type="number"
            name="studentId"
            label="Roll No."
            variant="outlined"
            className="input_field"
            value={details.StudentID}
            // disabled
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
            value={details.Name}
            onChange={InputChange}
            // disabled
            focused 
          />
          {errors.name ? <p className="clear_error">{errors.name}</p> : ""}
          <TextField
            id="RegistrationId"
            type="text"
            name="registrationId"
            label="RegistrationId"
            variant="outlined"
            className="input_field"
            required
            value={details.RegistrationID}
            onChange={InputChange}
            focused 
            // disabled
          />
          {errors.registrationId ? (
            <p className="clear_error">{errors.registrationId}</p>
          ) : (
            ""
          )}
          <TextField
            id="AddmissionDate"
            type="text"
            name="addmissionDate"
            label="Addmission Date"
            variant="outlined"
            className="input_field"
            required
            // value={details.AddmissionDate}
            value={dayjs(details.AddmissionDate).format("YYYY-MM-DD")}
            onChange={InputChange}
            // disabled
            focused 
          />
          {errors.addmissionDate ? (
            <p className="clear_error">{errors.addmissionDate}</p>
          ) : (
            ""
          )}
          <TextField
            id="ClassName"
            type="text"
            name="className"
            label="Class Name "
            variant="outlined"
            className="input_field"
            required
            value={details.ClassName}
            onChange={InputChange}
            // disabled
            focused 
          />
          {errors.className ? (
            <p className="clear_error">{errors.className}</p>
          ) : (
            ""
          )}
          <TextField
            id="Mobile"
            type="tel"
            name="mobile"
            label="Mobile"
            variant="outlined"
            className="input_field"
            required
            value={details.Mobile}
            onChange={InputChange}
            // disabled
            focused 
          />
          {errors.mobile ? <p className="clear_error">{errors.mobile}</p> : ""}
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select gender"
              name="gender"
              label="Gender"
              className="input_field"
              required
              open={open}
              value={genders}
              onClose={handleClose}
              onOpen={handleOpen}
              onChange={handleChange}
              focused 
              >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Transgender"}>Transgender</MenuItem>
            </Select>
          </FormControl>
          {errors.gender ? <p className="clear_error">{errors.gender}</p> : ""}
          <TextField
            id="Email"
            type="email"
            name="email"
            label="Email ID"
            variant="outlined"
            className="input_field"
            required
            value={details.Email}
            onChange={InputChange}
            focused 
            // disabled
          />
          {errors.email ? <p className="clear_error">{errors.email}</p> : ""}

          <TextField
            id="DateOfBirth"
            type="text"
            name="dateOfBirth"
            label="Date of Birth"
            variant="outlined"
            className="input_field"
            required
            // value={details.DateOfBirth}
            value={dayjs(details.DateOfBirth).format("YYYY-MM-DD")}
            onChange={InputChange}
            focused 
            />
          {errors.dateOfBirth ? (
            <p className="clear_error">{errors.dateOfBirth}</p>
          ) : (
            ""
          )}
          <TextField
            id="FatherName"
            type="text"
            name="fatherName"
            label="Father Name "
            variant="outlined"
            className="input_field"
            required
            value={details.FatherName}
            onChange={InputChange}
            focused 
          />
          {errors.fatherName ? (
            <p className="clear_error">{errors.fatherName}</p>
          ) : (
            ""
          )}
          <TextField
            id="MotherName"
            type="text"
            name="motherName"
            label="Mother Name "
            variant="outlined"
            className="input_field"
            required
            value={details.MotherName}
            onChange={InputChange}
            focused 
          />
          {errors.motherName ? (
            <p className="clear_error">{errors.motherName}</p>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            id="submit_btn"
            onClick={() => {
              // setDetails(intitial);
              Navigator("/student_details", { replace: "true" });
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
            id="Address"
            type="text"
            name="address"
            label="Address"
            variant="outlined"
            className="input_field"
            required
            value={details.Address}
            onChange={InputChange}
            focused 
          />
          {errors.address ? (
            <p className="clear_error">{errors.address}</p>
          ) : (
            ""
          )}
          <TextField
            id="City"
            type="text"
            name="city"
            label="City"
            variant="outlined"
            className="input_field"
            required
            value={details.City}
            onChange={InputChange}
            focused 
          />
          {errors.city ? <p className="clear_error">{errors.city}</p> : ""}
          <TextField
            id="State"
            type="text"
            name="state"
            label="State"
            variant="outlined"
            className="input_field"
            required
            value={details.State}
            onChange={InputChange}
            focused 
          />
          {errors.state ? <p className="clear_error">{errors.state}</p> : ""}
          <TextField
            id="Country"
            type="text"
            name="country"
            label="Country"
            variant="outlined"
            className="input_field"
            required
            value={details.Country}
            onChange={InputChange}
            focused 
          />
          {errors.country ? (
            <p className="clear_error">{errors.country}</p>
          ) : (
            ""
          )}
          <TextField
            id="Pincode"
            type="number"
            name="pincode"
            label="Pincode"
            variant="outlined"
            className="input_field"
            required
            // value={details.Pincode}
            onChange={InputChange}
            value={details.Pincode}
            focused 
          />
          {errors.pincode ? (
            <p className="clear_error">{errors.pincode}</p>
          ) : (
            ""
          )}
          <Button variant="contained" id="submit_btn" onClick={onSubmitClick}>
            Save
          </Button>
        </Box>
      </div>
      </div>
     )}
    </>
  );
}

export default StudentForm;
