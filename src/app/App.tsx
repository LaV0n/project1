import React from 'react';
import './App.css';
import { Navbar } from "../features/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Login } from "../features/login/Login";
import { Registration } from "../features/registration/Registration";
import { Profile } from "../features/profile/Profile";
import { ErrorPage } from "../features/errorPage/ErrorPage";
import { RestorePassword } from "../features/restorePassword/RestorePassword";
import { NewPassword } from "../features/newPassword/NewPassword";
import { TestPage } from "../features/testPage/TestPage";
import { Header } from '../features/header/Header';


function App() {
    return (<>
        <Header />
        <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/registration'} element={<Registration />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/restorepassword'} element={<RestorePassword />} />
            <Route path={'/newpassword'} element={<NewPassword />} />
            <Route path={'/testpage'} element={<TestPage />} />
            <Route path={'/error'} element={<ErrorPage />} />
        </Routes>
        <Navbar />
    </>
    );
}

export default App;