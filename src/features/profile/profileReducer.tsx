import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI} from "../../api/cards-apiP";
import {AppDispatchType} from "../../app/store";

const initialState = {
    id:'',
    name:'',
    avatar:'',
    isInitialized:false,
    isLogin:false
}

const slice=createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setInitializedAC(state,action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized=action.payload.isInitialized
        },
        setLoginAC(state,action:PayloadAction<{isLogin:boolean}>){
            state.isLogin=action.payload.isLogin
        }
    }
})

export const profileReducer=slice.reducer;

export const {setInitializedAC,setLoginAC} = slice.actions

export const initializeAppTC = () => (dispatch: AppDispatchType) => {
    cardsAPI.me().then(res => {
        if (res.data.email) {
            dispatch(setInitializedAC({isInitialized:true}));
        }
    })
}
export const setLogoutTC = () => (dispatch: AppDispatchType) => {
    cardsAPI.logout().then(res => {
        if (res.data.info) {
            dispatch(setLoginAC({isLogin:false}));
            dispatch(setInitializedAC({isInitialized:false}))
        }
    })
}

export const setLoginTC = () => (dispatch: AppDispatchType) => {
    cardsAPI.login().then(res => {
        if (res.data.email) {
            debugger
            dispatch(setLoginAC({isLogin:true}));
            dispatch(setInitializedAC({isInitialized:true}))
        }
    })
}