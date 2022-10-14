import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {errorAsString} from "../../../common/utils/errorAsString";
import {usersAPI} from "../../../api/users-api";

export type UserProfileType = {
    _id: string
    email: string
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    avatar: string
}

const initialState = {
    data: {} as UserProfileType,
    notice: '',
    status: false
}

const slice = createSlice({
    name: 'friendProfile',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
    },
    extraReducers: builder => {
        builder.addCase(getUserProfileTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = false
        })
        builder.addCase(getUserProfileTC.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = false
        })
    }
})

export const friendProfileReducer = slice.reducer
export const {setStatus, setErrorNotice} = slice.actions

export const getUserProfileTC = createAsyncThunk< UserProfileType,string, { rejectValue: { error: string } }>
('friendProfile/getUser', async (id, {dispatch, rejectWithValue}) => {
    dispatch(setStatus({status: true}))
    try {
        const res= await usersAPI.getUserProfile(id)
        return res.data.user
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})