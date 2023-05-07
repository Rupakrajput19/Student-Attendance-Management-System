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
import { useNavigate, Link, Navigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Variables } from "../Variables";
import { APIs } from "../APIs";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { Ring } from "../Ring";
import moment from "moment";
import AttendanceList from "./AttendanceList";

export default function Attendance() {
  const Navigator = useNavigate();
  // const history = useHistory();
  const intitial = {
    studentId: "",
    attendanceDate: "",
    // className: "",
  };

  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isPresents, setPresent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDetails(intitial);
  };

  const checkErrors = (InputValues) => {
    let errors = {};

    const id = InputValues.studentId;
    const ad = InputValues.attendanceDate;

    var today = new Date();
    var yesterday;
    var tommorrow;
    var lastFivethDay;

    today = moment(today).format("YYYY-MM-DD");
    yesterday = moment(today).subtract(1, "days").format("YYYY-MM-DD");
    tommorrow = moment(today).subtract(-1, "days").format("YYYY-MM-DD");
    lastFivethDay = moment(today).subtract(5, "days").format("YYYY-MM-DD");

    // Checking entered date is "Sunday"
    const inputDate = new Date(ad);
    const inputDateday = inputDate.toLocaleString("en-us", { weekday: "long" });

    if (id === "") {
      errors.studentId = "Please Enter Student Roll No!";
    }
    if (ad === "") {
      errors.attendanceDate = "Please Enter Addmission Date!";
    } else if (inputDateday == "Sunday") {
      errors.attendanceDate = "Attendance Can't Be Fill For Sunday!";
    } else if (ad <= lastFivethDay) {
      errors.attendanceDate = "Attendance Can be Fill Only For Last 5 Days!";
    } else if (ad > today) {
      errors.attendanceDate = "Attendance Can't Be Fill For Upcoming Dates!";
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
    checkErrors(details);
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
      checkbox_text.innerHTML = "Student is Not Present";
    }
  };

  const onSubmitClick = (events) => {
    const { studentId, attendanceDate } = details; //, className
    const ispresent = isPresents;
    events.preventDefault();
    console.log("Student is present:--", ispresent ? "Yes" : "No");
    console.log("Student Attendance Details:--", details, isPresents);

    const addAttendanceAPI = () => {
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
              timer: 1500,
            });
            //debugger;
            // fetchingAttendances();
            // <AttendanceList />;
            // window.location.reload(false);
            // Navigator("/attendanceList");
            // <Navigate to="/attendanceList" replace={true} />
            // history.go(0);
            // history.push('/attendanceList');
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1500);
          } else if (
            result.data == "Attendance Is Already Marked" &&
            result.status == 200
          ) {
            swal({
              title: `${result.data}!`,
              text: `Attendance is already added with entered date: ${attendanceDate}`,
              icon: "error",
              timer: 1500,
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
              timer: 1500,
              button: "Try Again",
            });
          }
        })
        .catch((error) => {
          swal({
            title: `Something went wrong: ${error}`,
            text: "Unable to get response from backend, please try again later!",
            icon: "error",
            timer: 2000,
          });
        });
    };

    if (!checkErrors(details)) {
      setIsLoading(true);
      addAttendanceAPI();
      setIsLoading(false);
      setDetails(intitial);
      setOpen(false);
      Navigator("/attendanceList");
    }
    Navigator("/attendanceList");
  };

  return (
    <>
      {isLoading && <Ring />}
      {!isLoading && (
        <div>
          <Typography>
            <span
              className="header_btn attendance_modal"
              onClick={handleClickOpen}
            >
              Add Attendances
            </span>
          </Typography>
          <Dialog open={open}>
            {/* <DialogTitle>{props.pageTitle}</DialogTitle> */}
            <DialogContent>
              <DialogContentText style={{ margin: "5px auto" }}>
                Please fill required details to add students attendance using
                Roll no.
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
                value={details.attendanceDate}
                onChange={InputChange}
                focused
              />
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
                Student is Not Present
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {/* <Link to="/attendanceList"> */}
                <Button onClick={onSubmitClick}>Submit</Button>
              {/* </Link> */}
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
