import { ActionType } from "./store"

const First = 'loginReducer/FIRST_REDUCER'
const Second = 'loginReducer/SECOND_REDUCER'

type LoginStateType ={
    first:string
}

const initialState = {
    first:'hello word'
}

export const loginReducer = (state:LoginStateType = initialState, action: ActionType):LoginStateType => {
    switch (action.type) {
        case First: {
            return state
        }
        case Second: {
            return state
        }
        default:
            return state
    }

}
export const firstReducerAC = () => (
     {type: First} as const
)
export const secondReducerAC = () => (
     {type: Second} as const
)