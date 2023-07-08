import { React, useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Ring } from "../Ring";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import axios from "axios";
import { APIs } from "../APIs";
import dayjs from "dayjs";
import { Variables } from "../Variables";
import { Image } from "@mui/icons-material";
import profileImage from "../Images/ProfileImage/student_profile.jpg";
import { useSelector } from "react-redux";

export default function MyProfile(props) {
  document.title = `MyProfile - ${props.pageTitle}`;
  const user = useSelector((state) => state.user);

  var userId = 0;
  var studentId = 0;
  if (user) {
    userId = user.UserID ? user.UserID : 0;
    studentId = user.StudentID ? user.StudentID : 0;
    console.log(user);
    console.log("userId =>", userId);
    console.log("studentId =>", studentId);
  } else {
    console.log(Variables.NoDetailFoundInRedux);
  }

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(""); // profileImage
  const [studentName, setStudentName] = useState("");
  // const [image, setImage] = useState({ preview: '', data: '' })
  const [imageName, setImageName] = useState("");

  const fetchingProfileData = () => {
    axios
      .post(APIs.MYPROFILE, {
        studentId,
      })
      .then((response) => {
        const fullrecords = response.data;
        const records = fullrecords[0];
        const name = records.Name;
        const photo = records.Photo;
        const studentImageURL = `${Variables.FrontendImagePath}/${photo}`;
        setDetails(records);
        setStudentName(name);
        // Setting Image Name to show in profile that coming from backend
        setImageName(photo);
        console.log("Data->", response.data);
        console.log("Image URL->", studentImageURL);
        console.log("type of data -> ", typeof response.data);
        // const frontendPath = "../Images/ProfileImage";
        // const imageUrl = `${frontendPath}/${photo}`;
        // setSelectedImage(imageUrl);
      })
      .catch((err) => {
        swal({
          title: "Unable to fetch data",
          text: `${err.message}`,
          timer: 2000,
        });
      });
  };

  const filterBySize = (file) => {
    //filter out images larger than 5MB
    return file.size <= 5242880;
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectImage = URL.createObjectURL(event.target.files[0]);
    // const selectImage = {
    //   preview: URL.createObjectURL(event.target.files[0]),
    //   data: event.target.files[0],
    // }
    setSelectedImage(selectImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectImage = event.target.newProfilePhoto.files;
    const imageFile = selectImage[0];
    if (selectImage.length === 0) {
      return swal({
        title: "Please Select an Image to Upload!",
        // text: "",
        icon: "warning",
        timer: 1500,
        button: "Ok",
      });
    } else if (imageFile.size >= 5242880) {
      return swal({
        title: "Please Select an Image Lower than 5 MB!",
        // text: "",
        icon: "warning",
        timer: 1500,
        button: "Ok",
      });
    } else {
      const imageName = imageFile.name;
      console.log("Image name", imageName);
      uploadStudentImage(imageFile);
    }
  };

  const uploadStudentImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("studenId", studentId);
    formData.append("studentName", studentName);
    console.log(formData);
    console.log(typeof formData);
    axios
      .post(`${APIs.STUDENTSPHOTO}/${studentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        swal({
          title: `${response.data.Message}`,
          text: `${response.data.FileName}`,
          icon: "success",
          timer: 1500,
        });
      })
      .catch((error) => {
        swal({
          title: "Unable to Upload Image",
          text: `${error.message}`,
          timer: 2000,
        });
      });
      // setTimeout(() => {
      // fetchingProfileData(); //no need to fetch profile data after image upload action
    // }, 1500);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchingProfileData();
    setIsLoading(false);
  }, []);

  if (imageName && imageName != undefined && imageName != "") {
    const frontend = "C:/Users/Ritu Kumar/OneDrive/Desktop/Student_Attendance_Management_System/student_attendance_app/src/Images/ProfileImage";
    // var image = require(`${frontend}/${imageName}`);
    var image = require(`C:/Users/Ritu Kumar/OneDrive/Desktop/Student_Attendance_Management_System/student_attendance_app/src/Images/ProfileImage/${imageName}`);
    console.log(image);
    // setSelectedImage(image);
  }

  // if (!user) {
  //   return (
  //     <>
  //     <Header />
  //     <Sidebar />
  //     <Typography variant="h4" component="div" className="typographyText">
  //           My Profile
  //         </Typography>
  //     <div className="student_form container_box">You must be logged in to see your profile.</div>
  //     </>
  //   );
  // }

  return (
    <>
      <Header />

      <Sidebar />

      {isLoading && <Ring />}
      {!isLoading && (
        <div>
          <Typography variant="h4" component="div" className="typographyText">
            My Profile
          </Typography>

          <div className="gridBoxContainer gridBoxMyProfile">
            {/* <div className="profile-pic-wrapper" title={{studentName}}> */}
            <div className="profile-pic-box">
              <form onSubmit={handleSubmit}>
                <div className="pic-holder" title={`${studentName}`}>
                  {/* <!-- uploaded pic shown here --> */}
                  <img
                    id="profilePic"
                    className="pic"
                    src={selectedImage == "" ? image : selectedImage}
                    // src="https://source.unsplash.com/random/150x150?person"
                    // src={require("../Images/ProfileImage/RITU KUMAR.jpeg")}
                    // src={require(`${process.env.PUBLIC_URL}/Images/ProfileImage/RITU KUMAR.jpeg`)}
                    // destination={{ url: "my-server.com/upload" }}
                    type="file"
                    accept="image/*"
                    fileFilter={filterBySize}
                    alt={`${studentName} Image`}
                    // alt="Student Profile"
                  />
                  <input
                    className="uploadProfileInput"
                    accept="image/*"
                    type="file"
                    name="newProfilePhoto"
                    id="newProfilePhoto"
                    style={{ opacity: "0" }}
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="newProfilePhoto"
                    className="upload-file-block"
                  >
                    <div className="text-center">
                      <div className="mb-2">
                        <i className="fa fa-camera fa-2x"></i>
                      </div>
                      <div className="text-uppercase">
                        Update <br /> Profile Photo
                      </div>
                    </div>
                  </label>
                </div>
                <h2>Profile Image</h2>
                <Button
                  type="submit"
                  variant="contained"
                  className="input_field"
                  id="submit_btn"
                  // onClick={handleSubmit}
                >
                  Upload
                </Button>
              </form>
            </div>

            <div className="profileData">
              <div className="profileField">
                <p className="profileDataText">Full Name:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="fullName"
                  name="fullName"
                  // label="First Name"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Name}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField"> */}
                <p className="profileDataText">Gender:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="gender"
                  name="gender"
                  // label="Gender"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Gender}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">Roll No:</p>
                {/* . or Student Id */}
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="studentRoll"
                  name="studentRoll"
                  // label="Roll No."
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.StudentID}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField"> */}
                <p className="profileDataText">Registration Id:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="studentRegistrationId"
                  name="studentRegistrationId"
                  // label="Registration Id"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.RegistrationID}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">Class Name:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="studentClassName"
                  name="studentClassName"
                  // label="Class Name"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.ClassName}
                  // disabled
                  focused
                />
                {/* </div>
            <div className="profileField"> */}
                <p className="profileDataText">Mobile No:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="mobileNo"
                  name="mobileNo"
                  // label="Mobile No"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Mobile}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">Addmission Date:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="addmissionDate"
                  name="addmissionDate"
                  // label="Addmission Date"
                  type="text"
                  className="input_field"
                  variant="standard"
                  // value={details.AddmissionDate}
                  value={dayjs(details.AddmissionDate).format("YYYY-MM-DD")}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField"> */}
                <p className="profileDataText">Date of Birth:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  // label="Date of Birth"
                  type="text"
                  className="input_field"
                  variant="standard"
                  // value={details.DateOfBirth}
                  value={dayjs(details.DateOfBirth).format("YYYY-MM-DD")}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">Father Name:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="fatherName"
                  name="fatherName"
                  // label="Father Name"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.FatherName}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField"> */}
                <p className="profileDataText">Mother Name:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="motherName"
                  name="motherName"
                  // label="Mother Name"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.MotherName}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">Email Address:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="email"
                  name="email"
                  // label="Email Adderess"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Email}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField"> */}
                <p className="profileDataText">Address:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="address"
                  name="address"
                  // label="Address"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Address}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">City:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="city"
                  name="city"
                  // label="City"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.City}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField"> */}
                <p className="profileDataText">State:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="state"
                  name="studentEmail"
                  // label="State"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.State}
                  // disabled
                  focused
                />
              </div>
              <div className="profileField">
                <p className="profileDataText">Country:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="country"
                  name="country"
                  // label="Country"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Country}
                  // disabled
                  focused
                />
                {/* </div>
          <div className="profileField">  */}
                <p className="profileDataText">Pincode:</p>
                <TextField
                  required
                  autoComplete="off"
                  margin="dense"
                  id="pincode"
                  name="pincode"
                  // label="Pincode"
                  type="text"
                  className="input_field"
                  variant="standard"
                  value={details.Pincode}
                  // disabled
                  focused
                />
              </div>
              {/* <div className="profileField">
            <Button
              variant="contained"
              className="input_field"
              id="submit_btn"
              onClick={editDetails}
            >
              Edit Detail
            </Button>
            <Button variant="contained" className="input_field" id="submit_btn">
              Save Detail
            </Button>
          </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
