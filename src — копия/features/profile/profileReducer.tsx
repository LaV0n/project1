import { ActionType } from "../../app/store"

const profileFirst = 'profileReducer/FIRST_REDUCER'
const profileSecond = 'profileReducer/SECOND_REDUCER'

type ProfileStateType ={
    first:string
}

const initialState = {
    first:'hello word'
}

export const profileReducer = (state:ProfileStateType = initialState, action: ActionType):ProfileStateType => {
    switch (action.type) {
        case profileFirst: {
            return state
        }
        case profileSecond: {
            return state
        }
        default:
            return state
    }

}
export const profileFirstAC = () => (
     {type: profileFirst} as const
)
export const profileSecondAC = () => (
     {type: profileSecond} as const
)