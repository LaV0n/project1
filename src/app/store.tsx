import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {firstReducerAC, loginReducer, secondReducerAC} from "../features/login/loginReducer";
import thunk from "redux-thunk";
import {fourthReducerAC, registrationReducer, thirdReducerAC} from "../features/registration/registrationReducer";
import {restoreFirstAC, restorePasswordReducer, restoreSecondAC} from "../features/restorePassword/restorePasswordReducer";
import {newPasswordFirstAC, newPasswordSecondAC} from "../features/newPassword/newPasswordReducer";
import {profileFirstAC, profileSecondAC} from "../features/profile/profileReducer";

export type ActionType =
    ReturnType<typeof firstReducerAC> |
    ReturnType<typeof secondReducerAC> |
    ReturnType<typeof thirdReducerAC> |
    ReturnType<typeof fourthReducerAC> |
    ReturnType<typeof restoreFirstAC> |
    ReturnType<typeof restoreSecondAC> |
    ReturnType<typeof newPasswordFirstAC> |
    ReturnType<typeof newPasswordSecondAC> |
    ReturnType<typeof profileFirstAC> |
    ReturnType<typeof profileSecondAC>

const rootReducer= combineReducers({
    first:loginReducer,
    second:registrationReducer,
    restore:restorePasswordReducer
})
export const store =createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;