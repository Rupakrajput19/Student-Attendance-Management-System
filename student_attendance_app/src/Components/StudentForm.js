import { React, useState } from "react";
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

function SignUp(props) {
  document.title = `Form - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const intitial = {
    name: "",
    email: "",
    RollNo: "",
    className: "",
    addmissionDate: "",
    RegistrationId: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    dob: "",
    gender: "",
    // confirm_password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  };
  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmitClick = (events) => {
    const {
      name,
      email,
      mobile,
      RollNo,
      className,
      dob,
      addmissionDate,
      RegistrationId,
      fatherName,
      motherName,
      gender,
      address,
      city,
      state,
      country,
      pincode,
    } = details;
    events.preventDefault();
    console.log("details:--", details);

    if (!Errors_check(details)) {
      Navigator("/", { replace: "true" });
    }
  };

  //  const ClearData = () => {
  //     // setDetails({});
  //     // setDetails(intitial);
  //     window.location.reload();
  //     console.log('initial');
  //   };

  const Errors_check = (InputValues) => {
    let errors = {};

    if (InputValues.name === "") {
      errors.name = "Please Enter Full Name!";
    } else if (InputValues.name.length < 3 || InputValues.name.length > 30) {
      errors.name = "Please Enter Name Between 3-30 Characters!";
    } else if (!isNaN(InputValues.name)) {
      errors.name = "Only Characters Allowed In Name!";
    }

    if (InputValues.RegistrationId === "") {
      errors.RegistrationId = "Please Enter Registration Id!";
    }
    if (InputValues.RollNo === "") {
      errors.RollNo = "Please Enter Roll No!";
    }
    
    if (InputValues.className === "") {
      errors.className = "Please Enter Class Name!";
    }

    if (InputValues.addmissionDate === "") {
      errors.addmissionDate = "Please Enter Addmission Date!";
    }

    if (InputValues.dob === "") {
      errors.dob = "Please Enter Date of Birth!";
    }

    if (InputValues.dob === InputValues.addmissionDate) {
      // debugger;
      errors.dob = "Date of Birth and Addmission Date Can't be Same";
      errors.addmissionDate = "Addmission Date and Date of Birth Can't be Same";
    }

    if (InputValues.fatherName === "") {
      errors.fatherName = "Please Enter Father Name!";
    }

    if (InputValues.motherName === "") {
      errors.motherName = "Please Enter Mother Name!";
    }

    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let trueEmail = InputValues.email;
    let validEmailregex = trueEmail.match(emailregex);

    if (InputValues.email === "") {
      errors.email = "Please Enter Email!";
    } else if (!validEmailregex) {
      errors.email = "Enter Valid Email! ex:abc@gmail.com";
    }

    if (InputValues.gender === "") {
      errors.gender = "Please Select Gender!";
    }

    if (InputValues.mobile === "") {
      errors.mobile = "Please Enter Mobile No.!";
    } else if (isNaN(InputValues.mobile)) {
      errors.mobile = "Only No. Allowed In Mobile!";
    } else if (
      InputValues.mobile.length < 10 ||
      InputValues.mobile.length > 12
    ) {
      errors.mobile = "Please Enter 10-12 Digits No.!";
    }

    if (InputValues.address === "") {
      errors.address = "Please Enter Address!";
    }

    if (InputValues.city === "") {
      errors.city = "Please Enter City!";
    }

    if (InputValues.state === "") {
      errors.state = "Please Enter State!";
    }

    if (InputValues.country === "") {
      errors.country = "Please Enter Country!";
    }

    if (InputValues.pincode === "") {
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

  return (
    <>
      <Header />

      <Sidebar />

      <Typography
        variant="h4"
        component="div"
        sx={{
          textAlign: "center",
          margin: "120px auto 20px auto",
          color: "black",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Student Details Form
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
            id="name"
            type="text"
            name="name"
            label="Full Name "
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.name ? <p className="clear_error">{errors.name}</p> : ""}
          <TextField
            id="RegistrationId"
            type="text"
            name="RegistrationId"
            label="RegistrationId"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.RegistrationId ? (<p className="clear_error">{errors.RegistrationId}</p>) : ("")}
          <TextField
            id="RollNo"
            type="number"
            name="RollNo"
            label="Roll No."
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.RollNo ? <p className="clear_error">{errors.RollNo}</p> : ""}
          <TextField
            id="addmissionDate"
            type="date"
            name="addmissionDate"
            label="Addmission Date"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.addmissionDate ? (
            <p className="clear_error">{errors.addmissionDate}</p>
          ) : (
            ""
          )}
           <TextField
            id="className"
            type="text"
            name="className"
            label="Class Name "
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.className ? (
            <p className="clear_error">{errors.className}</p>) : ("")}
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
            value={gender}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
            <MenuItem value={"Transgender"}>Transgender</MenuItem>
          </Select>
        </FormControl>
        {errors.gender ? <p className="clear_error">{errors.gender}</p> : ""}
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
            id="dob"
            type="date"
            name="date"
            label="Date of Birth"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.dob ? <p className="clear_error">{errors.dob}</p> : ""}
          <TextField
            id="fatherName"
            type="text"
            name="fatherName"
            label="Father Name "
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.fatherName ? (
            <p className="clear_error">{errors.fatherName}</p>
          ) : (
            ""
          )}
          <TextField
            id="motherName"
            type="text"
            name="motherName"
            label="Mother Name "
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.motherName ? (
            <p className="clear_error">{errors.motherName}</p>) : ("")}
          <Button
            variant="contained"
            id="submit_btn"
            onClick={() => {
              window.location.reload();
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
            id="address"
            type="text"
            name="address"
            label="Address"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.address ? (
            <p className="clear_error">{errors.address}</p>
          ) : (
            ""
          )}
          <TextField
            id="city"
            type="text"
            name="city"
            label="City"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.city ? <p className="clear_error">{errors.city}</p> : ""}
          <TextField
            id="state"
            type="text"
            name="state"
            label="State"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.state ? <p className="clear_error">{errors.state}</p> : ""}
          <TextField
            id="country"
            type="text"
            name="country"
            label="Country"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.country ? (
            <p className="clear_error">{errors.country}</p>
          ) : (
            ""
          )}
          <TextField
            id="pincode"
            type="number"
            name="pincode"
            label="Pincode"
            variant="outlined"
            className="input_field"
            required
            onChange={InputChange}
          />
          {errors.pincode ? (
            <p className="clear_error">{errors.pincode}</p>
          ) : (
            ""
          )}
          <Button variant="contained" id="submit_btn" onClick={onSubmitClick}>
            Add
          </Button>
        </Box>
      </div>
    </>
  );
}

export default SignUp;
