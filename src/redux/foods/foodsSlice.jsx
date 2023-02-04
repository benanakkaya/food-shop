import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";

export const foodsAdapter = createEntityAdapter();

export const fetchFoods = createAsyncThunk("foods/getFoods", async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods`);
    return res.data
})

export const setPayment = createAsyncThunk("foods/setPayment", async (value) => {
    await axios.patch(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods/${value[0]}`, {quantitySold: value[1]});
    const res = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods`);
    return res.data
})

export const setPortion = createAsyncThunk("foods/setPortion", async (value) => {
    await axios.patch(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods/${value[0]}`, { portion: value[1] });
    const resp = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods`);
    return resp.data
})

export const setComment = createAsyncThunk("foods/setComment", async (values) => {
    const newComments = [...values[0],{id: values[5] ,comment: values[2], author: values[3], rating: values[4]}];
    await axios.patch(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods/${values[1]}`, {comments: newComments });
    const resp = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods`);
    return resp.data;
})

export const deleteComment = createAsyncThunk("foods/deleteFoodComment", async (values) => {
    console.log("new")
    const newComments = values[0].filter((com) => com.id !== values[2].id);
    console.log(values[1])
    await axios.patch(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods/${values[1]}`, {comments: newComments } )
    const res = await axios(`${process.env.REACT_APP_API_BASED_ENDPOINT}/foods`);
    return res.data;
})



const foodsSlice = createSlice({
    name: "foods",
    initialState: foodsAdapter.getInitialState({
        foodList: [],
        status: "idle",
        basket: localStorage.getItem("basket") !== null ? JSON.parse(localStorage.getItem("basket")) : [],
        searchInput: "",
        basketFood: {},
        basketItem: 1,
        portionError: false,
        commentsModalState: false,
        targetComments : [[],[]]
    }),
    reducers: {
        addBasket: (state, action) => {
            state.basket = [...state.basket, action.payload];
        },
        updateBasket: (state, action) => {
            state.basket[action.payload[0]].quantity += action.payload[1];
        },
        cleanBasket: (state) => {
            state.basket = [];
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setBasketFood : (state,action) => {
            state.basketFood = action.payload;
        },
        setExtraPrice : (state,action) => {
            state.extraPrice += action.payload;
        },
        setBasketItem : (state,action) => {
            state.basketItem = action.payload;
        },
        setPortionError : (state,action) => {
            state.portionError = action.payload;
        },
        setCommentsModalState: (state,action) => {
            state.commentsModalState = action.payload;
        },
        setTargetComments : (state,action) => {
            state.targetComments = action.payload;
        },
        updateTargetComments : (state,action) => {
            state.targetComments[0] = [...state.targetComments[0], {comment:action.payload[0],author:action.payload[1],rating:action.payload[2], id:action.payload[4]}]
            console.log("event sonu" + state.targetComments[0] );
        },
        updetedComments : (state,action) => {
            return state.targetComments[0];
        },
        deleteCom : (state,action) => {
            state.targetComments[0] = (state.targetComments[0]).filter((com) => com.id !== action.payload)
        }
    },
    extraReducers: {
        [fetchFoods.fulfilled]: (state, action) => {
            state.foodList = (action.payload);
            state.status = "ready";

        },
        [fetchFoods.pending]: (state, action) => {
            state.status = "loading"
        },
        [setPayment.fulfilled]: (state, action) => {
            state.foodList = (action.payload);
            state.status = "ready";
        },
        [setPayment.pending]: (state, action) => {
            state.status = "loading"
        },
        [setPortion.fulfilled]: (state, action) => {
            state.foodList = (action.payload);
            state.status="ready";
        },
        [setPortion.pending]: (state, action) => {
            state.status = "loading"
        },
        [setComment.fulfilled] : (state,action) => {
            state.foodList = action.payload;
            state.status = "ready"
        },
        [setComment.pending] : (state,action) => {
            state.status = "loading"
        },
        [deleteComment.fulfilled] : (state,action) => {
            state.foodList = action.payload;
            state.status = "ready"
        },
        [deleteComment.pending] : (state,action) => {
            state.status = "loading"
        }
    }
})

export const { addBasket, updateBasket, setSearchInput, decreasePortion, cleanBasket, setBasketFood, setExtraPrice, setBasketItem, setPortionError, setCommentsModalState, setTargetComments, updateTargetComments, deleteCom } = foodsSlice.actions;
export default foodsSlice.reducer;