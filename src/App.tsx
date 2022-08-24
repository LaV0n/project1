import React from 'react';
import './App.css';
import {Navbar} from "./components/navbar/Navbar";
import { HashRouter, Route, Routes} from "react-router-dom";
import {Login} from "./components/login/Login";
import {Registration} from "./components/registration/Registration";
import {Profile} from "./components/profile/Profile";
import {ErrorPage} from "./components/errorPage/ErrorPage";
import {RestorePassword} from "./components/restorePassword/RestorePassword";
import {NewPassword} from "./components/newPassword/NewPassword";
import {TestPage} from "./components/testPage/TestPage";



function App() {
    return (
        <HashRouter >
            <Navbar/>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/restorepassword'} element={<RestorePassword/>}/>
                <Route path={'/newpassword'} element={<NewPassword/>}/>
                <Route path={'/testpage'} element={<TestPage/>}/>
                <Route path={'/error'} element={<ErrorPage/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
