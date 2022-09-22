import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { loginReducer } from "../features/login/loginReducer";
import { newPasswordReducer, setPasswordStatusAC } from "../features/newPassword/newPasswordReducer";
import { profileReducer, setStatusAC } from "../features/profile/profileReducer";
import { registrationReducer } from "../features/registration/registrationReducer";
import { restorePasswordReducer, setSendStatusAC } from "../features/restorePassword/restorePasswordReducer";
import { authReducer } from "./authReducer";
import { appReducer } from './appReducer';

export type ActionType =
    ReturnType<typeof setIsRegAC> |
    ReturnType<typeof setInitializedAC> |
    ReturnType<typeof setLoginAC> |
    ReturnType<typeof getProfileDataAC> |
    ReturnType<typeof setStatusAC> |
    ReturnType<typeof setSendStatusAC> |
    ReturnType<typeof setPasswordStatusAC>

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login: loginReducer,
    registration: registrationReducer,
    restorePassword: restorePasswordReducer,
    profile: profileReducer,
    newPassword: newPasswordReducer
})
// export const store =createStore(rootReducer,applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch


export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;