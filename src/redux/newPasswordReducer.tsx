import { ActionType } from "./store"

const newPasswordFirst = 'newPasswordReducer/FIRST_REDUCER'
const newPasswordSecond = 'newPasswordReducer/SECOND_REDUCER'

type NewPasswordStateType ={
    second:string
}

const initialState = {
    second:'bye'
}

export const newPasswordReducer = (state:NewPasswordStateType = initialState, action: ActionType):NewPasswordStateType => {
    switch (action.type) {
        case newPasswordFirst: {
            return state
        }
        case newPasswordSecond: {
            return state
        }
        default:
            return state
    }

}
export const newPasswordFirstAC = () => (
     {type: newPasswordFirst} as const
)
export const newPasswordSecondAC = () => (
    {type: newPasswordSecond} as const
)