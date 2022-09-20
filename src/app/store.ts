import { configureStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { loginReducer } from "../features/login/loginReducer";
import { fourthReducerAC, registrationReducer, thirdReducerAC } from "../features/registration/registrationReducer";
import { restoreFirstAC, restorePasswordReducer, restoreSecondAC } from "../features/restorePassword/restorePasswordReducer";
import { newPasswordFirstAC, newPasswordSecondAC } from "../features/newPassword/newPasswordReducer";
import { profileFirstAC, profileSecondAC } from "../features/profile/profileReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export type ActionType =
    ReturnType<typeof thirdReducerAC> |
    ReturnType<typeof fourthReducerAC> |
    ReturnType<typeof restoreFirstAC> |
    ReturnType<typeof restoreSecondAC> |
    ReturnType<typeof newPasswordFirstAC> |
    ReturnType<typeof newPasswordSecondAC> |
    ReturnType<typeof profileFirstAC> |
    ReturnType<typeof profileSecondAC>

const rootReducer = combineReducers({
    login: loginReducer,
    second: registrationReducer,
    restore: restorePasswordReducer
})
export const store = configureStore({
    reducer: rootReducer,
})
export type AppRootStateType = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionType>
// @ts-ignore
window.store = store;