import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../api/auth-api';
import { AuthResponseDataType, StatusType } from '../common/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
const slice = createSlice(
   {
      name: 'auth',
      initialState: {
         data: {} as AuthResponseDataType,
         isAuth: false,
         status: 'idle' as StatusType
      },
      reducers: {
         setAuthData: (state, action: PayloadAction<{ data: AuthResponseDataType }>) => {
            state.data = action.payload.data
            state.isAuth = true
         },
      },
      extraReducers: (builder) => {
         builder.addCase(setLogout.pending, (state) => {
            state.status = 'pending'
         })
         builder.addCase(setLogout.fulfilled, (state) => {
            state.data = {} as AuthResponseDataType
            state.isAuth = false
         })
         builder.addCase(setLogout.rejected, (state) => {
            state.status = 'failed'
         })
      }
   }
)
export const authReducer = slice.reducer
export const { setAuthData } = slice.actions
export const setLogout = createAsyncThunk(
   'auth/logout',
   async (_, { rejectWithValue }) => {
      try {
         await authAPI.logout()
      } catch (err: any) {
         const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
         return rejectWithValue(error)
      }
   }
)