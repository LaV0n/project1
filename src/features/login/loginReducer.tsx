import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { StatusType } from "../../common/types"
import { loginAPI, LoginRequestDataType, LoginResponseDataType } from "./login-api"
const slice = createSlice({
    name: 'login',
    initialState: {
        data: {} as LoginResponseDataType,
        status: 'idle' as StatusType,
        notice: '' as string
    },
    reducers: {
        setNotice: (state, action: PayloadAction<{ notice: string }>) => {
            state.notice = action.payload.notice
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setLogin.pending, (state, action) => {
            state.status = 'pending'
        })
        builder.addCase(setLogin.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = 'succeeded'
        })
        builder.addCase(setLogin.rejected, (state, action) => {
            state.status = 'failed'
            action.payload ? state.notice = action.payload : state.notice = 'unexpected error'
        })
    }
})
export const loginReducer = slice.reducer
export const { setNotice } = slice.actions
export const setLogin = createAsyncThunk<LoginResponseDataType, LoginRequestDataType, { rejectValue: string }>(
    'login/setLogin',
    async (data: LoginRequestDataType, { rejectWithValue }) => {
        try {
            const res = await loginAPI.login(data)
            return res.data
        } catch (err: any) {
            const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
            return rejectWithValue(error)
        }
    }
)