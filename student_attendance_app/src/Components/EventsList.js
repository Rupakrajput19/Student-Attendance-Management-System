import { React, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Events from "./Events";
import swal from "sweetalert";
import axios, { isCancel, AxiosError } from "axios";
import { Variables } from "../Variables";
import { APIs } from "../APIs";
import { Ring } from "../Ring";
import moment from "moment";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

export default function EventsList(props) {
  document.title = `Events - ${props.pageTitle}`;

  const columns = [
    // { field: "EventId", headerName: "Event Id", width: 100, fontWeight: "bold" },
    {
      field: "EventId",
      fontWeight: "bold",
      headerName: "Event Id",
      type: "string",
      width: 110,
    },
    {
      field: "EventName",
      fontWeight: "bold",
      headerName: "Event Name",
      width: 200,
    },
    {
      field: "EventOwner",
      fontWeight: "bold",
      headerName: "Event Onwer",
      type: "string",
      sortable: false,
      filterable: false,
      width: 150,
    },
    {
      field: "EventDate",
      fontWeight: "bold",
      headerName: "Event Date",
      type: "date",
      sortable: false,
      filterable: false,
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "EventDay",
      fontWeight: "bold",
      headerName: "Event Day",
      type: "string",
      sortable: false,
      filterable: false,
      width: 120,
    },
    {
      field: "Description",
      fontWeight: "bold",
      headerName: "Description",
      type: "string",
      sortable: false,
      filterable: false,
      width: 300,
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
      headerName: "Event Added Date",
      type: "date",
      sortable: false,
      filterable: false,
      width: 200,
      valueFormatter: (params) =>
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    }, // dateTime and date
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

  const user = useSelector((state) => state.user);

  var userId = 0;
  var studentId = 0;
  var isAdmin = true;
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

  const topgridBoxContainer = isAdmin ? "topgridBoxContainer" : "";
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

  const fetchingEvents = () => {
    axios
      .post(APIs.EVENTS, {
        userId,
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

  const deletingEvent = (id) => {
    axios
      .delete(`${APIs.EVENTS}/${id}`)
      .then((res) => {
        if (res.data === "Event Deleted Successfully" && res.status === 200) {
          swal({
            title: `${res.data}!`,
            icon: "success",
            timer: 1500,
          });
          fetchingEvents();
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

  const handledelete = (record) => {
    const data = record.row;
    swal({
      title: "Are you sure?",
      text: "Do You Really Want To Delete This Event ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deletingEvent(data.EventId);
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchingEvents();
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
              <Events />
            </div>
          ) : (
            ""
          )}

          <Typography variant="h4" component="div" className="typographyText">
            Events List
          </Typography>

          <div className={dynamicsClasses}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(rows) => rows.EventId}
            />
          </div>
        </div>
      )}
    </>
  );
}
