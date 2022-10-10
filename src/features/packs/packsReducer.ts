import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppRootStateType } from "../../app/store";
import { CreateNewPackRequestType, packsAPI, PacksDataType, UpdatePackNameRequestType } from './../../api/packs-api';
import { errorAsString } from "../../common/utils/errorAsString";
import { SortType, StatusType } from "../../common/types";
const initialState = {
   data: {
      page: 1,
      pageCount: 5
   } as PacksDataType,
   isInitialized: false,
   notice: '',
   status: 'idle' as StatusType,
   params: {
      user_id: null as string | null,
      searchPacksName: null as string | null,
      sortPacks: null as SortType,
      min: null as number | null,
      max: null as number | null,
   },
   isSettings: false
}
const slice = createSlice({
   name: 'packs',
   initialState,
   reducers: {
      setNotice: (state, action: PayloadAction<string>) => { state.notice = action.payload },
      setUserPacksId: (state, action: PayloadAction<string | null>) => {
         state.params.user_id = action.payload
         state.params.min = null
         state.params.max = null
      },
      setPage: (state, action: PayloadAction<number>) => { state.data.page = action.payload },
      setPageCount: (state, action: PayloadAction<number>) => { state.data.pageCount = action.payload },
      setSearchPacksName: (state, action: PayloadAction<string | null>) => { state.params.searchPacksName = action.payload },
      setSortPacks: (state, action: PayloadAction<SortType>) => { state.params.sortPacks = action.payload },
      setFilterValues: (state, action: PayloadAction<{ min: number, max: number }>) => {
         state.params.min = action.payload.min
         state.params.max = action.payload.max
         state.data.page = 1
      },
      resetParams: (state) => {
         state.params.searchPacksName = null
         state.params.min = null
         state.params.max = null
         state.data.maxCardsCount = 0
         state.data.minCardsCount = 0
         state.params.sortPacks = null
      },
      initSettings: (state, action: PayloadAction<{ [key: string]: string | null }>) => {
         state.isSettings = true
         state.params = { ...state.params, ...action.payload }
      }
   },
   extraReducers: (builder) => {
      //pending CRUD operation
      builder.addCase(getPacks.pending, state => {
         state.status = 'pending'
      })
         .addCase(addNewPack.pending, state => {
            state.status = 'pending'
         })
         .addCase(deletePack.pending, state => {
            state.status = 'pending'
         })
         .addCase(editPackName.pending, state => {
            state.status = 'pending'
         })
      //fulfilled CRUD operation
      builder.addCase(getPacks.fulfilled, (state, action) => {
         state.data = action.payload
         state.isInitialized = true
         state.status = 'succeeded'
      })
         .addCase(addNewPack.fulfilled, state => {
            state.status = 'succeeded'
         })
         .addCase(deletePack.fulfilled, state => {
            state.status = 'succeeded'
         })
         .addCase(editPackName.fulfilled, state => {
            state.status = 'succeeded'
         })
      //reject packs CRUD operation
      builder.addCase(getPacks.rejected, (state, action) => {
         state.status = 'failed'
         state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
      })
         .addCase(addNewPack.rejected, (state, action) => {
            state.status = 'failed'
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
         })
         .addCase(deletePack.rejected, (state, action) => {
            state.status = 'failed'
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
         })
         .addCase(editPackName.rejected, (state, action) => {
            state.status = 'failed'
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
         })
   }
})

export const getPacks = createAsyncThunk<PacksDataType, undefined, { rejectValue: { error: string } }>(
   'packs/getpacks',
   async (_, { getState, rejectWithValue }) => {
      const { data, params } = (getState() as AppRootStateType).packs
      const requestParams = {
         page: data.page,
         pageCount: data.pageCount,
         packName: params.searchPacksName,
         sortPacks: params.sortPacks,
         user_id: params.user_id, min: params.min, max: params.max
      }
      try {
         const res = await packsAPI.getPacks(requestParams)
         return res.data
      } catch (err) {
         const error = errorAsString(err)
         return rejectWithValue({ error })
      }
   }
)
export const addNewPack = createAsyncThunk<unknown, CreateNewPackRequestType, { rejectValue: { error: string } }>(
   'packs/addNewPack',
   async (data, { dispatch, rejectWithValue }) => {
      try {
         await packsAPI.createNewPack(data)
         dispatch(getPacks())
      } catch (err) {
         const error = errorAsString(err)
         return rejectWithValue({ error })
      }
   }
)
export const deletePack = createAsyncThunk<unknown, string, { rejectValue: { error: string } }>(
   'packs/deletePack',
   async (id, { dispatch, rejectWithValue }) => {
      try {
         await packsAPI.deletePack(id)
         dispatch(getPacks())
      } catch (err) {
         const error = errorAsString(err)
         return rejectWithValue({ error })
      }
   }
)
export const editPackName = createAsyncThunk<unknown, UpdatePackNameRequestType, { rejectValue: { error: string } }>(
   'packs/editPackName',
   async (data, { dispatch, rejectWithValue }) => {
      try {
         await packsAPI.updatePackName(data)
         dispatch(getPacks())
      } catch (err) {
         const error = errorAsString(err)
         return rejectWithValue({ error })
      }
   }
)
export const packsReducer = slice.reducer
export const { setNotice, initSettings, setUserPacksId, setFilterValues, setPage, setSearchPacksName, setSortPacks, resetParams, setPageCount } = slice.actions