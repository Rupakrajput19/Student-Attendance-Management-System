import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "./Sidebar";
import Header from "./Header";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { APIs } from "../APIs";

const columns = [
  { field: "UserID", headerName: "User ID", width: 100, fontWeight: "bold" },
  {
    field: "Name",
    fontWeight: "bold",
    type: "string",
    headerName: "Full Name",
    width: 140,
  },
  {
    field: "UserName",
    fontWeight: "bold",
    headerName: "User Name",
    type: "string",
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: "Mobile",
    fontWeight: "bold",
    headerName: "Mobile",
    type: "string",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "Email",
    fontWeight: "bold",
    headerName: "Email",
    type: "string",
    sortable: false,
    filterable: false,
    width: 200,
  },
  {
    field: "Password",
    fontWeight: "bold",
    headerName: "Password",
    type: "string",
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: "IsAdmin",
    fontWeight: "bold",
    headerName: "Is Admin",
    type: "string",
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: "IsDeleted",
    fontWeight: "bold",
    headerName: "Is Deleted",
    type: "string",
    sortable: false,
    filterable: false,
    width: 120,
  },
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
    sortable: false,
    filterable: false,
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
    sortable: false,
    filterable: false,
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

// const onCheckboxClick = (ids) => {
//   debugger
//   const selectedRowsData = ids.map((id) => rows.find((row) => row.StudentID === id));
//     console.log('checkbox clicked');
//     console.log(selectedRowsData);
// };

const updateData = (params) => {
  const id = params.UserID;
  // debugger;
  axios
    .put(`${APIs.USER}/${id}`)
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
    .catch((error) => {
      swal({
          title: `Something went wrong: ${error.message}`,
          text: "Unable to get response from backend, please try again later!",
          icon: "error",
        });
      });
};

const deleteData = (id) => {
  const confrimBox = window.confirm(
    "Do You Really Want To Delete This Student ?"
  );
  if (confrimBox) { 
    axios
    .delete(`${APIs.USER}/${id}`)
    .then((res) => {
      if(res.data === 'User Deleted Successfully' && res.status === 200){
        swal({
          title: `${res.data}!`,
        });
        setInterval(() => {
          window.location.reload(false);
        }, 3000);
      }
    })
    .catch((error) => {
    swal({
        title: `Something went wrong: ${error.message}`,
        text: "Unable to get response from backend, please try again later!",
        icon: "error",
      });
    });
  }
  else{
    return false;
  }
};

export default function UsersList(props) {
  document.title = `Users List - ${props.pageTitle}`;

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
      .get(APIs.USER)
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
        Registered Users List
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
          pageSize={25}
          rowsPerPageOptions={[25]}
          //   checkboxSelection
          //   disableSelectionOnClick
          //   onSelectionModelChange ={ (ids) => onCheckboxClick(ids)}
          getRowId={(rows) => rows.UserID}
          // {...data}
        />
      </div>
    </>
  );
}
