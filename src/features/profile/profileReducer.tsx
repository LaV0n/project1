import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusType } from "../../common/types";
import { authAPI, UpdateProfileRequestType } from '../../api/auth-api';
import { setAuthData } from "../../app/authReducer";
import { errorAsString } from "../../common/utils/errorAsString";

const initialState = {
   status: 'idle',
   notice: ''
}

const slice = createSlice({
   name: 'profile',
   initialState,
   reducers: {
      setStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
         state.status = action.payload.status
      },
      setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
         state.notice = action.payload.notice
      }
   },
   extraReducers: builder => {
      builder.addCase(updateProfile.rejected, (state, action) => {
         state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
         state.status = 'failed'
      })
   }
})

export const profileReducer = slice.reducer;

export const { setStatusAC, setErrorNotice } = slice.actions

export const updateProfile = createAsyncThunk<unknown, UpdateProfileRequestType, { rejectValue: { error: string } }>(
   'profile/setName',
   async (data: UpdateProfileRequestType, { dispatch, rejectWithValue }) => {
      dispatch(setStatusAC({ status: 'pending' }))
      try {
         const res = await authAPI.updateProfile(data)
         dispatch(setStatusAC({ status: 'succeeded' }))
         dispatch(setAuthData({ data: res.data.updatedUser }));
      } catch (err) {
         const error = errorAsString(err)
         return rejectWithValue({ error })
      }
   }
)