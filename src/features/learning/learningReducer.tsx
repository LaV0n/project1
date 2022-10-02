import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardsType} from "../cards/cardsReducer";
import {AppDispatchType} from "../../app/store";
import {cardsAPI} from "../../api/cards-api";
import {AxiosError} from "axios";


const initialState={
    data:[] as CardsType[],
    packName:'',
    notice:'',
    status:false,
    initialized:false
}

const slice=createSlice({
    name:'learning',
    initialState:initialState,
    reducers:{
        setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setInitialized(state, action: PayloadAction<{ initialized: boolean }>) {
            state.initialized = action.payload.initialized
        },
        getCardsData(state, action: PayloadAction<{ data: CardsType[] ,packName:string}>) {
            state.data = action.payload.data
            state.packName=action.payload.packName
        },
    }
})
export const learningReducer=slice.reducer
export const {setErrorNotice,setStatus, getCardsData,setInitialized}=slice.actions

export const getAllCardsTC = (id:string)=> async (dispatch:AppDispatchType)=>{
    dispatch(setStatus({status:true}))
    try {
        const res= await cardsAPI.getCards({cardsPack_id:id,pageCount:100})
        dispatch(getCardsData({data:res.data.cards,packName:res.data.packName}))
        dispatch(setInitialized({initialized:true}))
        dispatch(setStatus({status:false}))
    }catch (err:any){
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}