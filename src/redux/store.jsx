import {configureStore} from '@reduxjs/toolkit';
import foodsSlice from "./foods/foodsSlice"
import usersSlice from './users/usersSlice';

const store = configureStore({
    reducer:{
        foods:foodsSlice,
        users:usersSlice
    }
})


export default store;