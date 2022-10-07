import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setStatusAC} from "../../profile/profileReducer";
import {authAPI} from "../../../api/auth-api";
import {errorAsString} from "../../../common/utils/errorAsString";

const initialState = {
    sendStatus: false,
    notice: ''
}

const slice = createSlice({
    name: 'restorePassword',
    initialState: initialState,
    reducers: {
        setSendStatusAC(state, action: PayloadAction<{ sendStatus: boolean }>) {
            state.sendStatus = action.payload.sendStatus
        },
        setNoticeErrorAC(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        }
    },
    extraReducers: builder => {
        builder.addCase(restorePasswordTC.fulfilled, (state) => {
            state.sendStatus = true
        })
        builder.addCase(restorePasswordTC.rejected, (state, action) => {
            state.sendStatus = false
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
        })
    }
})

export const restorePasswordReducer = slice.reducer
export const {setSendStatusAC, setNoticeErrorAC} = slice.actions

export const restorePasswordTC = createAsyncThunk<unknown, string, { rejectValue: { error: string } }>
('restorePassword/send', async (email, {dispatch, rejectWithValue}) => {
    dispatch(setStatusAC({status: 'pending'}))
    try {
        await authAPI.restorePassword(email)
        dispatch(setStatusAC({status: 'succeeded'}))
    } catch (err) {
        dispatch(setStatusAC({status: 'failed'}))
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})