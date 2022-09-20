import React, {useEffect, useState} from "react";
import SuperInputText from "../../components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../components/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../components/c3-SuperCheckbox/SuperCheckbox";
import style from "./Registration.module.css"
import {useDispatch} from "react-redux";
import {registrTC} from "./registrationReducer";
import {useAppDispatch} from "../../app/store";
import {FormContainer} from "../../components/Form/FormContainer/FormContainer";
import {FormTitle} from "../../components/Form/FormTitle/FormTitle";
import {FormFooter} from "../../components/Form/FormFooter/FormFooter";
import {FormEmail} from "../../components/Form/FormEmail/FormEmail";
import {FormPassword} from "../../components/Form/FormPassword/FormPassword";
import {useFormik} from "formik";

export const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });


    const dispatch = useAppDispatch()

    const onSubmit = () => {
       dispatch(registrTC(email,password))
    }

    return (
        <div className={style.container}>
            <FormContainer>
                <FormTitle title='Sign up'/>
                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <FormEmail isError={false}
                               errorText={'qwe'}
                               fieldProps={formik.getFieldProps('email')}


                    />
                    <FormPassword isError={false}
                                  errorText={''}
                                  fieldProps={formik.getFieldProps('password')}
                    />
                    <FormFooter buttonTitle='Sigh up'
                                linkTitle='Sign in'
                                pathTo='/login'
                                onClick={onSubmit}
                    >Already have an account</FormFooter>

                    {/*<input placeholder='email' onChange={(e) => setEmail(e.currentTarget.value)}/>*/}
                    {/*<input type="password" onChange={(e) => setPassword(e.currentTarget.value)}/>*/}
                    {/*<button onClick={onSubmit}>Reg</button>*/}

                </form>
            </FormContainer>

            {/*<SuperInputText />*/}
            {/*<SuperInputText />*/}
            {/*<SuperCheckbox />*/}
            {/*<SuperButton />*/}
        </div>
    )
}