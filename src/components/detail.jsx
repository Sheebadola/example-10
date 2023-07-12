/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyIcon from '@mui/icons-material/Key';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userDetails, message } from '../slices/userSlice';
import { getByUserID, allClear, deleteUser, createUser, updateUser, messageClear, changePassword } from '../api/services'
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, useFormik } from 'formik';
import { useIntl, FormattedMessage, IntlProvider } from 'react-intl';

export default function BorderAdditive() {
  let { userID, action } = useParams();
  const intl = useIntl();
  const userValidationSchema = Yup.object().shape({
    employeeID: Yup.string().required('Employee ID is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    orgCode: Yup.string().required('Org Code is required'),
    role: Yup.string().required('Role is required'),
    country: Yup.string().required('Country is required'),
    location: Yup.string().required('Location is required'),
    locale: Yup.string().required('Locale is required'),
    timezone: Yup.string().required('Timezone is required'),
    cidr: Yup.string().nullable(),
    userStatus: Yup.string().required('Status is required'),
    startDate: Yup.string().required('Start Date is required'),
    endDate: Yup.string().nullable(),
    password: Yup.string().required('Password is required'),
    rpassword: Yup.string()
      .required('Re-enter Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });


  let OrgCodeOptions = [
    { id: "Quadyster", label: "Quadyster" },
    { id: "R3 Services", label: "R3 Services" }
  ];

  const OrgCodeChange = (value) => {
    setValues({ ...values, orgCode: value.id });
  };

  const RoleOptions = [
    { id: "Admin", label: "Admin" },
    { id: "Manager", label: "Manager" },
    { id: "User", label: "User" },
    { id: "Guest", label: "Guest" }
  ];

  const RoleChange = (value) => {
    setValues({ ...values, role: value.id })
  }

  const CountryOptions = [
    { id: "United States America", label: "United States America" },
    { id: "India", label: "India" }
  ];

  const CountryChange = (value) => {
    setValues({ ...values, country: value.id })
  }

  const LocationOptions = [
    { id: "Bettendorf", label: "Bettendorf" },
    { id: "WFH- India", label: "WFH- India" },
    { id: "WFH- USA", label: "WFH- USA" },
  ];

  const LocationChange = (value) => {
    setValues({ ...values, location: value.id })
  }
  const LocaleOptions = [
    { id: "US English", label: "US English" },
    { id: "India English", label: "India English" }
  ];

  const LocaleChange = (value) => {
    setValues({ ...values, locale: value.id })
  }

  const TimezoneOptions = [
    { id: "IST (Indian Standard Time)", label: "IST (Indian Standard Time)" },
    { id: "EST (Eastern Standard Time)", label: "EST (Eastern Standard Time)" },
    { id: "CST (Central Standard Time)", label: "CST (Central Standard Time)" },
    { id: "MST (Mountain Standard Time with DS)", label: "MST (Mountain Standard Time with DS)" },
    { id: "MST (Mountain Standard Time)", label: "MST (Mountain Standard Time)" },
    { id: "PST (Pacific Standard Time)", label: "PST (Pacific Standard Time)" },
  ];

  const TimezoneChange = (value) => {
    setValues({ ...values, timezone: value.id })
  }

  const StatusOptions = [
    { id: "Active", label: "Active" },
    { id: "Away", label: "Away" },
    { id: "Vaccation", label: "Vaccation" },
  ];

  const StatusChange = (value) => {
    setValues({ ...values, userStatus: value.id })
  }
  const initialUsers = {
    userID: "",
    employeeID: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    orgCode: "",
    role: "",
    country: "",
    location: "",
    locale: "",
    timezone: "",
    cidr: "",
    userStatus: "",
    startDate: "",
    endDate: "",
    password: "",
    rpassword: "",
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageResponse = useSelector(message);
  const UserData = useSelector(userDetails);
  const [detailValues, setDetailValues] = useState(false);
  const [values, setValues] = useState(initialUsers);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (action === 'create') {
      dispatch(allClear());
      dispatch(messageClear())
    } else if (action === 'view' || action === 'edit' || action === 'changePassword') {
      dispatch(getByUserID(userID));
    }
  }, [action, dispatch, userID]);

  useEffect(() => {
    if (action === 'create' && detailValues) {
      // console.log("in create useEffect", UserData);
      if (UserData.status === 201) {
        navigate(`/detail/edit/${UserData.User.userID}`)
      }
    } else if ((action === 'view' || action === 'edit' || action === 'changePassword') && !detailValues) {
      dispatch(messageClear());
      setValues({
        userID: UserData.userID,
        employeeID: UserData.employeeID,
        firstName: UserData.firstName,
        lastName: UserData.lastName,
        email: UserData.email,
        phone: UserData.phone,
        orgCode: UserData.orgCode,
        role: UserData.role,
        country: UserData.country,
        location: UserData.location,
        locale: UserData.locale,
        timezone: UserData.timezone,
        cidr: UserData.cidr,
        userStatus: UserData.userStatus,
        startDate: UserData.startDate,
        endDate: UserData.endDate,
        password: UserData.password,
        rpassword: UserData.rpassword
      });
    } else if ((action === 'view' || action === 'edit' || action === 'changePassword') && detailValues) {
      setValues({
        userID: UserData.userID,
        employeeID: UserData.employeeID,
        firstName: UserData.firstName,
        lastName: UserData.lastName,
        email: UserData.email,
        phone: UserData.phone,
        orgCode: UserData.orgCode,
        role: UserData.role,
        country: UserData.country,
        location: UserData.location,
        locale: UserData.locale,
        timezone: UserData.timezone,
        cidr: UserData.cidr,
        userStatus: UserData.userStatus,
        startDate: UserData.startDate,
        endDate: UserData.endDate,
        password: UserData.password,
        rpassword: UserData.rpassword,
      });
    }
  }, [UserData, action, detailValues, dispatch, navigate])
  
  const handleSubmit = () => {
    if (formik.isValid){
      console.log("form valid aa leda? ", formik.isValid);
      formik.handleSubmit(values);
      setDetailValues(true)
    if (action === 'create') {
      console.log("This is for create");
      // console.log("values in create block dispatch onSubmit", values);
      dispatch(createUser(values));
    } else if (action === 'edit') {
      console.log("values in dispatch onSubmit", values);
      dispatch(updateUser(userID, values))
    } else if (action === 'changePassword') {
      dispatch(changePassword(userID, values))
    } 
    }
    
  }
  const formik = useFormik({
    initialValues: action === 'create' ?
      {
        userID: '',
        employeeID: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        orgCode: '',
        role: '',
        country: '',
        location: '',
        locale: '',
        timezone: '',
        cidr: '',
        userStatus: '',
        startDate: '',
        endDate: '',
        password: '',
        rpassword: ''
      } : {
        userID: values.userID,
        employeeID: values.employeeID,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        orgCode: values.orgCode,
        role: values.role,
        country: values.country,
        location: values.location,
        locale: values.locale,
        timezone: values.timezone,
        cidr: values.cidr,
        userStatus: values.userStatus,
        startDate: values.startDate,
        endDate: values.endDate,
        password: values.password,
        rpassword: values.rpassword,
      },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      formik.setTouched(values, true); 
    },
    enableReinitialize: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClickDelete = () => {
    handleClose();
    dispatch(deleteUser(userID))
    navigate('/');
  };

 


  return (
    <div>
      <Box sx={{ marginLeft: '10%', marginRight: '10%', border: 1, borderColor: 'blue' }} mt={2}>
        <Grid container sx={{ padding: '10px', }} whiteSpace={'nowrap'} >
          <Grid item xs={2} textAlign='right' padding={'5px'} > User ID: </Grid>
          <Grid item xs={4}>
            <TextField size="small" type={'number'} fullWidth placeholder="#" style={{ padding: '2px', backgroundColor: '#f8f9fa' }} disabled
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.userID} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'}> Employee ID: </Grid>
          <Grid item xs={4}>
            <TextField name='employeeID' id='employeeID' type={'text'} fullWidth size="small" placeholder="Employee ID" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.employeeID}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.employeeID && Boolean(formik.errors.employeeID)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.employeeID && Boolean(formik.errors.employeeID) ? formik.errors.employeeID : null}

            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > First Name: </Grid>
          <Grid item xs={4}>
            <TextField name='firstName' id='firstName' type={'text'} fullWidth size="small" placeholder="First Name" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.firstName}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.firstName && Boolean(formik.errors.firstName) ? formik.errors.firstName : null}

            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'}> Last Name: </Grid>
          <Grid item xs={4}>
            <TextField name='lastName' id='lastName' type={'text'} fullWidth size="small" placeholder="Last Name" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.lastName}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.lastName && Boolean(formik.errors.lastName)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.lastName && Boolean(formik.errors.lastName) ? formik.errors.lastName : null}
            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Email: </Grid>
          <Grid item xs={4}>
            <TextField name='email' id='email' type={'email'} fullWidth size="small" placeholder="Email" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.email}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.email && Boolean(formik.errors.email)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.email && Boolean(formik.errors.email) ? formik.errors.email : null}
            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Phone: </Grid>
          <Grid item xs={4}>
            <TextField name='phone' id='phone' type={'tel'} fullWidth size="small" placeholder="Phone" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.phone}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.phone && Boolean(formik.errors.phone)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.phone && Boolean(formik.errors.phone) ? formik.errors.phone : null}
            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Org Code: </Grid>
          <Grid item xs={4} fullWidth >

            <Autocomplete options={OrgCodeOptions} name='orgCode' id='orgCode'
              disablePortal
              style={{ padding: "2px" }}
              size="small"
              value={OrgCodeOptions.find((e) => e.id === formik.values.orgCode) || ""}
              onChange={(event, newValue) => {
                OrgCodeChange(newValue);
                formik.setFieldValue('orgCode',newValue.id)
              }}
              getOptionLabel={(option) => option.label || ""}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id || option.id === ""
              }
              onBlur = {formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={action === "view" || action === "changePassword"}
                  sx={{
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "#f0f2f4"
                    }
                  }}
                  error={
                    formik.touched.orgCode && Boolean(formik.errors.orgCode)
                  }
                  helperText={action !== 'view' && formik.touched.orgCode && Boolean(formik.errors.orgCode) ? formik.errors.orgCode : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Role: </Grid>
          <Grid item xs={4} fullWidth >
            <Autocomplete disablePortal style={{ padding: '2px' }} size='small' id="role" name="role" options={RoleOptions}
              value={RoleOptions.find((e) => e.id === formik.values.role) || ""}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ""}
              onBlur = {formik.handleBlur}
              onChange={(event, newValue) => {
                RoleChange(newValue);
                formik.setFieldValue('role',newValue.id)
              }}
              renderInput={(params) => (
                <TextField {...params}
                  disabled={action === "view" || action === "changePassword"}
                  sx={{
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "#f0f2f4"
                    }
                  }}
                  error={
                    formik.touched.role && Boolean(formik.errors.role)
                  }
                  helperText={action !== 'view' && formik.touched.role && Boolean(formik.errors.role) ? formik.errors.role : null}
                 />
              )} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Country: </Grid>
          <Grid item xs={4} fullWidth >
            <Autocomplete disablePortal style={{ padding: '2px' }} size='small' id="Country" name="Country" options={CountryOptions}
              value={CountryOptions.find((e) => e.id === formik.values.country) || ''}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ""}
              onChange={(event, newValue) => {
                CountryChange(newValue)
                formik.setFieldValue('country',newValue.id)
              }}
              onBlur = {formik.handleBlur}
              renderInput={(params) => (<TextField {...params}
                disabled={action === "view" || action === "changePassword"}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#f0f2f4"
                  }
                }}
                
                error={
                  formik.touched.country && Boolean(formik.errors.country)
                }
                helperText={action !== 'view' && formik.touched.country && Boolean(formik.errors.country) ? formik.errors.country : null}
              />
              )} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Location: </Grid>
          <Grid item xs={4} fullWidth >
            <Autocomplete disablePortal style={{ padding: '2px' }} size='small' id="location" name="location" options={LocationOptions}
              value={LocationOptions.find((e) => e.id === formik.values.location) || ""}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ""}
              onChange={(event, newValue) => {
                LocationChange(newValue)
                formik.setFieldValue('location',newValue.id)
              }}
              onBlur = {formik.handleBlur}
              renderInput={(params) => (
              <TextField {...params}
                disabled={action === "view" || action === "changePassword"}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#f0f2f4"
                  }
                }}
                error={
                  formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={action !== 'view' && formik.touched.location && Boolean(formik.errors.location) ? formik.errors.location : null}
               />
              )} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Locale: </Grid>
          <Grid item xs={4} fullWidth >
            <Autocomplete disablePortal style={{ padding: '2px' }} size='small' id="locale" name="locale" options={LocaleOptions}
              value={LocaleOptions.find((e) => e.id === formik.values.locale) || ""}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ""}
              onChange={(event, newValue) => {
                LocaleChange(newValue)
                formik.setFieldValue('locale',newValue.id)
              }}
              onBlur = {formik.handleBlur}
              renderInput={(params) => (<TextField {...params}
                disabled={action === "view" || action === "changePassword"}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#f0f2f4"
                  }
                }}
                error={
                  formik.touched.locale && Boolean(formik.errors.locale)
                }
                helperText={action !== 'view' && formik.touched.locale && Boolean(formik.errors.locale) ? formik.errors.locale : null}
              />
              )} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Timezone: </Grid>
          <Grid item xs={4} fullWidth >
            <Autocomplete disablePortal style={{ padding: '2px' }} size='small' id="timezone" name="timezone" options={TimezoneOptions}
              value={TimezoneOptions.find((e) => e.id === formik.values.timezone) || ""}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ""}
              onChange={(event, newValue) => {
                TimezoneChange(newValue)
                formik.setFieldValue('timezone',newValue.id)
              }}
              onBlur = {formik.handleBlur}
              renderInput={(params) => (<TextField {...params}
                disabled={action === "view" || action === "changePassword"}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#f0f2f4"
                  }
                }}
                error={
                  formik.touched.timezone && Boolean(formik.errors.timezone)
                }
                helperText={action !== 'view' && formik.touched.timezone && Boolean(formik.errors.timezone) ? formik.errors.timezone : null}
               />
              )} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Allowed CIDR: </Grid>
          <Grid item xs={4} fullWidth >
            <TextField name='cidr' id='cidr' type={'text'}  defaultValue={'0.0.0.0/0'}  fullWidth size="small" placeholder="0.0.0.0/0" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
               value={values.cidr}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.cidr && Boolean(formik.errors.cidr)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.cidr && Boolean(formik.errors.cidr) ? formik.errors.cidr : null}
             />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Status: </Grid>
          <Grid item xs={4} fullWidth >
            <Autocomplete disablePortal style={{ padding: '2px' }} size='small' id="userStatus" name="userStatus" options={StatusOptions}
              value={StatusOptions.find((e) => e.id === formik.values.userStatus) || ""}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id || option.id === ""}
              onChange={(event, newValue) => {
                StatusChange(newValue)
                formik.setFieldValue('userStatus',newValue.id)
              }}
              onBlur = {formik.handleBlur}
              renderInput={(params) => (<TextField {...params}
                disabled={action === "view" || action === "changePassword"}
                sx={{
                  "& .MuiInputBase-root.Mui-disabled": {
                    backgroundColor: "#f0f2f4"
                  }
                }}
                error={
                  formik.touched.userStatus && Boolean(formik.errors.userStatus)
                }
                helperText={action !== 'view' && formik.touched.userStatus && Boolean(formik.errors.userStatus) ? formik.errors.userStatus : null}
              />
              )} />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'} > Start Date: </Grid>
          <Grid item xs={4}>
            <TextField name='startDate' id='startDate' type={'date'} fullWidth size="small" style={{ padding: '2px' }} disabled={action === "view" || action === "changePassword"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              onBlur={formik.handleBlur}
              value={values.startDate}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              
              helperText={action !== 'view' && formik.touched.startDate && Boolean(formik.errors.startDate) ? formik.errors.startDate : null}
            />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'}> End Date: </Grid>
          <Grid item xs={4}>
            <TextField name='endDate' id='endDate' type={'date'} fullWidth size="small" style={{ padding: '2px' }} disabled={action === "create" || action === "view" || action === "changePassword"}
               value={values.endDate === '9999-12-31' ? '' : values.endDate}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.endDate && Boolean(formik.errors.endDate)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.endDate && Boolean(formik.errors.endDate) ? formik.errors.endDate : null}
             />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'}> Password: </Grid>
          <Grid item xs={10}>
            <TextField name='password' id='password' type={'password'} placeholder='Password' fullWidth size="small" style={{ padding: '2px' }} disabled={action === "view" || action === "edit"}
              sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}
              value={values.password}
              onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.password && Boolean(formik.errors.password) ? formik.errors.password : null}
             />
          </Grid>
          <Grid item xs={2} textAlign='right' padding={'5px'}> Re-enter Password: </Grid>
          <Grid item xs={10}>
            <TextField name='rpassword' id='rpassword' type={'password'} placeholder='Re-enter Password' fullWidth size="small" style={{ padding: '2px' }} disabled={action === "view" || action === "edit"}
               value={values.rpassword}
               sx={{
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "#f0f2f4"
                }
              }}onChange={(e) => {
                handleChange(e);
                formik.handleChange(e);
              }}
              error={
                formik.touched.rpassword && Boolean(formik.errors.rpassword)
              }
              onBlur={formik.handleBlur}
              helperText={action !== 'view' && formik.touched.rpassword && Boolean(formik.errors.rpassword) ? formik.errors.rpassword : null}
            />
          </Grid>
          {(messageResponse[0] !== "") && (messageResponse[0] != undefined) && (messageResponse[0].msgCode === "blue") && (
            < Grid item xs={12} mt={1}>
              <Typography variant="h6"
                sx={{ color: "blue", textAlign: "center" }}>
                {messageResponse[0].msg}
              </Typography>
            </Grid>
          )}


          {(messageResponse[0] !== "") && (messageResponse[0] != undefined) && (messageResponse[0].msgCode === "red") && (
            <Grid item xs={12} mt={1}>
              <Typography variant="h6"
                sx={{ color: "red", textAlign: "center" }}>
                {messageResponse[0].msg}
              </Typography>
            </Grid>
          )}


          {(messageResponse[0] !== "") && (messageResponse[0] != undefined) && (messageResponse[0].msgCode === "green") && (
            <Grid item xs={12} mt={1}>
              <Typography variant="h6"
                sx={{ color: "green", textAlign: "center" }}>
                {messageResponse[0].msg}
              </Typography>
            </Grid>
          )}

          <br />

          <Grid item xs={12} padding='10px' fullWidth textAlign={'center'} mt={1}>
            {(action === "edit" || action === "create" || action === 'changePassword') && (
              <Button type='submit' onClick={handleSubmit} variant="contained" style={{ textTransform: 'none', backgroundColor: '#007bff', marginRight: '5px' }} startIcon={<SaveIcon style={{ color: 'yellow' }} />}>
                Save
              </Button>
            )}

            {(action === "edit" || action === 'changePassword') && (
              <Button variant="contained" style={{ backgroundColor: '#e04744', textTransform: 'none', marginRight: '5px' }} onClick={handleClickOpen} startIcon={<DeleteIcon style={{ color: 'yellow' }} />}>
                Delete
              </Button>
            )}

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This user data will be permanently deleted
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={onClickDelete} autoFocus> Yes </Button>
              </DialogActions>
            </Dialog>

            {(action === "edit" || action === 'changePassword') && (
              <Button variant="outlined" style={{ textTransform: 'none', marginRight: '5px' }} onClick={() => { navigate(`/detail/view/${userID}`); dispatch(messageClear()) }} startIcon={<VisibilityIcon style={{ color: 'blue' }} />}>
                Switch to View
              </Button>)}

            {action === "edit" && (
              <Button variant="outlined" style={{ textTransform: 'none', marginRight: '5px' }} onClick={() => { navigate(`/detail/changePassword/${userID}`); dispatch(messageClear()) }} startIcon={<KeyIcon style={{ color: 'darkblue' }} />}>
                Change Password
              </Button>)}

            {(action === "view" || action === 'changePassword') && (
              <Button variant="outlined" style={{ textTransform: 'none', marginRight: '5px' }} onClick={() => { navigate(`/detail/edit/${userID}`); dispatch(messageClear()) }} startIcon={<BorderColorIcon style={{ color: 'orangered' }} />}>
                Switch to Update
              </Button>)}

            <Button variant="outlined" style={{ textTransform: 'none', marginRight: '5px' }} onClick={() => { dispatch(allClear()); navigate('/'); }}>
              Go to: Users
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div >
  );
}
