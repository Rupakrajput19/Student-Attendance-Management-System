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
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { APIs } from "../APIs";
import { Ring } from "../Ring";
import moment from "moment";
import Button from "@mui/material/Button";
import EditStudents from "../Components/EditStudents";
import "@mui/icons-material";

export default function StudentDetails(props) {
  document.title = `Student Details - ${props.pageTitle}`;
  const Navigator = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    // { field: "StudentID", headerName: "Student ID", width: 100, fontWeight: "bold" },
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
      sortable: false,
      filterable: false,
      width: 120,
    },
    {
      field: "ClassName",
      fontWeight: "bold",
      headerName: "Class Name",
      type: "string",
      sortable: false,
      filterable: false,
      width: 120,
    },
    {
      field: "Name",
      fontWeight: "bold",
      headerName: "Full Name",
      width: 140,
    },
    {
      field: "FatherName",
      fontWeight: "bold",
      headerName: "Father Name",
      sortable: false,
      filterable: false,
      width: 140,
    },
    {
      field: "MotherName",
      fontWeight: "bold",
      headerName: "Mother Name",
      sortable: false,
      filterable: false,
      width: 140,
    },
    {
      field: "DateOfBirth",
      fontWeight: "bold",
      headerName: "Date of birth",
      type: "date",
      sortable: false,
      filterable: false,
      width: 200,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "Gender",
      fontWeight: "bold",
      headerName: "Gender",
      sortable: false,
      filterable: false,
      width: 140,
    },
    {
      field: "Mobile",
      fontWeight: "bold",
      headerName: "Mobile No.",
      type: "string",
      sortable: false,
      filterable: false,
      width: 120,
    },
    {
      field: "Email",
      fontWeight: "bold",
      headerName: "Email",
      type: "email",
      sortable: false,
      filterable: false,
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
      sortable: false,
      filterable: false,
      width: 200,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "IsActive",
      fontWeight: "bold",
      headerName: "Is Active",
      type: "string",
      sortable: false,
      filterable: false,
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
      width: 120,
    },
    {
      field: "CreatedOn",
      fontWeight: "bold",
      headerName: "Created On",
      type: "dateTime",
      sortable: false,
      filterable: false,
      width: 200,
      valueFormatter: (params) =>
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: "ModifiedBy",
      fontWeight: "bold",
      headerName: "Modified By",
      type: "string",
      sortable: false,
      filterable: false,
      width: 120,
    },
    {
      field: "ModifiedOn",
      fontWeight: "bold",
      headerName: "Modified On",
      type: "dateTime",
      sortable: false,
      filterable: false,
      width: 200,
      valueFormatter: (params) =>
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
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
            <Button variant="contained" color="primary" onClick={() => HandleEdit(record)} >
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
            <Button variant="contained" color="error" onClick={() => Handledelete(record.id)} >
              <DeleteIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  const onCheckboxClick = (ids) => {
    debugger;
    // const selectedRowsData = ids.map((id) =>
    //   rows.find((row) => row.StudentID === id)
    // );
    // console.log("checkbox clicked");
    // console.log(selectedRowsData);
  };

  const HandleEdit = (record) => {
    debugger;
    const data = record.row;
    // <EditStudents StudentData={record.row}/>
    Navigator(`/editStudent/${data.StudentID}`, { state: { StudentData: data } });
  };

  const Handledelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Do You Really Want To Delete This Student ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${APIs.STUDENTS}/${id}`)
          .then((res) => {
            if (
              res.data === "Student Deleted Successfully" &&
              res.status === 200
            ) {
              swal({
                title: `${res.data}!`,
                icon: "success",
                timer: 1500,
              });
              setInterval(() => {
                window.location.reload(false);
              }, 1500);
            }
          })
          .catch((error) => {
            swal({
              title: `Something went wrong: ${error.message}`,
              text: "Unable to get response from backend, please try again later!",
              icon: "error",
              timer: 1500,
            });
          });
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
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

          <div className="gridBoxContainer">
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
