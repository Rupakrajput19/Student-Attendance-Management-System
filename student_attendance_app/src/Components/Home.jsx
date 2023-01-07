import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Attendance from "./Attendance";
import StudentForm from "./StudentForm";

export default function Home() {
  document.title = "Home - Student Attendance Management System";
  return (
    <>
      <Header />
      <Sidebar />
      <div
        style={{
          textAlign: "right",
          display: "flex",
          margin: "120px 0 0 220px",
        }}
      >
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU"
            alt="image"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU"
            alt="image"
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU"
            alt="image"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU"
            alt="image"
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU"
            alt="image"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU"
            alt="image"
          />
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU"
            alt="image"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU"
            alt="image"
          />
        </div>
        {/* <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU" alt="image" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU" alt="image" />
      </div>
      <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU" alt="image" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU" alt="image" />
      </div> */}
      </div>
      {/* <Attendance /> */}
      {/* <StudentForm /> */}
      Student Attendance Management System A Student Attendance Management
      System is a cloud-based education ERP software that allow education
      schools and institutions to handle online admission, student enrollment,
      student's attendance, online fees, grades, assignments, liabrary books and
      other aspects of their operations. <br /><br /> The numerous functions in the students
      management process are the subject of this project. The fundamental
      concept is to add a proper process to the system.Many functions are
      available in our current system, including registration, student search
      fees, attendance, exam records and student performance.
    </>
  );
}
