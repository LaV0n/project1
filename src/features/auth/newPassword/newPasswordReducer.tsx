import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { setStatusAC } from "../../profile/profileReducer";
import { authAPI } from '../../../api/auth-api';
import {errorAsString} from "../../../common/utils/errorAsString";

const initialState = {
   passwordStatus: false,
   notice: ''
}

const slice = createSlice({
   name: 'newPassword',
   initialState: initialState,
   reducers: {
      setPasswordStatusAC(state, action: PayloadAction<{ passwordStatus: boolean }>) {
         state.passwordStatus = action.payload.passwordStatus
      },
      setNoticeErrorAC(state, action: PayloadAction<{ notice: string }>) {
         state.notice = action.payload.notice
      }
   },
   extraReducers:builder => {
      builder.addCase(newPasswordTC.rejected, (state,action)=>{
         state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
      })
   }
})

export const newPasswordReducer = slice.reducer
export const { setPasswordStatusAC, setNoticeErrorAC } = slice.actions

export const newPasswordTC = createAsyncThunk<unknown,newPasswordDataType,{ rejectValue: { error: string }} >
('newPassword/set',async (data,{dispatch,rejectWithValue}) => {
   dispatch(setStatusAC({ status: 'pending' }))
   try {
      await authAPI.newPassword({ password:data.password, resetPasswordToken:data.resetPasswordToken })
      dispatch(setStatusAC({ status: 'succeeded' }))
      dispatch(setPasswordStatusAC({ passwordStatus: true }))
   } catch (err) {
      dispatch(setStatusAC({ status: 'failed' }))
      const error = errorAsString(err)
      return rejectWithValue({error})
   }
})

type newPasswordDataType={
   password: string
   resetPasswordToken: string
}