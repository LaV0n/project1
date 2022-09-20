import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatchType } from "../../app/store";
import { StatusType } from "../../common/types";
import { authAPI } from '../../api/auth-api';
import { setAuthData } from "../../app/authReducer";

type initialStateType = {
   status: StatusType
}
const initialState: initialStateType = {
   status: 'idle'
}

const slice = createSlice({
   name: 'profile',
   initialState: initialState,
   reducers: {
      setStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
         state.status = action.payload.status
      }
   }
})

export const profileReducer = slice.reducer;

export const { setStatusAC } = slice.actions


export const setNameTC = (name: string) => async (dispatch: AppDispatchType) => {
   dispatch(setStatusAC({ status: 'pending' }))
   try {
      const res = await authAPI.changeName(name)
      dispatch(setStatusAC({ status: 'succeeded' }))
      dispatch(setAuthData({ data: res.data.updatedUser }));
   } catch (err) {
      console.warn(err)
      dispatch(setStatusAC({ status: 'failed' }))
   }
}