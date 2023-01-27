import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Attendance from "./Attendance";
import StudentForm from "./StudentForm";

export default function Home(props) {
  document.title = `Home - ${props.pageTitle}`;
  return (
    <>
      <Header />
      <Sidebar />
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          margin: "120px 0 0 220px",
        }}
      >
        <div>
          <img
            style={{ height: "450px", width: "900px" }}
            src="https://static.javatpoint.com/blog/images/student-management-system.png"
            alt="home_image_loading"
          />
        </div>
        <div style={{ margin: "10px 30px" }}>
          <p className="home_text">
            A {props.pageTitle} is a cloud-based education
            ERP software that allow education schools and institutions to handle
            online admission, student enrollment, student's attendance, online
            fees, grades, assignments, liabrary books and other aspects of their
            operations. <br />
            <br /> The numerous functions in the students management process are
            the subject of this project. The fundamental concept is to add a
            proper process to the system. Many functions are available in our
            current system, including registration, student search fees,
            attendance, exam records and student performance and I will try add
            more feature in future...
          </p>
        </div>
        <div>
          <img
            style={{ height: "450px", width: "900px" }}
            src="https://www.skoolbeep.com/blog/wp-content/uploads/2020/12/min-Advantages-of-Attendance-Management-System.png"
            alt="home_image_loading"
          />
        </div>
        <div>
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://cdn.techjockey.com/blog/wp-content/uploads/2020/05/Online-Attendance-System-for-Students_banner.png"
            alt="home_image_loading"
          />
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQV2qBD5bVy6AuC1Nsd1fj4UceFYcHhyB2ww&usqp=CAU"
            alt="home_image_loading"
          />
        </div>
        <div>
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8GriC6-zNHQEGKLKcddfC4zpysCVuieuvQ&usqp=CAU"
            alt="home_image_loading"
          />
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNGAN7-HVe7o_4eesJ25HwBviZ9jPbboYTiQ&usqp=CAU"
            alt="home_image_loading"
          />
        </div>
        <div>
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU"
            alt="home_image_loading"
          />
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU"
            alt="home_image_loading"
          />
        </div>
        <div>
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ivm9d5dxovlorc-0V4ZKTfc9oDic_CQhTg&usqp=CAU"
            alt="home_image_loading"
          />
          <img
            style={{ height: "400px", width: "500px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCen44f0RbeZtPDHviAoluElwBGkrvEESWw&usqp=CAU"
            alt="home_image_loading"
          />
        </div>
      </div>
      {/* <Attendance /> */}
      {/* <StudentForm /> */}
    </>
  );
}
