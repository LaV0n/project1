import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {firstReducerAC, loginReducer, secondReducerAC} from "../features/login/loginReducer";
import thunk from "redux-thunk";
import {fourthReducerAC, registrationReducer, thirdReducerAC} from "../features/registration/registrationReducer";
import {restoreFirstAC, restorePasswordReducer, restoreSecondAC} from "../features/restorePassword/restorePasswordReducer";
import {newPasswordFirstAC, newPasswordSecondAC} from "../features/newPassword/newPasswordReducer";
import {profileFirstAC, profileSecondAC} from "../features/profile/profileReducer";

export type ActionType =

    ReturnType<typeof registrationReducerAC> |
    ReturnType<typeof fourthReducerAC> |
    ReturnType<typeof setInitializedAC> |
    ReturnType<typeof setLoginAC> |
    ReturnType<typeof getProfileDataAC> |
    ReturnType<typeof setStatusAC> |
    ReturnType<typeof setSendStatusAC> |
    ReturnType<typeof setPasswordStatusAC>


const rootReducer= combineReducers({
    login:loginReducer,
    second:registrationReducer,
    restore:restorePasswordReducer,
    restorePassword: restorePasswordReducer,
    profile: profileReducer,
    newPassword:newPasswordReducer
})
// export const store =createStore(rootReducer,applyMiddleware(thunk))
export const store = configureStore({reducer: rootReducer})
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;