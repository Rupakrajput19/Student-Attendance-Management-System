import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Variables } from "../Variables";
import { APIs } from "../APIs";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { Ring } from "../Ring";

export default function Attendance() {
  const intitial = {
    studentId: "",
    attendanceDate: "",
    // className: "",
  };

  // const [studentId, setStudentId] = useState("");
  // const [attendanceDate, setAttendanceDate] = useState("");

  // const studentHandler = (e) => {
  //   setStudentId(e.target.value);
  // };
  // const AttendanceDateHandler = (e) => {
  //   setAttendanceDate(e.target.value);
  // };

  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isPresents, setPresent] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDetails(intitial);
  };

  const Errors_check = (InputValues) => {
    let errors = {};
    // const today = new Date();
    // const yesterday = new Date(today);
    // const tommorrow = new Date(today);
    // const upcoming3day = new Date(today);
    // // console.log(today, yesterday, tommorrow, upcoming3day)

    // today.setDate(today.getDate());
    // yesterday.setDate(yesterday.getDate() - 1);
    // tommorrow.setDate(tommorrow.getDate() + 1);
    // upcoming3day.setDate(upcoming3day.getDate() + 3);

    // const tt = today.toDateString();
    // const yy = yesterday.toDateString();
    // const tm = tommorrow.toDateString();
    // const up = upcoming3day.toDateString();
    // console.log(tt, yy, tm, up)

    if (InputValues.studentId === "") {
      errors.studentId = "Please Enter Roll No!";
    }
    if (InputValues.attendanceDate === "") {
      errors.attendanceDate = "Please Enter Addmission Date!";
    }
    // if (InputValues.className === "") {
    //   errors.className = "Please Enter Class Name!";
    // }

    setErrors(errors);
    return Object.entries(errors).length > 0;
  };

  const InputChange = (events) => {
    const { name, value } = events.target;
    const InputDetails = { ...details, [name]: value };
    setDetails(InputDetails);
    Errors_check(details);
  };

  const onCheckboxClick = () => {
    const checked = document.getElementById("checkboxId").checked;
    const checkbox_text = document.getElementById("checkbox_text");
    if (checked) {
      // when checked box is checked
      setPresent(true);
      checkbox_text.innerHTML = "";
    } else {
      // when checked box is unchecked
      setPresent(false);
      checkbox_text.innerHTML = "Student is Not Presented";
    }
  };

  const onSubmitClick = (events) => {
    const { studentId, attendanceDate } = details; //, className
    const ispresent = isPresents;
    events.preventDefault();
    console.log("Student is present:--", ispresent ? "Yes" : "No");
    console.log("Student Attendance Details:--", details, isPresents);

    if (!Errors_check(details)) {
      // <Ring />
      axios
        .put(APIs.ATTEDNDANCES, {
          studentId,
          attendanceDate,
          // className,
          ispresent,
        })
        .then((result) => {
          console.log("Response from backend -> ", result);
          if (
            result.data == "Attendance Added Successfully" &&
            result.status == 200
          ) {
            swal({
              title: `${result.data}!`,
              icon: "success",
            });
            window.location.reload();
          } else if (
            result.data == "Attendance Is Already Marked" &&
            result.status == 200
          ) {
            swal({
              title: `${result.data}!`,
              text: `Attendance is already added with entered date: ${attendanceDate}`,
              icon: "error",
              button: "Try Again",
            });
          } else if (
            result.data == "Student Not Found" &&
            result.status == 200
          ) {
            swal({
              title: `${result.data}!`,
              text: `Student not found with this RollNo/StudentId: ${studentId}`,
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
      <Typography>
        <span className="header_btn attendance_modal" onClick={handleClickOpen}>
          Add Attendances
        </span>
      </Typography>
      <Dialog open={open}>
        {/* <DialogTitle>{props.pageTitle}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            Add Students Attendance Using Roll no, please fill required details.
          </DialogContentText>
          <TextField
            required
            autoComplete="off"
            margin="dense"
            name="studentId"
            label="Student Roll No."
            type="number"
            className="input_field"
            variant="outlined"
            value={details.studentId}
            onChange={InputChange}
          />
          {errors.studentId ? (
            <p className="clear_errors">{errors.studentId}</p>
          ) : (
            ""
          )}
          <TextField
            required
            autoComplete="off"
            margin="dense"
            name="attendanceDate"
            label="Attendance Date"
            type="date"
            className="input_field"
            variant="outlined"
            value={details.attendanceDate.toString()}
            onChange={InputChange}
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker 
              required
              autoComplete="off"
              margin="dense"
              name="attendanceDate"
              label="Attendance Date"
              type="date"
              className="input_field"
              variant="standard"
              value={attendanceDate.toString()}
              onChange={setAttendanceDate}
              />
            </DemoContainer>
          </LocalizationProvider> */}
          {errors.attendanceDate ? (
            <p className="clear_errors">{errors.attendanceDate}</p>
          ) : (
            ""
          )}
          {/* <TextField
            required
            autoComplete="off"
            margin="dense"
            name="className"
            label="Class Name"
            type="text"
            className="input_field"
            variant="standard"
            value={details.className}
            onChange={InputChange}
          />
          {errors.className ? (
            <p className="clear_errors">{errors.className}</p>
          ) : (
            ""
          )} */}
          <FormControlLabel
            control={
              <Checkbox
                value={isPresents}
                id="checkboxId"
                name="ispresent"
                // color="primary"
                sx={{
                  color: "red",
                  "&.Mui-checked": {
                    color: "blue",
                  },
                }}
              />
            }
            label="Present ?"
            onChange={onCheckboxClick}
          />
          <p className="clear_errors" id="checkbox_text">
            Student is Not Presented
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
