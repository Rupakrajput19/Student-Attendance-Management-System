import { React, useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import Header from "./Header";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import {
  Link,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { APIs } from "../APIs";
import { Ring } from "../Ring";
import moment from "moment";
import { Variables } from "../Variables";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import EditStudents from "./EditStudents";
import "@mui/icons-material";

export default function StudentsList(props) {
  document.title = `Student Details - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const columns = [
    {
      field: "StudentID",
      headerName: "Roll No.",
      width: 100,
      headerClassName: "super-app-theme--header",
      // headerAlign: "center",
    },
    {
      field: "RegistrationID",
      fontWeight: "bold",
      headerName: "Registration Id",
      type: "string",
      sortable: true,
      filterable: true,
      width: 120,
    },
    {
      field: "ClassName",
      fontWeight: "bold",
      headerName: "Class Name",
      type: "string",
      sortable: true,
      filterable: true,
      width: 120,
    },
    {
      field: "Name",
      fontWeight: "bold",
      headerName: "Full Name",
      width: 175,
    },
    {
      field: "FatherName",
      fontWeight: "bold",
      headerName: "Father Name",
      sortable: false,
      filterable: false,
      width: 175,
    },
    {
      field: "MotherName",
      fontWeight: "bold",
      headerName: "Mother Name",
      sortable: false,
      filterable: false,
      width: 175,
    },
    {
      field: "DateOfBirth",
      fontWeight: "bold",
      headerName: "Date of birth",
      type: "date",
      sortable: true,
      filterable: true,
      width: 200,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "Gender",
      fontWeight: "bold",
      headerName: "Gender",
      sortable: true,
      filterable: true,
      width: 140,
    },
    {
      field: "Mobile",
      fontWeight: "bold",
      headerName: "Mobile No.",
      type: "string",
      sortable: true,
      filterable: true,
      width: 120,
    },
    {
      field: "Email",
      fontWeight: "bold",
      headerName: "Email",
      type: "email",
      sortable: false,
      filterable: true,
      width: 200,
    },
    {
      field: "FullAddress",
      fontWeight: "bold",
      headerName: "Address",
      type: "string",
      sortable: false,
      filterable: false,
      width: 500,
    },
    {
      field: "AddmissionDate",
      fontWeight: "bold",
      headerName: "Addmission Date",
      type: "string",
      sortable: true,
      filterable: true,
      width: 200,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "UserName",
      fontWeight: "bold",
      headerName: "UserName",
      type: "string",
      sortable: true,
      filterable: true,
      width: 150,
    },
    {
      field: "Password",
      fontWeight: "bold",
      headerName: "Password",
      type: "string",
      sortable: true,
      filterable: true,
      width: 150,
    },
    {
      field: "IsActives",
      fontWeight: "bold",
      headerName: "Is Active",
      type: "string",
      sortable: true,
      filterable: true,
      width: 100,
    },
    // {
    //   field: "IsDeleted",
    //   fontWeight: "bold",
    //   headerName: "Is Deleted",
    //   type: "string",
    //   sortable: false,
    //   filterable: false,
    //   width: 120,
    // },
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
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: "ModifiedBy",
      fontWeight: "bold",
      headerName: "Modified By",
      type: "string",
      sortable: false,
      filterable: false,
      width: 200,
    },
    {
      field: "ModifiedOn",
      fontWeight: "bold",
      headerName: "Modified On",
      type: "dateTime",
      sortable: false,
      filterable: false,
      width: 200,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: "Edit",
      headerClassName: "super-app-theme--header",
      // headerAlign: 'center',
      sortable: false,
      filterable: false,
      // width: 40,
      renderCell: (record) => {
        return (
          <div
            className="d-flex justify-content-center aligh-item-center"
            style={{ cursor: "pointer" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(record)}
            >
              <EditIcon />
            </Button>
          </div>
        );
      },
    },
    {
      field: "Delete",
      headerClassName: "super-app-theme--header",
      // headerAlign: 'center',
      sortable: false,
      filterable: false,
      // width: 70,
      renderCell: (record) => {
        return (
          <div
            className="d-flex justify-content-center aligh-item-center"
            style={{ cursor: "pointer" }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => handledelete(record)}
            >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  const onCheckboxClick = (ids) => {
    // const selectedRowsData = ids.map((id) =>
    //   rows.find((row) => row.StudentID === id)
    // );
    // console.log("checkbox clicked");
    // console.log(selectedRowsData);
  };

  const fetchingStudentData = () => {
    axios
      .get(APIs.STUDENTS)
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
          timer: 1500,
        });
      });
  };

  const deletingStudent = (id) => {
    axios
      .delete(`${APIs.STUDENTS}/${id}`)
      .then((res) => {
        if (res.data === "Student Deleted Successfully" && res.status === 200) {
          swal({
            title: `${res.data}!`,
            icon: "success",
            timer: 1500,
          });
          fetchingStudentData();
          // setInterval(() => {
          //   // window.location.reload(false);
          // }, 1500);
        }
      })
      .catch((error) => {
        swal({
          title: `Something went wrong: ${error.message}`,
          text: "Unable to get response from backend, please try again later!",
          icon: "error",
          timer: 2000,
        });
      });
  };

  const handleEdit = (record) => {
    const data = record.row;
    // <EditStudents StudentData={record.row}/>
    Navigator(`/editStudent/${data.StudentID}`, {
      state: { StudentData: data },
    });
  };

  const handledelete = (record) => {
    const data = record.row;
    swal({
      title: "Are you sure?",
      text: "Do You Really Want To Delete This Student ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletingStudent(data.StudentID);
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchingStudentData();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Header />

      <Sidebar />

      {isLoading && <Ring />}
      {!isLoading && (
        <div>
          <Typography variant="h4" component="div" className="typographyText">
            Student Details
          </Typography>

          {isAdmin ? (
            <Link to="/form" className="header_btn attendance_modal">
              Add New Student
            </Link>
          ) : (
            ""
          )}

          <div className="gridBoxContainer TopgridBoxContainer">
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(rows) => rows.StudentID}
            />
          </div>
        </div>
      )}
    </>
  );
}
