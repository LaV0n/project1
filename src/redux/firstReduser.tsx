const First = 'FIRST_REDUCER'
const Second = 'SECOND_REDUCER'

type firstReducerACType = {
    type: 'FIRST_REDUCER'
}

type secondReducerACType = {
    type: 'SECOND_REDUCER'
}
type ActionType = firstReducerACType | secondReducerACType

type FirstStateType ={
    first:string
}

const initialState = {
    first:'hello word'
}

export const ReducerFirst = (state:FirstStateType = initialState, action: ActionType):FirstStateType => {
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
export const firstReducerAC = (): firstReducerACType => {
    return {type: First}
}
export const secondReducerAC = (): secondReducerACType => {
    return {type: Second}
}