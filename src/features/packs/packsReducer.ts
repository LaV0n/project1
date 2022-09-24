import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppRootStateType } from "../../app/store";
import { CreateNewPackRequestType, packsAPI, PacksDataType, UpdatePackNameRequestType } from './../../api/packs-api';
const initialState = {
   data: {} as PacksDataType,
   params: {
      page: 1,
      pageCount: 15
   },
   isInitialized: false,
   notice: ''
}
const slice = createSlice({
   name: 'packs',
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      builder.addCase(getPacks.pending, () => { })
      builder.addCase(getPacks.fulfilled, (state, action) => {
         state.data = action.payload
         state.isInitialized = true
      })
      builder.addCase(getPacks.rejected, () => { })
   }
})
export const packsReducer = slice.reducer
export const getPacks = createAsyncThunk<PacksDataType, undefined, any>(
   'packs\getpacks',
   async (_, { getState, rejectWithValue }) => {
      const params = (getState() as AppRootStateType).packs.params
      try {
         const res = await packsAPI.getPacks(params)
         return res.data
      } catch (err) {
         return rejectWithValue('')
      }
   }
)
export const addNewPack = createAsyncThunk<any, CreateNewPackRequestType, any>(
   'packs/addNewPack',
   async (data, { dispatch, rejectWithValue }) => {
      try {
         await packsAPI.createNewPack(data)
         dispatch(getPacks())
      } catch (err) {
         return rejectWithValue('')
      }
   }
)
export const deletePack = createAsyncThunk<any, string, any>(
   'packs/addNewPack',
   async (id, { dispatch, rejectWithValue }) => {
      try {
         await packsAPI.deletePack(id)
         dispatch(getPacks())
      } catch (err) {
         return rejectWithValue('')
      }
   }
)
export const editPackName = createAsyncThunk<any, UpdatePackNameRequestType, any>(
   'packs/addNewPack',
   async (data, { dispatch, rejectWithValue }) => {
      try {
         await packsAPI.updatePackName(data)
         dispatch(getPacks())
      } catch (err) {
         return rejectWithValue('')
      }
   }
)