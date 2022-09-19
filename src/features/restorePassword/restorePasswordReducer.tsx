import { AppDispatchType} from "../../app/store"
import {createSlice} from "@reduxjs/toolkit";
import {cardsAPI} from "../../api/cards-apiP";
import {setStatusAC} from "../profile/profileReducer";
import { AxiosError } from "axios";

const initialState = {
    email:''
}

const slice=createSlice({
    name:'restorePassword',
    initialState:initialState,
    reducers:{

    }
})

export const restorePasswordReducer = slice.reducer

export const restorePasswordTC = (email:string) => async (dispatch:AppDispatchType)=>{
    dispatch(setStatusAC({status:'pending'}))
    try {
        await cardsAPI.restorePassword(email)
        dispatch(setStatusAC({status:'succeeded'}))
        console.log('cool')
    }
    catch (err:any){
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        alert(error)
        dispatch(setStatusAC({status:'failed'}))
    }

}