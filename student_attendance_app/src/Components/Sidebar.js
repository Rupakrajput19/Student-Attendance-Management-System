import { React, useState } from "react";
import Attendance from "./Attendance";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ContactsIcon from "@mui/icons-material/Contacts";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { useSelector } from "react-redux";

export default function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  // const isAdmin = useSelector(state => state.isAdmin)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 220;
  const drawerMargin = "95px 0 0 0";
  const drawerBorder = "2px solid black";
  const isAdmin = true; //props.IsAdmin
  const studentName = "Ritu Kumar"; // will come from props users props.Name
  const drawer = (
    <div>
      <List>
        &nbsp; &nbsp; Hi, <b>{studentName}</b> {isAdmin ? "(Admin)" : "(Student)"}
      </List>
      <Divider />
      <List>
        <Link to="/profile" className="login_btn">
          <ListItem>
            <ListItemButton>
              <AccountCircleIcon />
              My Profile
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        {isAdmin ? (
          <Link to="/studentList" className="login_btn">
            <ListItem>
              <ListItemButton>
                <DocumentScannerIcon />
                Student Details
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          ""
        )}
        <Divider />
        <Link to="/attendanceList" className="login_btn">
          <ListItem>
            <ListItemButton>
              <PunchClockIcon />
              Attendance Sheet
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        {/* <Link to="/marksheet" className="login_btn">
        <ListItem>
            <ListItemButton>
              <ContentPasteIcon />
              Marksheet
            </ListItemButton>
        </ListItem>
          </Link> */}
        <Divider />
        <Link to="/events" className="login_btn">
          <ListItem>
            <ListItemButton>
              <EventIcon />
              Events
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link to="/contactUs" className="login_btn">
          <ListItem>
            <ListItemButton>
              <ContactsIcon />
              Contact Us
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        {isAdmin ? (
          <Link to="/form" className="login_btn">
            <ListItem>
              <ListItemButton>
                <AddBoxIcon />
                Add New Student
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          ""
        )}
        <Divider />
        {isAdmin ? (
          <Link to="/usersList" className="login_btn">
            <ListItem>
              <ListItemButton>
                <AccountCircleIcon />
                All Users List
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          ""
        )}
        <Divider />
        <Link to="/login" className="login_btn">
          <ListItem>
            <ListItemButton>
              <LogoutIcon />
              Logout
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          background: "blue",
        }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              margin: drawerMargin,
              border: drawerBorder,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              margin: drawerMargin,
              border: drawerBorder,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
