// Regex Variable

export const Variables = {
  // Regex
  EmailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  PasswordRegex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#.$!^%*?&]{8,20}$/,

  // Validations Errors

  Empty: "Please Enter ",


  // Message when user details not found in redux store
  NoDetailFoundInRedux : "No. User Imformation found in redux, please login again!",

  // Image URL for frontend/backend

  FrontendImagePath:
  "C:/Users/Ritu Kumar/OneDrive/Desktop/Student_Attendance_Management_System/student_attendance_app/src/Images/ProfileImage",
  BackendImagePath:
  "C:/Users/Ritu Kumar/OneDrive/Desktop/Student_Attendance_Management_System/Backend_C#/Students/Photos",
};

