import { AppDispatchType } from "../../app/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStatusAC } from "../profile/profileReducer";
import { AxiosError } from "axios";
import { authAPI } from "../../api/auth-api";

const initialState = {
   sendStatus: false,
   notice:''
}

const slice = createSlice({
   name: 'restorePassword',
   initialState: initialState,
   reducers: {
      setSendStatusAC(state, action: PayloadAction<{ sendStatus: boolean }>) {
         state.sendStatus = action.payload.sendStatus
      },
      setNoticeErrorAC(state,action:PayloadAction<{notice:string}>){
         state.notice=action.payload.notice
      }
   }
})

export const restorePasswordReducer = slice.reducer
export const { setSendStatusAC,setNoticeErrorAC } = slice.actions

export const restorePasswordTC = (email: string) => async (dispatch: AppDispatchType) => {
   dispatch(setStatusAC({ status: 'pending' }))
   try {
      await authAPI.restorePassword(email)
      dispatch(setSendStatusAC({ sendStatus: true }))
      dispatch(setStatusAC({ status: 'succeeded' }))
   }
   catch (err: any) {
      const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
      //alert(error)
      dispatch(setStatusAC({ status: 'failed' }))
      dispatch(setNoticeErrorAC({notice:error}))
      dispatch(setSendStatusAC({ sendStatus: false }))
   }

}