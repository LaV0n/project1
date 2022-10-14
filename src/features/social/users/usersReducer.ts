import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersAPI, UsersGetType} from "../../../api/users-api";
import {errorAsString} from "../../../common/utils/errorAsString";

export type UserDataType = {
    _id: string
    email: string
    name: string
    avatar?: string
    updated: string
    isAdmin: boolean
    publicCardPacksCount: number
}
const UserPageData = {
    users: [] as UserDataType[],
    page: 0,
    pageCount: 0,
    usersTotalCount: 0,
    minPublicCardPacksCount: 0,
    maxPublicCardPacksCount: 0,
}
export type UserPageDataType =typeof UserPageData

const initialState={
    data: UserPageData,
    status: false,
    notice: '',
    page: 1,
    pageCount: 5
}

const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsersTC.rejected,(state, action)=>{
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(getUsersTC.fulfilled,(state, action)=>{
            state.data = action.payload
            state.status=false
        })
    }
})

export const userReducer = slice.reducer
export const {setStatus,setPage,setErrorNotice,setPageCount} = slice.actions

export const getUsersTC = createAsyncThunk<UserPageDataType, UsersGetType, {rejectValue: {error: string}}>
('users/getUsers', async (data,{dispatch,rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        const res= await usersAPI.getUsers(data)
        return res.data
    }catch (err){
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})