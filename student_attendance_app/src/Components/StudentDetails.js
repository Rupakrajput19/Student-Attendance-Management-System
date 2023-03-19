import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar";
import Header from "./Header";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { APIs } from "../APIs";

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
  },
  {
    field: "Edit",
    headerClassName: "super-app-theme--header",
    // headerAlign: 'center',
    sortable: false,
    filterable: false,
    // width: 40,
    renderCell: () => {
      return (
        <div
          className="d-flex justify-content-center aligh-item-center"
          style={{ cursor: "pointer" }}
        >
          <EditIcon onClick={updateData} />
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
          <DeleteIcon onClick={() => deleteData(record.id)} />
        </div>
      );
    },
  },
];

const rows = [];
// const rows = [
//   {
//     id: 33,
//     Name: "Aniket Kumar",
//     fatherName: "Rupak Rajput",
//     DOB: "05/11/1997",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Mumbai",
//   },
//   {
//     id: 43,
//     Name: "Abhishek NA",
//     fatherName: "Rupak Rajput",
//     DOB: "16/04/1995",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "Haryana",
//   }
// ];

const onCheckboxClick = (ids) => {
  debugger;
  const selectedRowsData = ids.map((id) =>
    rows.find((row) => row.StudentID === id)
  );
  console.log("checkbox clicked");
  console.log(selectedRowsData);
};

const updateData = (params) => {
  const id = params.StudentID;
  // debugger;
  axios
    .put(`${APIs.STUDENTS}/${id}`)
    .then((res) => {
      console.log("Student Data Updated Successfully", res);
      // Reload_func();
      swal({
        title: "Student Data Updated Successfully",
      });
      // setInterval(() => {
      //   window.location.reload(false);
      // }, 3000);
    })
    .catch((errors) => {
      console.log("Unable to update Student data", errors);
      swal({
        title: "Something went wrong!",
        text: "Unable to update Student details\nPlease try again later...",
      });
    });
};

const deleteData = (id) => {
  const confrimBox = window.confirm(
    "Do You Really Want To Delete This Student ?"
  );
  if (!confrimBox) {
    return false;
  }
  axios
    .delete(`${APIs.STUDENTS}/${id}`)
    .then((res) => {
      console.log("Student Data Deleted Successfully", res);
      // Reload_func();
      swal({
        title: "Student Data Deleted Successfully",
      });
      setInterval(() => {
        window.location.reload(false);
      }, 3000);
    })
    .catch((errors) => {
      console.log("Unable to delete Student data", errors);
      swal({
        title: "Something went wrong!",
        text: "Unable to delete Student details\nPlease try again later...",
      });
    });
};

export default function StudentDetails(props) {
  document.title = `Student Details - ${props.pageTitle}`;

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(APIs.STUDENTS)
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
        Student Details
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
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          // disableSelectionOnClick
          // onSelectionModelChange ={ (ids) => onCheckboxClick(ids)}
          getRowId={(rows) => rows.StudentID}
          // {...data}
        />
      </div>
    </>
  );
}
