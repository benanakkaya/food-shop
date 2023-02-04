import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "react-router-dom";

export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/users`);
    return res.data
})

export const setUsers = createAsyncThunk("users/setUsers", async (value) => {
    await axios.post(`${process.env.REACT_APP_API_BASED_ENDPOINT}/users`,value);
    const res = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/users`);
    return res.data
})





const usersSlice = createSlice({
    name:"users",
    initialState:{
        status:"idle",
        users: [],
        loginned:false
    },
    reducers:{
        setLogin: (state,action) =>{
            state.loginned = action.payload;
            localStorage.setItem("loginned",JSON.stringify(state.loginned));
        }
    },
    extraReducers:{
        [fetchUsers.fulfilled] : (state,action) => {
            state.users= action.payload;
            state.status="ready";
        },
        [fetchUsers.pending] : (state,action) => {
            state.status="loading";
        },
        [setUsers.fulfilled] : (state,action) => {
            state.users= action.payload;
            state.status="ready";
        },
        [setUsers.pending] : (state,action) => {
            state.status="loading";
        }
    }
})

export const {setLogin} = usersSlice.actions;
export default usersSlice.reducer;