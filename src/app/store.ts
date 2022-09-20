import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import { loginReducer } from "../features/login/loginReducer";
import {fourthReducerAC, registrationReducer, registrationReducerAC} from "../features/registration/registrationReducer";
import {restoreFirstAC, restorePasswordReducer, restoreSecondAC} from "../features/restorePassword/restorePasswordReducer";
import {profileFirstAC, profileSecondAC} from "../features/profile/profileReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {newPasswordFirstAC, newPasswordSecondAC} from "../features/newPassword/newPasswordReducer";

export type ActionType =

    ReturnType<typeof registrationReducerAC> |
    ReturnType<typeof fourthReducerAC> |
    ReturnType<typeof restoreFirstAC> |
    ReturnType<typeof restoreSecondAC> |
    ReturnType<typeof newPasswordFirstAC> |
    ReturnType<typeof newPasswordSecondAC> |
    ReturnType<typeof profileFirstAC> |
    ReturnType<typeof profileSecondAC>

const rootReducer= combineReducers({
    login:loginReducer,
    second:registrationReducer,
    restore:restorePasswordReducer
})
// export const store =createStore(rootReducer,applyMiddleware(thunk))
export const store = configureStore({reducer: rootReducer})
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;