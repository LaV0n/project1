import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatchType} from "../../app/store";
import {setStatusAC} from "../profile/profileReducer";
import {cardsAPI} from "../../api/cards-apiP";
import {AxiosError} from "axios";

const initialState = {
    passwordStatus: false
}

const slice = createSlice({
    name: 'newPassword',
    initialState: initialState,
    reducers: {
        setPasswordStatusAC(state, action: PayloadAction<{ passwordStatus: boolean }>) {
            state.passwordStatus = action.payload.passwordStatus
        }
    }
})

export const newPasswordReducer = slice.reducer
export const {setPasswordStatusAC}=slice.actions

export const newPasswordTC = (password: string, token: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatusAC({status: 'pending'}))
    try {
        await cardsAPI.newPassword(password, token)
        dispatch(setStatusAC({status: 'succeeded'}))
        dispatch(setPasswordStatusAC({passwordStatus:true}))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        alert(error)
        dispatch(setStatusAC({status: 'failed'}))
    }
}