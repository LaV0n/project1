import {authAPI} from "../../../api/auth-api"
import {StatusType} from "../../../common/types"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {errorAsString} from "../../../common/utils/errorAsString";

const initialState = {
    isRegistration: false,
    status: 'idle',
    notice: ''
}

const slice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setStatus(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        setNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
        setIsRegistrationAC(state, action: PayloadAction<{ isRegistration: boolean }>) {
            state.isRegistration = action.payload.isRegistration
        }
    },
    extraReducers: builder => {
        builder.addCase(registrationTC.fulfilled, (state) => {
            state.isRegistration = true
            state.status = 'succeeded'
        })
        builder.addCase(registrationTC.rejected, (state, action) => {
            state.notice = action.payload ? action.payload.error : 'unknown error, please try again later'
            state.status = 'failed'
        })

    }
})

export const registrationReducer=slice.reducer
export const {setStatus, setNotice,setIsRegistrationAC}=slice.actions

export const registrationTC = createAsyncThunk<unknown, RegistrationDataType, { rejectValue: { error: string } }>
('registration/send', async (data, {dispatch, rejectWithValue}) => {
    dispatch(setStatus({status:'pending'}))
    try {
        await authAPI.registration({email: data.email, password: data.password})
        return true
    } catch (err) {
        const error = errorAsString(err)
        return rejectWithValue({error})
    }
})

type RegistrationDataType = {
    email: string
    password: string
}