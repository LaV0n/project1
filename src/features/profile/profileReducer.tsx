import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {cardsAPI} from "../../api/cards-apiP";
import {AppDispatchType} from "../../app/store";
import {StatusType} from "../../common/types";

type initialStateType={
    email: string
    name: string
    avatar: string
    isInitialized: boolean
    isLogin: boolean
    status:StatusType
}
const initialState:initialStateType = {
    email: '',
    name: '',
    avatar: '',
    isInitialized: false,
    isLogin: false,
    status:'idle'
}

const slice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setLoginAC(state, action: PayloadAction<{ isLogin: boolean }>) {
            state.isLogin = action.payload.isLogin
        },
        getProfileDataAC(state, action: PayloadAction<{ name: string,email:string }>) {
            state.name = action.payload.name
            state.email=action.payload.email
        },
        setStatusAC(state,action:PayloadAction<{status:StatusType}>){
            state.status=action.payload.status
        }
    }
})

export const profileReducer = slice.reducer;

export const {setInitializedAC, setLoginAC, getProfileDataAC,setStatusAC} = slice.actions

export const initializeAppTC = () => async (dispatch: AppDispatchType) => {
    dispatch(setStatusAC({status:'pending'}))
    try {
        const res = await cardsAPI.me()
        if (res.data.email) {
            dispatch(setStatusAC({status:'succeeded'}))
            dispatch(setInitializedAC({isInitialized: true}));
            dispatch(getProfileDataAC({name: res.data.name,email:res.data.email}))
        }
    }
    catch (err){
        dispatch(setStatusAC({status:'failed'}))
        console.warn(err)
    }
}
export const setLogoutTC = () => async (dispatch: AppDispatchType) => {
    dispatch(setStatusAC({status:'pending'}))
    const res = await cardsAPI.logout()
    if (res.data.info) {
        dispatch(setStatusAC({status:'succeeded'}))
        dispatch(setLoginAC({isLogin: false}));
        dispatch(setInitializedAC({isInitialized: false}))
    }
}
export const setLoginTC = () => async (dispatch: AppDispatchType) => {
    dispatch(setStatusAC({status:'pending'}))
    const res = await cardsAPI.login()
    if (res.data.email) {
        dispatch(setStatusAC({status:'succeeded'}))
        dispatch(setLoginAC({isLogin: true}));
        dispatch(setInitializedAC({isInitialized: true}))
    }
}
export const setNameTC = (name: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatusAC({status:'pending'}))
    try {
        const res = await cardsAPI.changeName(name)
        dispatch(setStatusAC({status:'succeeded'}))
        dispatch(getProfileDataAC({name:res.data.updatedUser.name,email:res.data.updatedUser.email}));
    } catch (err) {
        console.warn(err)
        dispatch(setStatusAC({status:'failed'}))
    }
}