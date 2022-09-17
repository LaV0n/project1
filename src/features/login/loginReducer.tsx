import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginAPI, LoginRequestDataType, LoginResponseDataType } from "./login-api"
const slice = createSlice({
    name: 'login',
    initialState: {} as LoginResponseDataType,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(setLogin.fulfilled, (state, action) => {
            state = action.payload
        })
    }
})
export const loginReducer = slice.reducer



export const setLogin = createAsyncThunk<LoginResponseDataType, LoginRequestDataType, { rejectValue: { error: string } }>(
    'login/setLogin',
    async (data: LoginRequestDataType, { rejectWithValue }) => {
        try {
            const res = await loginAPI.login(data)
            return res.data
        } catch (err: any) {
            return rejectWithValue({ error: 'Some Error' })
        }
    }
)


//delete this !IMPORTANT
const First = 'loginReducer/FIRST_REDUCER'
const Second = 'loginReducer/SECOND_REDUCER'
export const firstReducerAC = () => (
    { type: First } as const
)
export const secondReducerAC = () => (
    { type: Second } as const
)
export type SetLoginType = ReturnType<typeof setLogin>