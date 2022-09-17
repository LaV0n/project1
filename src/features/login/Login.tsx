import { Formik, Form, Field } from "formik";
import { useAppDispatch } from "../../app/store";
import { setLogin } from "./loginReducer";

export const Login = () => {
    const dispatch = useAppDispatch()
    return (
        <div>
            LOGIN PAGE
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false
                }}
                onSubmit={values => {
                    dispatch(setLogin(values))
                }}
            >
                <Form>
                    <Field name="email" />
                    <Field name="password" />
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    )
}