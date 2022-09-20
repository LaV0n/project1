import React from "react";
import {useAppDispatch} from "../../app/store";
import {setLoginTC} from "../profile/profileReducer";
import {cardsAPI} from "../../api/cards-apiP";

export const TestPage = () => {
    const dispatch=useAppDispatch()
    const loginHandler=()=>{
        dispatch(setLoginTC())
    }
    const registartion =async ()=>{
        await cardsAPI.registration()

    }
    return (
        <div>
            <div>Test  PAGE</div>
            <button onClick={loginHandler}>login</button>
            <button onClick={registartion}>registration</button>
        </div>
    )
}