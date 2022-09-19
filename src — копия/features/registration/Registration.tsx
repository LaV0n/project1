import React, {useEffect, useState} from "react";
import SuperInputText from "../../components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/c3-SuperCheckbox/SuperCheckbox";
import style from "./Registration.module.css"
import {useDispatch} from "react-redux";
import {registrTC} from "./registrationReducer";
import {useAppDispatch} from "../../app/store";

export const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch()

    const onSubmit = () => {
       dispatch(registrTC(email,password))
    }

    return (
        <div className={style.container}>
            <input placeholder='email' onChange={(e) => setEmail(e.currentTarget.value)}/>
            <input type="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
            <button onClick={onSubmit}>Reg</button>

            <SuperInputText />
            {/*<SuperInputText />*/}
            {/*<SuperCheckbox />*/}
            {/*<SuperButton />*/}
        </div>
    )
}