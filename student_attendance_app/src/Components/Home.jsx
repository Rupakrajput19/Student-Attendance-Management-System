import React from 'react';
import Header from './Header';
import Attendance from './Attendance';

export default function Home() {
  document.title = "Home - Student Attendance App";
  return (
    <>
    <Header />
    <Attendance />
    </>
  )
}
