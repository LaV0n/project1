import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from 'redux'
import {cardsAPI} from "../../api/cards-apiP";

const initialState = {
    id:'',
    name:'',
    avatar:'',
    isInitialized:false
}

const slice=createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setInitializedAC(state,action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized=action.payload.isInitialized
        }
    }
})

export const profileReducer=slice.reducer;

export const {setInitializedAC} = slice.actions

export const initializeAppTC = () => (dispatch: Dispatch) => {
    cardsAPI.me().then(res => {
        if (res.data.email) {
            dispatch(setInitializedAC({isInitialized:true}));
        }
    })
}