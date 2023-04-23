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
// import myImage from '../../../Backend_C#/Students/Photos';
import profileImage from "../Images/ProfileImage/student_profile.jpg";
// import profileImagePath from "../Images/ProfileImage";

export default function MyProfile(props) {
  document.title = `MyProfile - ${props.pageTitle}`;
  const studentid = 2; //need to get studentId
  // const studentName = "Ritu Kumar";
  // studentName = studentName.toString();
  const image = require("C:/Users/Ritu Kumar/OneDrive/Desktop/Student_Attendance_Management_System/student_attendance_app/src/Images/ProfileImage/RITU KUMAR.jpeg");

  // $(document).on("change", ".uploadProfileInput", function () {
  //   var triggerInput = this;
  //   var currentImg = $(this).closest(".pic-holder").find(".pic").attr("src");
  //   var holder = $(this).closest(".pic-holder");
  //   var wrapper = $(this).closest(".profile-pic-wrapper");
  //   $(wrapper).find('[role="alert"]').remove();
  //   triggerInput.blur();
  //   var files = !!this.files ? this.files : [];
  //   if (!files.length || !window.FileReader) {
  //     return;
  //   }
  //   if (/^image/.test(files[0].type)) {
  //     // only image file
  //     var reader = new FileReader(); // instance of the FileReader
  //     reader.readAsDataURL(files[0]); // read the local file

  //     reader.onloadend = function () {
  //       $(holder).addClass("uploadInProgress");
  //       $(holder).find(".pic").attr("src", this.result);
  //       $(holder).append(
  //         '<div class="upload-loader"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div>'
  //       );

  //       // Dummy timeout; call API or AJAX below
  //       setTimeout(() => {
  //         $(holder).removeClass("uploadInProgress");
  //         $(holder).find(".upload-loader").remove();
  //         // If upload successful
  //         if (Math.random() < 0.9) {
  //           $(wrapper).append(
  //             '<div class="snackbar show" role="alert"><i class="fa fa-check-circle text-success"></i> Profile image updated successfully</div>'
  //           );

  //           // Clear input after upload
  //           $(triggerInput).val("");

  //           setTimeout(() => {
  //             $(wrapper).find('[role="alert"]').remove();
  //           }, 3000);
  //         } else {
  //           $(holder).find(".pic").attr("src", currentImg);
  //           $(wrapper).append(
  //             '<div class="snackbar show" role="alert"><i class="fa fa-times-circle text-danger"></i> There is an error while uploading! Please try again later.</div>'
  //           );

  //           // Clear input after upload
  //           $(triggerInput).val("");
  //           setTimeout(() => {
  //             $(wrapper).find('[role="alert"]').remove();
  //           }, 3000);
  //         }
  //       }, 1500);
  //     };
  //   } else {
  //     $(wrapper).append(
  //       '<div class="alert alert-danger d-inline-block p-2 small" role="alert">Please choose the valid image.</div>'
  //     );
  //     setTimeout(() => {
  //       $(wrapper).find('role="alert"').remove();
  //     }, 3000);
  //   }
  // });

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(''); //profileImage
  const [studentName, setStudentName] = useState('');

  const fetchingProfileData = () => {
    axios
      .post(APIs.MYPROFILE, {
        studentid,
      })
      .then((response) => {
        const fullrecords = response.data;
        const records = fullrecords[0];
        const name = records.Name
        const photo = records.Photo;
        debugger
        // const studentImageURL = `${Variables.BackendImagePath}/${records.Photo}`;
        const studentImageURL = `${Variables.FrontendImagePath}/${photo}`;
        // const studentImage = studentImageURL != "" ? studentImageURL : profileImage;
        // const studentImages = studentImageURL.toString();
        // const photos = require(photo);
        setDetails(records);
        setStudentName(name);
        console.log("Data->", response.data); 
        // setSelectedImage(photos); 
        // setSelectedImage(studentImage); 
        // console.log("Image URL->", studentImage);
        console.log("type of data -> ", typeof response.data);
        debugger
        const frontendPath = "../Images/ProfileImage";
        const imageUrl = `${frontendPath}/${photo}`; 
        setSelectedImage(imageUrl); 
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

  const changeStudentImage = (event) => {
    debugger
    const selectImage = event.target.value;
    // const imageFile = selectImage[0];
    // const imageName = imageFile.name;
    // const imageurl = `${Variables.FrontendImagePath}}/${imageName}`
    setSelectedImage(selectImage);
    // setSelectedImage(imageurl);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectImage = event.target.newProfilePhoto.files;
    const imageFile = selectImage[0];
    if (selectImage.length == 0) {
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
      console.log('Image name', imageName);
      uploadStudentImage(imageFile);
    }
  };

  const uploadStudentImage = (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("studenId", studentid);
    formData.append("studentName", studentName);
    console.log(formData);
    console.log(typeof formData);
    axios
      .post(`${APIs.STUDENTSPHOTO}/${studentid}`, formData, {
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
        fetchingProfileData();
      // }, 1500);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchingProfileData();
    setIsLoading(false);
  }, []);
  
  // // debugger
  //   const frontendPath = "/Images/ProfileImage";
  //   const imageFileName = details.Photo;
  //   const imageUrl = require(`${frontendPath}/${imageFileName}`); 

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

          <div className="gridBoxContainer">
            {/* <div className="profile-pic-wrapper" title={{studentName}}> */}
            <div className="profile-pic-box">
              <form onSubmit={handleSubmit}>
                <div className="pic-holder" title={{ studentName }}>
                  {/* <!-- uploaded pic shown here --> */}
                  <img
                    id="profilePic"
                    className="pic"
                    // src="https://source.unsplash.com/random/150x150?person"
                    src={selectedImage}
                    // src={imageUrl}
                    // src={require(`${process.env.PUBLIC_URL}/Images/ProfileImage/RITU KUMAR.jpeg`)}
                    // destination={{ url: "my-server.com/upload" }}
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
                    onChange={changeStudentImage}
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
                <p className="profileDataText">First Name:</p>
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
