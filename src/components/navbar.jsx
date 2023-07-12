
import React from "react";
import { AppBar, Toolbar,Grid, CssBaseline, Typography, IconButton, MenuItem, Divider, Menu, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PaidIcon from '@mui/icons-material/Paid';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Logout } from "@mui/icons-material";
import { Settings } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import {allClear,filterUsers} from '../api/services';
import messages from "./translation";

const NavBar = () => {
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const [settings, setSetings] = React.useState(null);
    const [hr, setHr] = React.useState(null);
    const [profile, setProfile] = React.useState(null)
    const open1 = Boolean(settings);
    const open2 = Boolean(hr);
    const open3 = Boolean(profile)
   
    const settingsHandleClick = (event) => {
        setSetings(event.currentTarget);
    };
    const settingsHandleClose = () => {
        setSetings(null);
    };

    const hrHandleClick = (event) => {
       setHr(event.currentTarget);
     };
     const hrHandleClose = () => {
         setHr(null);
     };

     const profileHandleClick = (event) => {
         setProfile(event.currentTarget);
     };
     const profileHandleClose = () => {
         setProfile(null);
     };

    return (
        <div>
        <CssBaseline />
        {/* <Box display={"flex"}> */}
        <AppBar component='nav' position="static" elevation={0} style={{ backgroundColor: "#f8f9fa", width:'100%'}}>
            <Toolbar variant="dense" style={{paddingLeft:'8px',paddingRight: '0px'}}>
                <img src='/quadyster.svg' id='logo' height={25} width={160} style={{marginRight:'8px', marginLeft:'5px'}}/> 
            <Grid container display={'inline-flex'} sx={{ color: 'text.primary' }}> 
            
                <IconButton>
                    <HomeIcon style={{ color: "blue", marginRight: '2px' }}> </HomeIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("clockTime")}</Typography>
                </IconButton>
                <IconButton >
                    <FormatListBulletedIcon style={{ color: "green", marginRight: '2px' }}></FormatListBulletedIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("timeLog")}</Typography>
                </IconButton>
                <IconButton >
                    <SportsFootballIcon style={{ color: "brown", marginRight: '2px' }}></SportsFootballIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("vacation")}</Typography>
                </IconButton>
                <IconButton >
                    <BeachAccessIcon style={{ color: "maroon", marginRight: '2px' }}></BeachAccessIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("holiday")}</Typography>
                </IconButton>
                <IconButton >
                    <AccountTreeIcon style={{ color: "green", marginRight: '2px' }}></AccountTreeIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("projectTime")}</Typography>
                </IconButton>
                <IconButton >
                    <PaidIcon style={{ color: "maroon", marginRight: '2px' }}> </PaidIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("timeSummary")}</Typography>
                </IconButton>
                <IconButton onClick={settingsHandleClick}>
                    <SettingsIcon style={{ color: "steelblue", marginRight: '2px' }}> </SettingsIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("settings")} </Typography>
                    <KeyboardArrowDownIcon style={{ marginTop: '4px' }} size="small"/>
                </IconButton>
                <Menu anchorEl={settings} id="settings-menu" open={open1} onClose={settingsHandleClose} onClick={settingsHandleClose}>
                    <MenuItem onClick={settingsHandleClose}> <PersonIcon style={{ color: "green" }} /> {messages("payPeriod")} </MenuItem>
                    <MenuItem onClick={settingsHandleClose}> <PersonIcon style={{ color: "maroon" }} /> {messages("payProfile")} </MenuItem>
                    <Divider />
                    <NavLink to={'/'} onClick={() => { navigate('/'); dispatch(allClear()); dispatch(filterUsers(""))}}  style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <MenuItem component={Link}  onClick={settingsHandleClose}>  <PersonIcon style={{ color: "orangered" }} fontSize="small" /> {messages("users")}  </MenuItem>
                    </NavLink>
                    <MenuItem onClick={settingsHandleClose}> <Settings style={{ color: "darkblue" }} fontSize="small" />  {messages("locations")} </MenuItem>
                </Menu>
                <IconButton onClick={hrHandleClick}>
                    <ContactPageIcon style={{ color: "orange", marginRight: '2px' }}></ContactPageIcon>
                    <Typography style={{ marginTop: '2px'}}>{messages("hr")}</Typography>
                    <KeyboardArrowDownIcon style={{ marginTop: '4px' }} size="small"/>
                </IconButton>
                <Menu anchorEl={hr} id="hr-menu" open={open2} onClose={hrHandleClose} onClick={hrHandleClose}>
                    <MenuItem onClick={hrHandleClose}> <PersonIcon style={{ color: "darkblue" }} /> {messages("employee")} </MenuItem>
                    <MenuItem onClick={hrHandleClose}> <PersonIcon style={{ color: "orangered" }} /> {messages("review")} </MenuItem>
                    <MenuItem onClick={hrHandleClose}> <PersonIcon style={{ color: "purple" }} /> {messages("applicants")} </MenuItem>
                </Menu>
              
            </Grid>
            <Grid whiteSpace={'nowrap'}  marginLeft='5px'>
            {/* <Box sx = {{ flexGrow: 1 }}> */}
                <IconButton onClick={profileHandleClick} >
                    <PersonIcon style={{ color: "maroon" }}></PersonIcon>
                    <Typography style={{ marginTop: '2px' }}> {messages("sheebaDola")}</Typography>
                    <KeyboardArrowDownIcon style={{ marginTop: '4px' }} size="small"/>
                </IconButton>
                <Menu anchorEl={profile} id="account-menu" open={open3} onClose={profileHandleClose} onClick={profileHandleClose}>
                    <MenuItem onClick={profileHandleClose}> <PersonIcon style={{ color: "purple" }} /> {messages("sheebaDola")} </MenuItem>
                    <MenuItem onClick={profileHandleClose}> <PersonIcon style={{ color: "purple" }} /> {messages("changePassword")} </MenuItem>
                    <MenuItem onClick={profileHandleClose}> <PersonIcon style={{ color: "purple" }} />  {messages("changePassphrase")} </MenuItem>
                    <Divider />
                    <MenuItem onClick={profileHandleClose}> <Logout style={{ color: "red" }} /> {messages("logout")} </MenuItem>
                </Menu>
                {/* </Box> */}
            </Grid>
        </Toolbar>
    </AppBar>
    {/* </Box> */}
    </div>
    )
}

export default NavBar;

