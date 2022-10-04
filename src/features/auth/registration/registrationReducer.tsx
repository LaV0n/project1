import { Dispatch } from "redux"
import { authAPI } from "../../../api/auth-api"
import { AppDispatchType } from "../../../app/store"
import { StatusType } from "../../../common/types"
import { AxiosError } from 'axios';
const SET_IS_REGISTRATION = 'SET-IS-REGISTRATION'
const SET_REGISTRATION_STATUS = 'SET-REGISTRATION-STATUS'
const SET_REGISTRATION_NOTICE = 'SET-REGISTRATION-NOTICE'
type RegistrationStateType = {
   isRegistration: boolean,
   status: StatusType
   notice: string
}
const initialState: RegistrationStateType = {
   isRegistration: false,
   status: 'idle',
   notice: ''
}
export const registrationReducer = (state = initialState, action: RegistrationActionsType): RegistrationStateType => {
   switch (action.type) {
      case SET_IS_REGISTRATION: return { ...state, isRegistration: action.payload.isRegistration }
      case SET_REGISTRATION_STATUS: return { ...state, status: action.payload.status }
      case SET_REGISTRATION_NOTICE: return { ...state, notice: action.payload.notice }
      default: return state
   }
}
export const setIsRegistrationAC = (isRegistration: boolean) => (
   { type: SET_IS_REGISTRATION, payload: { isRegistration } } as const
)
export const setStatus = (status: StatusType) => (
   { type: SET_REGISTRATION_STATUS, payload: { status } } as const
)
export const setNotice = (message: string) => (
   { type: SET_REGISTRATION_NOTICE, payload: { notice: message } } as const
)
export const registrTC = (email: string, password: string) => (dispatch: AppDispatchType) => {
   dispatch(setStatus('pending'))
   authAPI.registration({ email, password })
      .then(res => {
         dispatch(setStatus('succeeded'))
         dispatch(setIsRegistrationAC(true))
         return res.data
      }).catch(err => {
         const error: string = (err as AxiosError).response?.data ? err.response.data.error : 'Unexpected error'
         dispatch(setStatus('failed'))
         dispatch(setNotice(error))
      })
}
type RegistrationActionsType =
   | ReturnType<typeof setIsRegistrationAC>
   | ReturnType<typeof setStatus>
   | ReturnType<typeof setNotice> 
