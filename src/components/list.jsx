
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {
  IconButton,
  Grid,
  InputLabel,
  TextField,
  CssBaseline,
  MenuItem,
  Button,
  Select,
  Box,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import KeyIcon from "@mui/icons-material/Key";
import { Link } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import dayjs from "dayjs";
import {filterUsers, } from '../api/services'
import { UserList, filter,message } from "../slices/userSlice";
import messages from "./translation";

function ListAppBar() {
  const filterBy = useSelector(filter);
  const users = useSelector(UserList);
  const dispatch = useDispatch();
  const messageResponse = useSelector(message);
  const [filterSearch, setFilterSearch] = useState(filterBy);

  useEffect(() => {
    dispatch(filterUsers(filterBy))
  }, [filterBy, dispatch]);

  const [book, setBook] = React.useState('');
  const open = Boolean(book);
  const id = open ? "simple-popover" : undefined;
  const BookHandleClick = (event) => {
    setBook(event.target.value);
  };
  
  const BookHandleClose = () => {
    setBook(null);
  };

  const filterUser = (event) => {
    setFilterSearch(event.target.value);
    dispatch(filterUsers(event.target.value));
  };
  
  return (
    <div>
      <CssBaseline />
      <AppBar
        component="nav"
        position="static"
        variant="default"
        style={{ backgroundColor: "#17a2b8", height: "40px" }}
      >
        <Toolbar variant="dense">
          <Grid
            justifyContent="left"
            container
            sx={{ color: "white", marginLeft: "150px" }}
          >
            <InputLabel style={{ marginTop: "12px", color: "white" }}> {messages("filterBy")} : &nbsp; &nbsp; &nbsp;
            </InputLabel>
            <TextField
              size="small"
              id="filterText"
              position="static"
              sx={{
                width: "250px",
                height: "40px",
                backgroundColor: "white",
                marginBottom: "10px",
              }}
              placeholder="Filter..."
              value={filterSearch}
              onChange={filterUser}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      
      <TableContainer>
        <Table size="small" style={{ fontSize: "24px" }}>
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "black",
                padding: "0px",
                whiteSpace: "nowrap",
              }}
            >
              <TableCell width={10} style={{ color: "white", width: "40px", }}>
                <Typography sx={{ display: "inline" }}>Action</Typography>
                <Link to={{pathname: "/detail/create"}}>
                  <IconButton sx={{ display: "inline" }}>
                    <AddCircleIcon
                      sx={{ color: "yellow", fontSize: "medium", }}
                    />
                  </IconButton>
                </Link>
              </TableCell>
              <TableCell align="center" sx={{ color: "white", width: 10 }}>
                #
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 30 }}>
                Employee ID
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 80 }}>
                First Name
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 80 }}>
                Last Name
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 150 }}>
                Email
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 100 }}>
                Phone
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 80 }}>
                Org Code
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 25 }}>
                Role
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", width: 50, whiteSpace: "nowrap" }}
              >
                Location
              </TableCell>
              <TableCell
                align="left"
                sx={{ color: "white", width: 90, whiteSpace: "nowrap" }}
              >
                Start Date
              </TableCell>
              <TableCell align="left" sx={{ color: "white", width: 25 }}>
                Password
              </TableCell>
            </TableRow>
          </TableHead>
            {users &&
              (users.length > 0) ? (
              users.map((user) => (
                <TableBody key={user.userID} >
                <TableRow  style={{ padding: "0px", whiteSpace: "nowrap" }}>
                  <TableCell
                    align="left"
                    width={30}
                    sx={{ padding: "0px" }}
                  >
                    <Select sx={{ boxShadow: 'none', marginLeft: '10px', '.MuiOutlinedInput-notchedOutline': { border: 0 } }} value={book} onChange={BookHandleClick} defaultValue="" displayEmpty renderValue={() => {
                      return (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <ImportContactsIcon style={{ color: "purple" }}></ImportContactsIcon>
                        </Box>
                      );
                    }}
                    >

                      <MenuItem value={user.userID} onClick={BookHandleClose} >
                        <Link
                          to={{ pathname: "/detail/view/" + user.userID }}>
                          <Button
                            size="small"
                            style={{ textTransform: "none", color: 'black', fontSize: '15px' }}
                          >
                            <RemoveRedEyeIcon style={{ color: "darkblue" }} />&nbsp; View
                          </Button>
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={BookHandleClose}>
                        <Link
                          to={{ pathname: "/detail/edit/" + user.userID }}
                          style={{ color: "inherit", textDecoration: "inherit" }}
                        >
                          <Button
                            size="small"
                            style={{ textTransform: "none", color: 'black', fontSize: '15px' }}
                          >
                            <EditIcon style={{ color: "orangered" }} /> &nbsp;
                            Edit
                          </Button>
                        </Link>
                      </MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 10 }}>
                    {user.userID}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 30 }}>
                    {user.employeeID}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 80 }}>
                    {user.firstName}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 80 }}>
                    {user.lastName}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 130 }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 100 }}>
                    {user.phone}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "black", width: 80, whiteSpace: "nowrap" }}
                  >
                    {user.orgCode}
                  </TableCell>
                  <TableCell align="left" sx={{ color: "black", width: 25 }}>
                    {user.role}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ color: "black", width: 50, whiteSpace: "nowrap" }}
                  >
                    {user.location}
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ color: "black", width: 100, whiteSpace: "nowrap" }}
                  >
                    {dayjs(user.startDate).format("MM/DD/YYYY")}
                  </TableCell>
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <TableCell
                        align="left"
                        sx={{ color: "black", width: 25, whiteSpace: "nowrap", marginLeft: '15px' }}
                      >
                        <Typography mt={1} aria-owns={id} aria-haspopup="false">
                          <KeyIcon
                            style={{ color: "darkblue", fontSize: "2rem", marginLeft: '15px' }}
                            {...bindTrigger(popupState)}
                          />
                        </Typography>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <Typography sx={{ p: 1 }}>{user.password}</Typography>
                        </Popover>
                      </TableCell>
                    )}
                  </PopupState>
                </TableRow>
                </TableBody>
              ))         
            ) : ""
            }
        </Table>  
      </TableContainer>
      {(messageResponse[0] !== "") && (messageResponse[0] != undefined) && (messageResponse[0].msgCode === "blue") && (
              < Grid item xs={12}>
                <Typography variant="h6"
                  sx={{ color: "blue", textAlign: "center" }}>
                  {messageResponse[0].msg}
                </Typography>
              </Grid>
        )}

      {(messageResponse[0] !== "") && (messageResponse[0] != undefined) && (messageResponse[0].msgCode === "red") && (
            <Grid item xs={12}>
              <Typography variant="h6"
                sx={{ color: "red", textAlign: "center" }}>
                {messageResponse[0].msg}
              </Typography>
            </Grid>
      )}

      {(messageResponse[0] !== "") && (messageResponse[0] != undefined) && (messageResponse[0].msgCode === "green") && (
            <Grid item xs={12}>
              <Typography variant="h6"
                sx={{ color: "green", textAlign: "center" }}>
                {messageResponse[0].msg}
              </Typography>
            </Grid>
      )}
    </div>
  )
}

export default ListAppBar;


