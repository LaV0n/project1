import { ActionType } from "./store"

const Third = 'registrationReducer/THIRD_REDUCER'
const Fourth = 'registrationReducer/FOURTH_REDUCER'

type RegistrationStateType ={
    second:string
}

const initialState = {
    second:'bye'
}

export const registrationReducer = (state:RegistrationStateType = initialState, action: ActionType):RegistrationStateType => {
    switch (action.type) {
        case Third: {
            return state
        }
        case Fourth: {
            return state
        }
        default:
            return state
    }

}
export const thirdReducerAC = () => (
     {type: Third} as const
)
export const fourthReducerAC = () => (
    {type: Fourth} as const
)