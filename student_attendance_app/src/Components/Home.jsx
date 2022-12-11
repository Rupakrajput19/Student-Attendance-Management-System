import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Attendance from './Attendance';
import StudentForm from './StudentForm';


export default function Home() {
  document.title = "Home - Student Attendance App";
  return (
    <>
    <Header />
    <Sidebar/>

    <div style={{ textAlign: 'right',display: 'flex' ,margin: '120px 0 0 220px'}}>
      <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU" alt="image" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU" alt="image" />
      </div>
      <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU" alt="image" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU" alt="image" />
      </div>
      <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU" alt="image" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU" alt="image" />
      </div>
      <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm3Q8zPabLafXIioxhJvUphUv5o4FxjjhUrQ&usqp=CAU" alt="image" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgY-lgm9dT-jCpHMIVHAGtgmxIcJ5PqaHUw&usqp=CAU" alt="image" />
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
    </>
  )
}
