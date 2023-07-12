/* eslint-disable react-refresh/only-export-components */

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        users: [],
        filterUser: "",
        UserData: {
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
        },
        message: [
            {
                msgCode: "",
                msg: ""
            }
        ],
    },
    reducers: {
        setFilter(state, action) {
            state.filterUser = action.payload;
        },
        setUsers(state, action) {
            state.users = action.payload;
        },
        setUserResponse(state, action) {
            state.UserData = action.payload;
        },
        setMessageResponse(state, action) {
            state.message = action.payload;
        }
    },
});

export const { setUserResponse, setFilter, setUsers, setMessageResponse } = userSlice.actions;
export const UserList = (state) => state.userSlice.users
export const filter = (state) => state.userSlice.filterUser
export const userDetails = (state) => state.userSlice.UserData
export const message = (state) => state.userSlice.message
export default userSlice.reducer;