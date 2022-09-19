import {createSlice} from "@reduxjs/toolkit";
import {AppDispatchType} from "../../app/store";
import {setStatusAC} from "../profile/profileReducer";
import {cardsAPI} from "../../api/cards-apiP";
import {AxiosError} from "axios";

const initialState = {
    password:''
}

const slice=createSlice({
    name:'newPassword',
    initialState:initialState,
    reducers:{

    }
})

export const newPasswordReducer = slice.reducer

export const newPasswordTC = (password:string,token:string) => async (dispatch:AppDispatchType)=>{
    dispatch(setStatusAC({status:'pending'}))
    try {
        await cardsAPI.newPassword(password,token)
        dispatch(setStatusAC({status:'succeeded'}))
        console.log('cool')
    }
    catch (err:any){
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        alert(error)
        dispatch(setStatusAC({status:'failed'}))
    }
}