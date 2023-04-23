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

function EditStudentForm(props) {
  document.title = `Edit - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const location = useLocation();
  const student = location.state.StudentData;
  console.log(student);
  // const id = student.StudentID;
  // const name = student.Name;
  // const email = student.Email;
  // const mobile = student.Mobile;
  // const gender = student.Gender;
  // const className = student.ClassName;
  // const dateOfBirth = student.DateOfBirth;
  // const addmissionDate = student.AddmissionDate;
  // const registrationId = student.RegistrationID;
  // const fatherName = student.FatherName;
  // const motherName = student.MotherName;
  // const address = student.Address;
  // const city = student.City;
  // const state = student.State;
  // const country = student.Country;
  // const pincode = student.Pincode;
  const studentDetail = {
    studentId: student.StudentID,
    name: student.Name,
    email: student.Email,
    mobile: student.Mobile,
    gender: student.Gender,
    className: student.ClassName,
    dateOfBirth: student.DateOfBirth,
    addmissionDate: student.AddmissionDate,
    registrationId: student.RegistrationID,
    fatherName: student.FatherName,
    motherName: student.MotherName,
    address: student.Address,
    city: student.City,
    state: student.State,
    country: student.Country,
    pincode: student.Pincode,
    isActive: student.IsActive,
  };
  // const intitial = {
  //   id: "",
  //   name: "",
  //   email: "",
  //   className: "",
  //   addmissionDate: "",
  //   registrationId: "",
  //   fatherName: "",
  //   motherName: "",
  //   mobile: "",
  //   dateOfBirth: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   pincode: "",
  // };

  const [details, setDetails] = useState(studentDetail);
  const [errors, setErrors] = useState({});
  const [genders, setGender] = useState(studentDetail.gender);
  const [isActives, setActive] = useState(studentDetail.isActive);
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onCheckboxClick = () => {
    debugger;
    const checked = document.getElementById("isActive").checked;
    const checkbox_text = document.getElementById("checkbox_text");
    if (checked) {
      // when checked box is checked
      setActive(true);
      // checkbox_text.innerHTML = "";
    } else {
      // when checked box is unchecked
      setActive(false);
      // checkbox_text.innerHTML = "Student is Not Active";
    }
  };

  const checkErrors = (InputValues) => {
    let errors = {};
    let inputEmail = InputValues.email.trim();
    let validEmail = inputEmail.match(Variables.EmailRegex);
    let dob = InputValues.dateOfBirth;
    let ad = InputValues.addmissionDate;

    var today = new Date();
    today = moment(today).format("YYYY-MM-DD");
    const dateExceededText = "Can't be Greater than Current Date!";

    if (InputValues.name === "") {
      errors.name = "Please Enter Full Name!";
    } else if (InputValues.name.length < 3 || InputValues.name.length > 30) {
      errors.name = "Please Enter Name Between 3-30 Characters!";
    } else if (!isNaN(InputValues.name)) {
      errors.name = "Only Characters Allowed In Name!";
    } else if (InputValues.registrationId === "") {
      errors.registrationId = "Please Enter Registration Id!";
    } else if (InputValues.registrationId.length < 5 || InputValues.registrationId.length > 8) {
      errors.registrationId = "Please Enter 5-8 digit Registration Id!";
    } else if (InputValues.addmissionDate === "") {
      errors.addmissionDate = "Please Enter Addmission Date!";
    }
    //  else if (InputValues.addmissionDate > today) {
    //   errors.addmissionDate = `Addmission Date ${dateExceededText}`;
    // }
     else if (InputValues.className === "") {
      errors.className = "Please Enter Class Name!";
    } else if (InputValues.mobile === "") {
      errors.mobile = "Please Enter Mobile No.!";
    } else if (isNaN(InputValues.mobile)) {
      errors.mobile = "Only No. Allowed In Mobile!";
    } else if (
      InputValues.mobile.length < 10 ||
      InputValues.mobile.length > 12
    ) {
      errors.mobile = "Please Enter 10-12 Digits No.!";
    } else if (genders == "") {
      errors.gender = "Please Select Gender!";
    } else if (InputValues.email === "") {
      errors.email = "Please Enter Email!";
    } else if (!validEmail) {
      errors.email = "Enter Valid Email! ex:abc@gmail.com";
    } else if (InputValues.dateOfBirth === "") {
      errors.dateOfBirth = "Please Enter Date of Birth!";
    } else if (InputValues.dateOfBirth == InputValues.addmissionDate) {
      errors.dateOfBirth = "Date of Birth and Addmission Date Can't be Same";
      errors.addmissionDate = "Addmission Date and Date of Birth Can't be Same";
    } else if (InputValues.dateOfBirth >= today) {
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
    checkErrors(details);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
    const { name, value } = event.target;
    const genderValue = { [name]: value };
    console.log("gender:--", genderValue);
  };

  const onSubmitClick = (events) => {
    const {
      studentId,
      name,
      email,
      mobile,
      className,
      dateOfBirth,
      addmissionDate,
      registrationId,
      fatherName,
      motherName,
      address,
      city,
      state,
      country,
      pincode,
    } = details;
    const gender = genders;
    const isActive = isActives;

    events.preventDefault();

    if (!checkErrors(details)) {
      console.log("details:--", details);
      console.log("gender value:--", gender);
      console.log("isActive value:--", isActive);
      setIsLoading(true);
      debugger;
      axios
        .put(APIs.STUDENTS, {
          studentId,
          name,
          email,
          mobile,
          className,
          gender,
          dateOfBirth,
          addmissionDate,
          registrationId,
          fatherName,
          motherName,
          address,
          city,
          state,
          country,
          pincode,
          isActive,
        })
        .then((response) => {
          console.log("Response from backend -> ", response);
          if (
            response.data == "Student Updated Successfully" &&
            response.status == 200
          ) {
            swal({
              title: `${response.data}`,
              text: `Student Id - ${studentId}`,
              icon: "success",
              timer: 1500,
            });
            Navigator("/studentList", { replace: "true" });
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
                defaultValue={details.studentId}
                // defaultValue={id}
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
                defaultValue={details.registrationId}
                // defaultValue={registrationId}
                onChange={InputChange}
                focused
                disabled
              />
              {errors.registrationId ? (
                <p className="clear_error">{errors.registrationId}</p>
              ) : (
                ""
              )}
              <TextField
                id="AddmissionDate"
                type="date"
                name="addmissionDate"
                label="Addmission Date"
                variant="outlined"
                className="input_field"
                required
                defaultValue={dayjs(details.addmissionDate).format(
                  "YYYY-MM-DD"
                )}
                // defaultValue={dayjs(addmissionDate).format("YYYY-MM-DD")}
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
                defaultValue={details.className}
                // defaultValue={className}
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
                  defaultValue={details.gender}
                  // defaultValue={genders}
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
              {errors.gender ? (
                <p className="clear_error">{errors.gender}</p>
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

              <TextField
                id="DateOfBirth"
                type="date"
                name="dateOfBirth"
                label="Date of Birth"
                variant="outlined"
                className="input_field"
                required
                defaultValue={dayjs(details.dateOfBirth).format("YYYY-MM-DD")}
                // defaultValue={dayjs(dateOfBirth).format("YYYY-MM-DD")}
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
                defaultValue={details.fatherName}
                // defaultValue={fatherName}
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
                defaultValue={details.motherName}
                // defaultValue={motherName}
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
                  Navigator("/studentList", { replace: "true" });
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
                defaultValue={details.address}
                // defaultValue={address}
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
                defaultValue={details.city}
                // defaultValue={city}
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
                defaultValue={details.state}
                // defaultValue={state}
                onChange={InputChange}
                focused
              />
              {errors.state ? (
                <p className="clear_error">{errors.state}</p>
              ) : (
                ""
              )}
              <TextField
                id="Country"
                type="text"
                name="country"
                label="Country"
                variant="outlined"
                className="input_field"
                required
                defaultValue={details.country}
                // defaultValue={country}
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
                defaultValue={details.pincode}
                // defaultValue={pincode}
                onChange={InputChange}
                focused
              />
              {errors.pincode ? (
                <p className="clear_error">{errors.pincode}</p>
              ) : (
                ""
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    // checked={details.isActive}
                    defaultChecked={details.isActive}
                    id="isActive"
                    name="isActive"
                    // color="primary"
                    sx={{
                      color: "red",
                      "&.Mui-checked": {
                        color: "blue",
                      },
                    }}
                  />
                }
                label="Is Student Active ?"
                onChange={onCheckboxClick}
              />
              {/* <p className="clear_errors" id="checkbox_text">
                Is Student Active ?
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

export default EditStudentForm;
