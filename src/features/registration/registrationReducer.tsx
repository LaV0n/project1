import { Dispatch } from "redux"
import { authAPI } from "../../api/auth-api"
//import { ActionType } from "../../app/store"
const SET_IS_REG = 'SET-IS-REG'
type RegistrationStateType = {
   isReg: boolean
}
const initialState = {
   isReg: false
}
export const registrationReducer = (state: RegistrationStateType = initialState, action: ReturnType<typeof setIsRegAC>): RegistrationStateType => {
   switch (action.type) {
      case SET_IS_REG: {
         return { ...state, isReg: action.payload.isReg }
      }
      default:
         return state
   }
}
export const setIsRegAC = (isReg: boolean) => (
   { type: 'SET-IS-REG', payload: { isReg: isReg } } as const
)

export const registrTC = (email: string, password: string) => (dispatch: Dispatch) => {
   authAPI.registration({ email, password })
      .then((res) => {
         dispatch(setIsRegAC(true))
         return res.data

      })
}