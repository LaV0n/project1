import { ActionType } from "./store"

const restoreFirst = 'restorePasswordReducer/THIRD_REDUCER'
const restoreSecond = 'restorePasswordReducer/FOURTH_REDUCER'

type RestorePasswordStateType ={
    second:string
}

const initialState = {
    second:'bye'
}

export const restorePasswordReducer = (state:RestorePasswordStateType = initialState, action: ActionType):RestorePasswordStateType => {
    switch (action.type) {
        case restoreFirst: {
            return state
        }
        case restoreSecond: {
            return state
        }
        default:
            return state
    }

}
export const restoreFirstAC = () => (
     {type: restoreFirst} as const
)
export const restoreSecondAC = () => (
    {type: restoreSecond} as const
)