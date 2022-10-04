import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { loginReducer } from "../features/auth/login/loginReducer";
import { newPasswordReducer } from "../features/auth/newPassword/newPasswordReducer";
import { profileReducer } from "../features/profile/profileReducer";
import { registrationReducer } from "../features/auth/registration/registrationReducer";
import { restorePasswordReducer } from "../features/auth/restorePassword/restorePasswordReducer";
import { authReducer } from "./authReducer";
import { appReducer } from './appReducer';
import { cardsReducer } from "../features/cards/cardsReducer";
import { packsReducer } from './../features/packs/packsReducer';
import { learningReducer } from "../features/learning/learningReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    login: loginReducer,
    registration: registrationReducer,
    restorePassword: restorePasswordReducer,
    profile: profileReducer,
    newPassword: newPasswordReducer,
    cards: cardsReducer,
    packs: packsReducer,
    learning: learningReducer
})

export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;