import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Sidebar from "./Sidebar";
import Header from "./Header";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { APIs } from "../APIs";
import { Ring } from "../Ring";
import moment from "moment";

const columns = [
  { field: "UserID", headerName: "User ID", width: 100, fontWeight: "bold" },
  {
    field: "Name",
    fontWeight: "bold",
    type: "string",
    headerName: "Full Name",
    width: 150,
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
    width: 150,
  },
  {
    field: "IsAdmin",
    fontWeight: "bold",
    headerName: "Is Admin",
    type: "string",
    sortable: false,
    filterable: false,
    width: 100,
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
    valueFormatter: params => 
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
    valueFormatter: params => 
    moment(params?.value).format("DD/MM/YYYY hh:mm A"),
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
        <Button variant="contained" color="primary" onClick={HandleEdit}>
          <EditIcon />
        </Button>
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
          
          <Button variant="contained" color="error" onClick={() => Handledelete(record.id)} >
          <DeleteIcon />
          </Button>
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

const HandleEdit = (params) => {
  const id = params.UserID;
  // debugger;
  axios
    .put(`${APIs.USER}/${id}`)
    .then((res) => {
      console.log("Student Data Updated Successfully", res);
      // Reload_func();
      swal({
        title: "Student Data Updated Successfully",
        timer: 1500,
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
          timer: 1500,
        });
      });
};

const Handledelete = (id) => {
  swal({
    title: "Are you sure?",
    text: "Do You Really Want To Delete This Student ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    axios
    .delete(`${APIs.USER}/${id}`)
    .then((res) => {
      if(res.data === 'User Deleted Successfully' && res.status === 200){
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
  }
  )};


export default function UsersList(props) {
  document.title = `Users List - ${props.pageTitle}`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
    .get(APIs.USER)
    .then((response) => {
        const records = response.data;
        setData(records);
        console.log("Data->", response.data);
        console.log("type of data -> ", typeof response.data);
      })
      .catch((err) => {
        swal({
          title:"Unable to fetch data",
          text: `${err.message}`,
          timer: 1500
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

      <Typography
        variant="h4"
        component="div"
        className="typographyText"
        // sx={{
        //   textAlign: "center",
        //   margin: "120px auto 20px 235px",
        //   color: "black",
        //   // fontWeight: "bold",
        //   textDecoration: "underline",
        // }}
      >
        Registered Users List
      </Typography>

      <div
      className="gridBoxContainer"
        // style={{
        //   height: 670,
        //   width: "84%",
        //   textAlign: "center",
        //   margin: "30px 30px 30px 235px",
        //   background: "white",
        //   border: "2px solid black",
        //   borderRadius: "8px"
        //   // display: "flex"
        // }}
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
          //   checkboxSelection
          //   disableSelectionOnClick
          //   onSelectionModelChange ={ (ids) => onCheckboxClick(ids)}
          getRowId={(rows) => rows.UserID}
          // {...data}
        />
      </div>
      </div>
     )}
    </>
  );
}
