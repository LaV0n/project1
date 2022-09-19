import React, {useEffect} from 'react';
import './App.scss';
import {Navbar} from "../features/navbar/Navbar";
import {Route, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import {Registration} from "../features/registration/Registration";
import {Profile} from "../features/profile/Profile";
import {ErrorPage} from "../features/errorPage/ErrorPage";
import {RestorePassword} from "../features/restorePassword/RestorePassword";
import {NewPassword} from "../features/newPassword/NewPassword";
import {TestPage} from "../features/testPage/TestPage";
import {initializeAppTC} from "../features/profile/profileReducer";
import {useAppDispatch} from "./store";


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <>

            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/restorepassword'} element={<RestorePassword/>}/>
                <Route path={'/newpassword/:token'} element={<NewPassword/>}/>
                <Route path={'/testpage'} element={<TestPage/>}/>
                <Route path={'/error'} element={<ErrorPage/>}/>
            </Routes>
            <Navbar/>
        </>
    );
}

export default App;
