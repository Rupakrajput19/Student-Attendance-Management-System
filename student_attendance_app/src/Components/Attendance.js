import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios, {isCancel, AxiosError} from 'axios';
import { APIs } from "../APIs";

const columns = [
  // { field: "id", headerName: "Roll No.", width: 100, fontWeight: "bold" },
  {
    field: "id",
    headerName: "ID",
    width: 250,
    headerClassName: "super-app-theme--header",
    // headerAlign: "center",
  },
  {
    field: "Name",
    fontWeight: "bold",
    headerName: "Full Name",
    width: 140,
  },
  {
    field: "fatherName",
    fontWeight: "bold",
    headerName: "Father Name",
    sortable: false,
    filterable: false,
    width: 140,
  },
  {
    field: "motherName",
    fontWeight: "bold",
    headerName: "Mother Name",
    sortable: false,
    filterable: false,
    width: 140,
  },
  {
    field: "DOB",
    fontWeight: "bold",
    headerName: "Date of birth",
    type: "date",
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: "RegistrationId",
    fontWeight: "bold",
    headerName: "Registration Id",
    type: "string",
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: "gender",
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
    field: "email",
    fontWeight: "bold",
    headerName: "Email",
    type: "email",
    sortable: false,
    filterable: false,
    width: 140,
  },
  {
    field: "Branch",
    fontWeight: "bold",
    headerName: "Branch",
    type: "string",
    sortable: false,
    filterable: false,
    width: 180,
  },
  {
    field: "Course",
    fontWeight: "bold",
    headerName: "Class Name",
    type: "string",
    sortable: false,
    filterable: false,
    width: 120,
  },
  {
    field: "AddmissionDate",
    fontWeight: "bold",
    headerName: "Addmission Date",
    type: "string",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "Address",
    fontWeight: "bold",
    headerName: "Address",
    type: "string",
    sortable: false,
    filterable: false,
    width: 150,
  },
  // {
  //   field: "City",
  //   fontWeight: "bold",
  //   headerName: "City",
  //   type: "string",
  //   sortable: false,
  //   filterable: false,
  //   width: 150,
  // },
  // {
  //   field: "State",
  //   fontWeight: "bold",
  //   headerName: "State",
  //   type: "string",
  //   sortable: false,
  //   filterable: false,
  //   width: 150,
  // },
  // {
  //   field: "Country",
  //   fontWeight: "bold",
  //   headerName: "Country",
  //   type: "string",
  //   sortable: false,
  //   filterable: false,
  //   width: 150,
  // },
  // {
  //   field: "Pincode",
  //   fontWeight: "bold",
  //   headerName: "Pincode",
  //   type: "string",
  //   sortable: false,
  //   filterable: false,
  //   width: 150,
  // },
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
          <EditIcon />
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
    renderCell: () => {
      return (
        <div
          className="d-flex justify-content-center aligh-item-center"
          style={{ cursor: "pointer" }}
        >
          <DeleteIcon />
        </div>
      );
    },
  },
];

const rows = [];
// const rows = [
//   {
//     id: 22,
//     Name: "Lalit Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "22/05/2001",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
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
//   },
//   {
//     id: 54,
//     Name: "Mukesh Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "25/01/1992",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "BCA",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 46,
//     Name: "Vikash",
//     fatherName: "Rupak Rajput",
//     DOB: "10/06/2003",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Delhi",
//   },
//   {
//     id: 2,
//     Name: "Lalit Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "22/05/2001",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 3,
//     Name: "Aniket Kumar",
//     fatherName: "Rupak Rajput",
//     DOB: "05/11/1997",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "Mumbai",
//   },
//   {
//     id: 4,
//     Name: "Abhishek NA",
//     fatherName: "Rupak Rajput",
//     DOB: "16/04/1995",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "BCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Haryana",
//   },
//   {
//     id: 5,
//     Name: "Mukesh Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "25/01/1992",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 6,
//     Name: "Vikash ",
//     fatherName: "Rupak Rajput",
//     DOB: "10/06/2003",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "Delhi",
//   },
//   {
//     id: 7,
//     Name: "Aditya Saxena",
//     fatherName: "Rupak Rajput",
//     DOB: "31/08/1999",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Punjab",
//   },
//   {
//     id: 37,
//     Name: "Aditya Saxena",
//     fatherName: "Rupak Rajput",
//     DOB: "31/08/1999",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "BCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Punjab",
//   },
//   {
//     id: 38,
//     Name: "Sandeep Rohila",
//     fatherName: "Rupak Rajput",
//     DOB: "26/11/1998",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Chennai",
//   },
//   {
//     id: 93,
//     Name: "Umesh Chakartboty",
//     fatherName: "Rupak Rajput",
//     DOB: "15/01/1994",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "Delhi",
//   },
//   {
//     id: 32,
//     Name: "Lalit Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "22/05/2001",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 53,
//     Name: "Aniket Kumar",
//     fatherName: "Rupak Rajput",
//     DOB: "05/11/1997",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "BCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Mumbai",
//   },
//   {
//     id: 44,
//     Name: "Abhishek NA",
//     fatherName: "Rupak Rajput",
//     DOB: "16/04/1995",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "Haryana",
//   },
//   {
//     id: 50,
//     Name: "Mukesh Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "25/01/1992",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 86,
//     Name: "Vikash ull",
//     fatherName: "Rupak Rajput",
//     DOB: "10/06/2003",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Delhi",
//   },
//   {
//     id: 78,
//     Name: "Aditya Saxena",
//     fatherName: "Rupak Rajput",
//     DOB: "31/08/1999",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Punjab",
//   },
//   {
//     id: 2,
//     Name: "Lalit Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "22/05/2001",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 3,
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
//     id: 4,
//     Name: "Abhishek NA",
//     fatherName: "Rupak Rajput",
//     DOB: "16/04/1995",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "BCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Haryana",
//   },
//   {
//     id: 5,
//     Name: "Mukesh Yadav",
//     fatherName: "Rupak Rajput",
//     DOB: "25/01/1992",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "UP",
//   },
//   {
//     id: 6,
//     Name: "Vikash saa",
//     fatherName: "Rupak Rajput",
//     DOB: "10/06/2003",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "MCA",
//     AddmissionDate: "01/01/2023",
//     Address: "Delhi",
//   },
//   {
//     id: 7,
//     Name: "Aditya Saxena",
//     fatherName: "Rupak Rajput",
//     DOB: "31/08/1999",
//     Mobile: "9876543210",
//     Branch: "Computer Sceince",
//     Course: "B.Tech",
//     AddmissionDate: "01/01/2023",
//     Address: "Punjab",
//   },
// ];

const onCheckboxClick = (ids) => {
  const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    console.log('checkbox clicked');
    console.log(selectedRowsData);
};

export default function Attendance(props) {
  document.title = `Attendance - ${props.pageTitle}`;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
    .get(APIs.STUDENTS)
    .then((response) => {
        debugger
        // console.log("Data fetched successfully!");
        const records = response.data;
        setData(records);
        console.log("Data->", response.data );
        console.log("type of data -> ", typeof response.data);
      })
      .catch((err) => {
        console.log("Unable to fetch data", err);
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
          width: "90%",
          textAlign: "center",
          margin: "30px auto 30px 235px",
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
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange ={ (ids) => onCheckboxClick(ids)}
          getRowId={(rows) => rows.id}
          // {...data}
        />
      </div>
    </>
  );
}
