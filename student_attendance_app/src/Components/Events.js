import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Textarea from "@mui/joy/Textarea";
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
import { useSelector } from "react-redux";

export default function Events({fetchingEvents}) {
  const Navigator = useNavigate();

  const user = useSelector((state) => state.user);

  var userId = 0;
  var studentId = 0;
  var isAdmin = false;
  var isStudent = false;
  var userName = "";
  if (user) {
    userName = user.Name;
    userId = user.UserID ? user.UserID : 0;
    studentId = user.StudentID ? user.StudentID : 0;
    isAdmin = user.IsAdmin ? user.IsAdmin : false;
    isStudent = user.IsStudent ? user.IsStudent : false;
    console.log(user);
    console.log("userId =>", userId);
    console.log("studentId =>", studentId);
    console.log("isAdmin =>", isAdmin);
    console.log("isStudent =>", isStudent);
  } else {
    console.log(Variables.NoDetailFoundInRedux);
  }


  const intitial = {
    eventName: "",
    eventOwner: "",
    eventDate: "",
    description: "",
  };

  const [details, setDetails] = useState(intitial);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [eventDayName, setDayName] = useState("");
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

    const en = InputValues.eventName;
    const eo = InputValues.eventOwner;
    const ed = InputValues.eventDate;

    var today = new Date();

    today = moment(today).format("YYYY-MM-DD");

    const inputDate = new Date(ed);
    const inputDatedayName = inputDate.toLocaleString("en-us", {
      weekday: "long",
    });

    setDayName(inputDatedayName);

    if (en === "") {
      errors.eventName = "Please Enter Event Name!";
    }
    if (eo === "") {
      errors.eventOwner = "Please Enter Event Onwer Name!";
    }
    if (ed === "") {
      errors.eventDate = "Please Enter Event Date!";
    } else if (ed < today) {
      errors.eventDate = "Event Can't Create For Past!";
    }
    if (InputValues.description === "") {
      errors.description = "Please Enter Description!";
    }

    setErrors(errors);
    return Object.entries(errors).length > 0;
  };

  const InputChange = (events) => {
    const { name, value } = events.target;
    const InputDetails = { ...details, [name]: value };
    setDetails(InputDetails);
    checkErrors(details);
  };

  const onSubmitClick = (events) => {
    const { eventName, eventOwner, eventDate, description } = details;
    const eventDay = eventDayName;
    const createdBy = userName; const modifiedBy = userName;
    events.preventDefault();
    console.log("Event Details:--", details);

    const addEventsAPI = () => {
      axios
        .put(APIs.EVENTS, {
          eventName,
          eventOwner,
          eventDate,
          eventDay,
          description,
          userId,
          createdBy,
          modifiedBy
        })
        .then((result) => {
          console.log("Response from backend -> ", result);
          if (
            result.data == "Event Added Successfully" &&
            result.status == 200
          ) {
            swal({
              title: `${result.data}!`,
              icon: "success",
              timer: 1500,
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
      addEventsAPI();
      fetchingEvents();
      setIsLoading(false);
      setDetails(intitial);
      setOpen(false);
      // Navigator("/eventsList");
    }
    // Navigator("/eventsList");
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
              Add Events
            </span>
          </Typography>
          <Dialog open={open}>
            {/* <DialogTitle>{props.pageTitle}</DialogTitle> */}
            <DialogContent>
              <DialogContentText style={{ margin: "5px auto" }}>
                Add Events details, Once the event created cannot be edit.
              </DialogContentText>
              <TextField
                required
                autoComplete="off"
                margin="dense"
                name="eventName"
                label="Event Name"
                type="text"
                className="input_field"
                variant="outlined"
                value={details.eventName}
                onChange={InputChange}
              />
              {errors.eventName ? (
                <p className="clear_errors">{errors.eventName}</p>
              ) : (
                ""
              )}
              <TextField
                required
                autoComplete="off"
                margin="dense"
                name="eventOwner"
                label="Event Onwer Name"
                type="text"
                className="input_field"
                variant="outlined"
                value={details.eventOwner}
                onChange={InputChange}
              />
              {errors.eventOwner ? (
                <p descriclassNameption="clear_errors">{errors.eventOwner}</p>
              ) : (
                ""
              )}
              <TextField
                required
                autoComplete="off"
                margin="dense"
                name="eventDate"
                label="Event Date"
                type="date"
                className="input_field"
                variant="outlined"
                value={details.eventDate}
                onChange={InputChange}
                focused
              />
              {errors.eventDate ? (
                <p className="clear_errors">{errors.eventDate}</p>
              ) : (
                ""
              )}
              <Textarea
                required
                autoComplete="off"
                placeholder="Type in descriptions here…"
                // defaultValue="Try to put text longer than 4 lines."
                minRows={3}
                maxRows={3}
                sx={{ mb: 1 }}
                margin="dense"
                name="description"
                // label="Descriptions"
                type="text"
                className="input_field"
                variant="outlined"
                value={details.description}
                onChange={InputChange}
              />
              {errors.description ? (
                <p className="clear_errors">{errors.description}</p>
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
      )}
    </>
  );
}
