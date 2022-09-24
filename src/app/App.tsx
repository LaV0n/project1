import { useEffect } from 'react';
import './App.scss';
import { Navbar } from "../features/navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/login/Login";
import { Registration } from "../features/registration/Registration";
import { Profile } from "../features/profile/Profile";
import { ErrorPage } from "../features/errorPage/ErrorPage";
import { RestorePassword } from "../features/restorePassword/RestorePassword";
import { TestPage } from "../features/testPage/TestPage";
import { } from "../features/profile/profileReducer";
import { useAppDispatch, useAppSelector } from "./store";
import { Header } from "../features/header/Header";
import { appPath } from '../common/path/appPath';
import { initializeApp } from './appReducer';
import { NewPassword } from '../features/newPassword/NewPassword';
import { Packs } from '../features/packs/Packs';
function App() {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])
    if (!isInitialized) { return <></> }
    return (
        <div className='app'>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path={appPath.LOGIN} element={<Login />} />
                    <Route path={appPath.REGISTRATION} element={<Registration />} />
                    <Route path={appPath.PROFILE} element={<Profile />} />
                    <Route path={appPath.RESTOREPASSWORD} element={<RestorePassword />} />
                    <Route path={appPath.NEWPASSWORD} element={<NewPassword />} />
                    <Route path={appPath.ERRORPAGE} element={<ErrorPage />} />
                    <Route path={appPath.MAIN} element={<Profile />} />
                    <Route path={appPath.PACKS} element={<Packs />} />
                    <Route path={'/'} element={<Navigate to={appPath.PROFILE} />} />
                    <Route path={'*'} element={<Navigate to={appPath.ERRORPAGE} />} />
                    <Route path={'/testpage'} element={<TestPage />} />
                </Routes>
                <Navbar />
            </div>
        </div>
    );
}

export default App;
