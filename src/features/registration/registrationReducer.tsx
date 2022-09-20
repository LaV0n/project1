import { ActionType } from "../../app/store"
import {cardsAPI} from "../../api/cards-api";
import {Dispatch} from "redux";

const Registration = 'registrationReducer/THIRD_REDUCER'
const Fourth = 'registrationReducer/FOURTH_REDUCER'

type RegistrationStateType ={
    second:string
}

const initialState = {
    second:'bye'
}

export const registrationReducer = (state:RegistrationStateType = initialState, action: ActionType):RegistrationStateType => {
    switch (action.type) {
        case Registration: {
            return {...state}
        }
        case Fourth: {
            return state
        }
        default:
            return state
    }

}

export type RegistrationActionType = ReturnType<typeof registrationReducerAC>

export const registrationReducerAC = () => (
     {type: Registration} as const
)
export const fourthReducerAC = () => (
    {type: Fourth} as const
)

export const registrTC = (email:string, password: string) => (dispatch: Dispatch) => {
    cardsAPI.registration({email, password})
        .then((res) => {
            res.data
        })
}