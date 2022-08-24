const Third = 'THIRD_REDUCER'
const Fourth = 'FOURTH_REDUCER'

type thirdReducerACType = {
    type: 'THIRD_REDUCER'
}

type fourthReducerACType = {
    type: 'FOURTH_REDUCER'
}
type ActionType = thirdReducerACType | fourthReducerACType

type SecondStateType ={
    second:string
}

const initialState = {
    second:'bye'
}

export const ReducerSecond = (state:SecondStateType = initialState, action: ActionType):SecondStateType => {
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
export const firstReducerAC = (): thirdReducerACType => {
    return {type: Third}
}
export const secondReducerAC = (): fourthReducerACType => {
    return {type: Fourth}
}