import {useEffect} from 'react';
import './App.scss';
import {Navbar} from "../components/TEMP/navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/auth/login/Login";
import {Registration} from "../features/auth/registration/Registration";
import {Profile} from "../features/profile/Profile";
import {ErrorPage} from "../components/errorPage/ErrorPage";
import {RestorePassword} from "../features/auth/restorePassword/RestorePassword";
import {TestPage} from "../components/TEMP/testPage/TestPage";
import {useAppDispatch, useAppSelector} from "./store";
import {Header} from "../components/header/Header";
import {appPath} from '../common/path/appPath';
import {initializeApp} from './appReducer';
import {NewPassword} from '../features/auth/newPassword/NewPassword';
import {Cards} from "../features/cards/Cards.";
import {Packs} from '../features/packs/Packs';
import {Learning} from "../features/learning/Learning";
import {Users} from "../features/social/users/Users";
import {FriendProfile} from "../features/social/friendProfile/FriendProfile";

function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])
    if (!isInitialized) {
        return <></>
    }
    return (
        <div className='app'>
            <Header/>
            <div className='container'>
                <Routes>
                    <Route path={appPath.LOGIN} element={<Login/>}/>
                    <Route path={appPath.REGISTRATION} element={<Registration/>}/>
                    <Route path={appPath.PROFILE} element={<Profile/>}/>
                    <Route path={appPath.RESTOREPASSWORD} element={<RestorePassword/>}/>
                    <Route path={appPath.NEWPASSWORD} element={<NewPassword/>}/>
                    <Route path={appPath.ERRORPAGE} element={<ErrorPage/>}/>
                    <Route path={appPath.CARDS} element={<Cards/>}/>
                    <Route path={appPath.MAIN} element={<Profile/>}/>
                    <Route path={appPath.PACKS} element={<Packs/>}/>
                    <Route path={appPath.LEARNING} element={<Learning/>}/>
                    <Route path={appPath.USERS} element={<Users/>}/>
                    <Route path={appPath.USER} element={<FriendProfile/>}/>
                    <Route path={'/'} element={<Navigate to={appPath.PROFILE}/>}/>
                    <Route path={'*'} element={<Navigate to={appPath.ERRORPAGE}/>}/>
                    <Route path={'/testpage'} element={<TestPage/>}/>
                </Routes>
            {/*    <Navbar/>*/}
            </div>
        </div>
    );
}

export default App;
