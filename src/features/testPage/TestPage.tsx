import React from "react";
import SuperInputText from "../../components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/c3-SuperCheckbox/SuperCheckbox";
import {useAppDispatch} from "../../app/store";
import {setLoginTC} from "../profile/profileReducer";

export const TestPage = () => {
    const dispatch=useAppDispatch()
    const loginHandler=()=>{
        dispatch(setLoginTC())
    }
    return (
        <div>
            <div>Test  PAGE</div>
            <button onClick={loginHandler}>login</button>
            <div>
                <SuperInputText/>
            </div>
            <div>
                <SuperButton>Button</SuperButton>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
        </div>
    )
}