import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Attendance from "./Attendance";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { APIs } from "../APIs";

const columns = [
  // { field: "AttendanceID", headerName: "Attendance ID", width: 100, fontWeight: "bold" },
  {
    field: "StudentID",
    fontWeight: "bold",
    headerName: "Roll No.",
    type: "string",
    width: 110,
  },
  {
    field: "StudentName",
    fontWeight: "bold",
    headerName: "Students Name",
    width: 150,
  },
  {
    field: "AttendanceDate",
    fontWeight: "bold",
    headerName: "Attendance Date",
    type: "date",
    sortable: false,
    filterable: false,
    width: 200,
  },
  {
    field: "ClassName",
    fontWeight: "bold",
    headerName: "Class Name",
    type: "string",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "IsPresent",
    fontWeight: "bold",
    headerName: "Is Present",
    type: "string",
    sortable: false,
    filterable: false,
    width: 100,
  }, 
  {
    field: "CreatedBy",
    fontWeight: "bold",
    headerName: "Created By",
    type: "string",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "CreatedOn",
    fontWeight: "bold",
    headerName: "Created On",
    type: "dateTime",
    sortable: false,
    filterable: false,
    width: 200,
  }, // dateTime and date
];

const rows = [];

const onCheckboxClick = (ids) => {
  debugger;
  const selectedRowsData = ids.map((id) =>
    rows.find((row) => row.StudentID === id)
  );
  console.log("checkbox clicked");
  console.log(selectedRowsData);
};

export default function AttendanceList(props) {
  document.title = `Attendance - ${props.pageTitle}`;

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  const [data, setData] = useState([]);

  const userId = 1; // userId will come from redux
  const studentId = 15
  const isAdmin = true; // isAdmin will from redux

  useEffect(() => {
    axios
      .post(APIs.ATTEDNDANCES, {
        userId,
        studentId
      })
      .then((response) => {
        const records = response.data;
        setData(records);
        console.log("Data->", response.data);
        console.log("type of data -> ", typeof response.data);
      })
      .catch((err) => {
        swal("Unable to fetch data", err.message);
      });
  }, []);

  return (
    <>
      <Header />

      <Sidebar />
      
      {isAdmin ?
      <div className="login_link login_btn attendance_modal">
        <Attendance />
      </div>
      : "" }

      <Typography
        variant="h4"
        component="div"
        sx={{
          textAlign: "center",
          margin: "120px auto 20px 235px",
          color: "black",
          fontWeight: "bold",
          textDecoration: "underline",
        }}
      >
        Attendances Reports
      </Typography>

      <div
        style={{
          height: 670,
          width: "84%",
          textAlign: "center",
          margin: "30px 30px 30px 235px",
          background: "white",
          border: "2px solid black",
          // display: "flex"
        }}
      >
        {/* <Checkbox
        sx={{
          color: "black",
          "&.Mui-checked": {
            color: "blue",  
          },
        }}
        /> */}
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          // disableSelectionOnClick
          // onSelectionModelChange ={ (ids) => onCheckboxClick(ids)}
          getRowId={(rows) => rows.AttendanceID}
          // {...data}
        />
      </div>
    </>
  );
}
