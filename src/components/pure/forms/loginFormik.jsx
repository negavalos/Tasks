import React from 'react';
import PropTypes  from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import App from '../../../App';



const loginSchema = yup.object().shape(
    {
        email: yup.string()
                .email('Error email format')
                .required('Email is required'),
        password: yup.string()
                    .required('password is required')
    }
)





const LoginFormik = () => {
    const initialCredential = {
        email: '',
        password: ''
    }
    const history = useHistory();
    const SessiontStart = () =>{
        const session = true
        return(
            <App session={session}></App>
        )
    }
    

    return (
        <div>
            <h4>Login form</h4>
            <Formik 
                
                //*** Initial values that the form will take
                initialValues = {initialCredential}
                //***Yup validation schema 
                validationSchema = {loginSchema}
                //** onSubmit Event 
                
                onSubmit={(values) => {
                    new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));

                    //We save the data in the localstorage
                    sessionStorage.setItem('credentials', values);
                    SessiontStart(sessionStorage.setItem('credentials', values))
                    history.push('/Task');
                  
                }}
            
            >
                {/**We obtain props from Formik */}

                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit}) => (
                        <Form >
                                <label htmlFor="email">Email</label>
                                <Field id="email" type="email" name="email" placeholder="Example@email.com"/>
                                {/**Email errors */}
                                {
                                    errors.email && touched.email && 
                                    (                        
                                        <ErrorMessage component='div' name="email" />
                                    )
                                }
                                
                                <label htmlFor="password">Password</label>
                                <Field
                                id="password"
                                name="password"
                                placeholder="password"
                                type="password"
                                />
                                {
                                    errors.password && touched.password && 
                                    (
                                        <div>
                                        <ErrorMessage name="password" />
                                        </div>
                                    )
                                }
                                <button type="submit">login</button>
                            </Form>
                    )}
            </Formik>



        </div>
    );
}
LoginFormik.protoTypes = {
    DateVerification: PropTypes.func.isRequired
}

export default LoginFormik;
