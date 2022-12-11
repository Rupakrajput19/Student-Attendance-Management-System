import {React, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import swal from 'sweetalert';

export default function Form() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const intitial = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    department: "",
  };

  const [details, setDetails] = useState(intitial);

  const InputChange = (events) => {
    const { name, value } = events.target;
    const InputDetails = { ...details, [name]: value };
    setDetails(InputDetails);
  };

  const onSubmitClick = (events) => {
    events.preventDefault();
    console.log("details:--", details);
        swal({
            title: "Details Saved Successfully!",
            text:`
            Name: ${details.name}
            Email Address: ${details.email}
            Mobile No: ${details.mobile}
            Address: ${details.address}
            Department: ${details.department}
            ` ,
            icon: "success",
          });
    setOpen(false);
  }
  return (
    <div>
      <Button variant="outlined"  id="add_btn" onClick={handleClickOpen}>
       Add +
      </Button>
      <Dialog open={open}>
        <DialogTitle>Student Details:-</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Add Student details, please fill all required details.
          </DialogContentText>
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="name"
            label="Enter Student Full Name..."
            type="text"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="fatherName"
            label="Enter Student Father Name..."
            type="text"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="branch"
            label="Enter Branch..."
            type="text"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="course"
            label="Enter Course..."
            type="text"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="mobile"
            label="Enter Conatct No..."
            type="tel"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="DOB"
            label="Enter Date of Birth..."
            type="date"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
          <TextField
          required
          autoComplete='off'
            margin="dense"
            name="address"
            label="Enter Your Address..."
            type="text"
            fullWidth
            variant="standard"
             onChange={InputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitClick}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
