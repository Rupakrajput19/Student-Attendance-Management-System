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
import { Variables } from "../Variables";
import { APIs } from "../APIs";
import { Ring } from "../Ring";
import moment from "moment";
import { useSelector } from "react-redux";

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
    width: 200,
  },
  {
    field: "AttendanceDate",
    fontWeight: "bold",
    headerName: "Attendance Date",
    type: "date",
    sortable: false,
    filterable: false,
    width: 150,
    valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
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
    field: "IsPresents",
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
    headerName: "Attendance Added Date",
    type: "date",
    sortable: false,
    filterable: false,
    width: 200,
    valueFormatter: (params) =>
      moment(params?.value).format("DD/MM/YYYY hh:mm A"),
  }, // dateTime and date
];

const rows = [];

const onCheckboxClick = (ids) => {
  const selectedRowsData = ids.map((id) =>
    rows.find((row) => row.StudentID === id)
  );
  console.log("checkbox clicked");
  console.log(selectedRowsData);
};

export default function AttendanceList(props) {
  document.title = `Attendance - ${props.pageTitle}`;

  const user = useSelector((state) => state.user);
  
  var userId = 0;
  var studentId = 0;
  var isAdmin = false;
  var isStudent = false;
  if (user) {
    userId = user.UserID ? user.UserID : 0;
    studentId = user.StudentID ? user.StudentID : 0;
    isAdmin = user.IsAdmin ? user.IsAdmin : false;
    isStudent = user.IsStudent ? user.IsStudent : false;
    console.log(user);
    console.log("userId =>", userId);
    console.log("studentId =>", studentId);
    console.log("isAdmin =>", isAdmin);
    console.log("isStudent =>", isStudent);
  } else {
    console.log(Variables.NoDetailFoundInRedux);
  }

  const topgridBoxContainer = isAdmin ? 'topgridBoxContainer' : '';
  const dynamicsClasses = `gridBoxContainer ${topgridBoxContainer}`;

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchingAttendances = () => {
    axios
      .post(APIs.ATTEDNDANCES, {
        userId,
        studentId,
      })
      .then((response) => {
        const records = response.data;
        setData(records);
        console.log("Data->", response.data);
        console.log("type of data -> ", typeof response.data);
      })
      .catch((err) => {
        swal({
          title: "Unable to fetch data",
          text: `${err.message}`,
          timer: 2000,
        });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchingAttendances();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header />

      <Sidebar />

      {isLoading && <Ring />}
      {!isLoading && (
        <div>
          {isAdmin ? (
            <div className="login_link login_btn">
              <Attendance fetchingAttendances={fetchingAttendances}/>
            </div>
          ) : (
            ""
          )}

          <Typography variant="h4" component="div" className="typographyText">
            Attendances Reports
          </Typography>

          <div className={dynamicsClasses}>
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
        </div>
      )}
    </>
  );
}
