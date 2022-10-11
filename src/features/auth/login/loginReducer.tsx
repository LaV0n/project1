import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { LoginRequestType, AuthResponseDataType, StatusType } from "../../../common/types"
import { authAPI } from '../../../api/auth-api';
import { setAuthData } from "../../../app/authReducer";
const slice = createSlice({
   name: 'login',
   initialState: {
      status: 'idle' as StatusType,
      notice: '' as string
   },
   reducers: {
      setNotice: (state, action: PayloadAction<{ notice: string }>) => {
         state.notice = action.payload.notice
      }
   },
   extraReducers: (builder) => {
      builder.addCase(setLogin.pending, (state) => {
         state.status = 'pending'
      })
         .addCase(setLogin.fulfilled, (state) => {
            state.status = 'succeeded'
         })
         .addCase(setLogin.rejected, (state, action) => {
            state.status = 'failed'
            action.payload ? state.notice = action.payload : state.notice = 'unexpected error'
         })
   }
})
export const loginReducer = slice.reducer
export const { setNotice } = slice.actions
export const setLogin = createAsyncThunk<AuthResponseDataType, LoginRequestType, { rejectValue: string }>(
   'login/setLogin',
   async (data: LoginRequestType, { rejectWithValue, dispatch }) => {
      try {
         const res = await authAPI.login(data)
         dispatch(setAuthData({ data: res.data }))
         return res.data
      } catch (err: any) {
         const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
         return rejectWithValue(error)
      }
   }
)