import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ReducerFirst} from "./firstReduser";
import thunk from "redux-thunk";
import {ReducerSecond} from "./secondReduser";


const rootReducer= combineReducers({
    first:ReducerFirst,
    second:ReducerSecond
})
export const store =createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;