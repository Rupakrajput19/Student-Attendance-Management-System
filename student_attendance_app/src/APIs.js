
// API's Url's in an object.

const API_URL = "https://localhost:44367/api/";

export const APIs = {
  LOGIN: API_URL + "LoginControllers",
  USER: API_URL + "UsersControllers",
  STUDENTS: API_URL + "StudentsControllers",
  ATTEDNDANCES: API_URL + "AttendancesControllers",
  MYPROFILE: API_URL + "MyProfileControllers",
  FORGOTPASSWORD: API_URL + "ForgotPasswordControllers",
  STUDENTSPHOTO: API_URL + "MyProfileControllers/SaveFile", // API's for Students Photos
};


// **-- API's --**

// 1. https://localhost:44367/api/LoginControllers -- "Login" - ("Post" - To get data of User with params)
// 2. https://localhost:44367/api/UsersControllers -- "Users" - ("Get", "Post", "Put", "Delete")
// 3. https://localhost:44367/api/StudentsControllers -- "Students" - ("Get", "Post", "Put", "Delete")
// 4. https://localhost:44367/api/AttendancesControllers -- "Attendances" - ("Get", "Post", "Put", "Delete")
// 5. https://localhost:44367/api/ForgotPasswordControllers -- "Password" - ("Post" - Password Recover), ("Put" - Forgot Password)
// 6. https://localhost:44367/api/MyProfileControllers -- "MyProfile" - ("Post" - Get Student Profile), ("Post" - Students Photos)


// Notes: If user dont know username and email then user need to contact on 9599408303 - ritukumar456061@gmail.com

// For Delete API's I have done with Update Query and Marked IsDeleted True

// ----------------------
// 1.Get api - (Login/Users/Students/Attendances) - Done
// 2.Post api - (Users/Students/Attendances) - Done
// 3.Put/Update api - (Users/Students/Attendances) - Done
// 4.Delete api - /id - (Users/Students/Attendances) - Done
// ----------------------
