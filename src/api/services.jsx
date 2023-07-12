import httpCommon from './http-common';
import { setUserResponse, setFilter, setUsers, setMessageResponse } from '../slices/userSlice';

function errorFunction(error, dispatch){
    if (error.response && error.response.data) {
        dispatch(setMessageResponse(error.response.data.message));
    } else {
        dispatch(setMessageResponse([{ msgCode: "red", msg: "Web service unavailable" }]));
    }
    return; 
}

export const filterUsers = (searchText) => async (dispatch) => {
    if (searchText === "") {
        try {
            const res = await httpCommon.get('user/all');
            const { User } = res.data;
            dispatch(setUsers(User));
            dispatch(setFilter(""));
            dispatch(setMessageResponse([{ msgCode: "", msg: "" }]));
        } catch (error) {
            dispatch(setUsers([]));
            errorFunction(error, dispatch)
        }
    } else {
        try {
            const res = await httpCommon.get(`/user/filter/${searchText}`);
            const { User } = res.data;
            dispatch(setFilter(searchText));
            dispatch(setUsers(User));
            dispatch(setMessageResponse([{ msgCode: "", msg: "" }]));
        } catch (error) {
            dispatch(setUsers([]));
            dispatch(setFilter(searchText));
            errorFunction(error, dispatch);
        }
    }
};

export const getByUserID = (userID) => async (dispatch) => {
    try {
        const res = await httpCommon.get(`/user/${userID}`);
        const { User } = res.data;
        dispatch(setUserResponse(User));
    } catch (error) {
        errorFunction(error, dispatch);
    }
};

export const createUser = (UserData) => async (dispatch) => {
    try {
        const res = await httpCommon.post(`/user`, UserData);
        dispatch(setUserResponse(res.data));
        dispatch(setMessageResponse(res.data.message));
    } catch (error) {
        errorFunction(error, dispatch);
    }
};


export const updateUser = (userID, UserData) => async (dispatch) => {
    try {
        const res = await httpCommon.put(`/user/${userID}`, UserData);
        const { User } = res.data;
        if(res.data.message[0].msgCode === "blue" || res.data.message[0].msgCode === "red") {
            dispatch(setMessageResponse(res.data.message));
        }else {
            dispatch(setUserResponse(User));
            dispatch(setMessageResponse(res.data.message));
        }
    } catch (error) {
        console.log("error in update user",error);
        errorFunction(error, dispatch)
    }
};

export const changePassword = (userID, UserData) => async (dispatch) => {
    try {
        const res = await httpCommon.patch(`/user/${userID}`, UserData);
        const { User } = res.data;
        dispatch(setUserResponse(User));
        dispatch(setMessageResponse(res.data.message));
    } catch (error) {
        errorFunction(error, dispatch)
    }
};


export const deleteUser = (userID) => async (dispatch) => {
    try {
        const res = await httpCommon.delete(`/user/${userID}`);
        dispatch(setUserResponse(res.data));
    } catch (error) {
        errorFunction(error, dispatch)
    }
};

export const allClear = () => (dispatch) => {
    try {
        dispatch(setUserResponse(""));
    } catch (error) {
        errorFunction(error, dispatch)
    }
};

export const messageClear = () => (dispatch) => {
    try {
        dispatch(setMessageResponse([{ msgCode: "", msg: "" }]));
    } catch (error) {
        errorFunction(error, dispatch)
    }
};