import { Dispatch } from "redux"
import { cardsAPI } from "../../api/cards-api"
import { ActionType } from "../../app/store"

const SET_IS_REG = 'SET-IS-REG'
const Fourth = 'registrationReducer/FOURTH_REDUCER'

type RegistrationStateType ={
    isReg:boolean
}

const initialState = {
    isReg: false
}

export const registrationReducer = (state:RegistrationStateType = initialState, action: ReturnType<typeof setIsRegAC> ):RegistrationStateType => {
    switch (action.type) {
        case SET_IS_REG: {
            return {...state,isReg: action.isReg}
        }

        default:
            return state
    }

}
export const setIsRegAC = (isReg: boolean) => (
     {type: 'SET-IS-REG',isReg} as const
)
export const fourthReducerAC = () => (
    {type: Fourth} as const
)

export const registrTC = (email:string, password: string) => (dispatch: Dispatch) => {
    cardsAPI.registration({email, password})
        .then((res) => {
            dispatch(setIsRegAC(true))
            return  res.data

        })
}