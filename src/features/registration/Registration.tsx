import React from "react";
import style from "./Registration.module.css"
import {registrTC} from "./registrationReducer";
import {useAppDispatch} from "../../app/store";
import {FormContainer} from "../../components/Form/FormContainer/FormContainer";
import {FormTitle} from "../../components/Form/FormTitle/FormTitle";
import {FormFooter} from "../../components/Form/FormFooter/FormFooter";
import {FormEmail} from "../../components/Form/FormEmail/FormEmail";
import {FormPassword} from "../../components/Form/FormPassword/FormPassword";
import {useFormik} from "formik";

export const Registration = () => {

      const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(registrTC(values.email,values.password));
        },
    });


    const dispatch = useAppDispatch()


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
                                onClick={formik.handleSubmit}
                    >Already have an account</FormFooter>


                </form>
            </FormContainer>


        </div>
    )
}