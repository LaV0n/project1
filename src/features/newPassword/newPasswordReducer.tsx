import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatchType } from "../../app/store";
import { setStatusAC } from "../profile/profileReducer";
import { AxiosError } from "axios";
import { authAPI } from '../../api/auth-api';

const initialState = {
   passwordStatus: false,
   notice:''
}

const slice = createSlice({
   name: 'newPassword',
   initialState: initialState,
   reducers: {
      setPasswordStatusAC(state, action: PayloadAction<{ passwordStatus: boolean }>) {
         state.passwordStatus = action.payload.passwordStatus
      },
      setNoticeErrorAC(state,action: PayloadAction<{notice:string}>){
         state.notice=action.payload.notice
      }
   }
})

export const newPasswordReducer = slice.reducer
export const { setPasswordStatusAC,setNoticeErrorAC } = slice.actions

export const newPasswordTC = (password: string, resetPasswordToken: string) => async (dispatch: AppDispatchType) => {
   dispatch(setStatusAC({ status: 'pending' }))
   try {
      await authAPI.newPassword({ password, resetPasswordToken })
      dispatch(setStatusAC({ status: 'succeeded' }))
      dispatch(setPasswordStatusAC({ passwordStatus: true }))
   } catch (err: any) {
      const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
      dispatch(setNoticeErrorAC({notice:error}))
      dispatch(setStatusAC({ status: 'failed' }))
   }
}