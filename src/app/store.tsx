import {combineReducers} from "redux";
import {firstReducerAC, loginReducer, secondReducerAC} from "../features/login/loginReducer";
import {fourthReducerAC, registrationReducer, thirdReducerAC} from "../features/registration/registrationReducer";
import {restorePasswordReducer, setSendStatusAC} from "../features/restorePassword/restorePasswordReducer";
import { newPasswordReducer} from "../features/newPassword/newPasswordReducer";
import {
    getProfileDataAC,
    profileReducer,
    setInitializedAC,
    setLoginAC,
    setStatusAC
} from "../features/profile/profileReducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from "react-redux";

export type ActionType =
    ReturnType<typeof firstReducerAC> |
    ReturnType<typeof secondReducerAC> |
    ReturnType<typeof thirdReducerAC> |
    ReturnType<typeof fourthReducerAC> |
    ReturnType<typeof setInitializedAC> |
    ReturnType<typeof setLoginAC> |
    ReturnType<typeof getProfileDataAC> |
    ReturnType<typeof setStatusAC> |
    ReturnType<typeof setSendStatusAC>


const rootReducer = combineReducers({
    first: loginReducer,
    second: registrationReducer,
    restorePassword: restorePasswordReducer,
    profile: profileReducer,
    newPassword:newPasswordReducer
})
export const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
    }
)

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch: () => AppDispatchType = useDispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionType>

// @ts-ignore
window.store = store;