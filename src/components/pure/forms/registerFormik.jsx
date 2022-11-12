import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
//modals
import { User } from '../../../models/user.class';
import { ROLES } from '../../../models/roles.enum';

const RegisterFormik = () => {
    let user = new User();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirm: '',//confim password
        role: ROLES.USER
    }

    const registerSchema= yup.object().shape(
        {
            username: yup.string()
            .min(6, 'Username too short')
            .max(12, 'username too long')
            .required('username is required'),
            email: yup.string()
                .email('Error email format')
                .required('Email is required'),
            role: yup.string().oneOf([ROLES.USER, ROLES.ADMIN], 'You moys select a Role: User/ Admin') 
                    .required('Role is required'),
            password: yup.string()
                        .min(8, 'Password too short')
                        .required('password is required'),
            confirm: yup.string()
                    .when("password", { 
                        is: value => (value && value.length > 0 ? true : false),
                        then: yup.string().oneOf(
                            [yup.ref("password")], 
                            "password must match!"
                        )
                    }).required('You must confim the password')
        }
    )
    const submit = (values) =>{
        alert('Register user')
    }
    return (
        
        <div>
            <h4>Register Formik</h4>
                <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                  
                }}
                
                >
                {({ values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    }) =>(
                        <Form>
                        <label htmlFor="username">Username</label>
                                <Field id="username" type="text" name="username" placeholder="Your Username" />
                                {/**Username errors */}
                                {
                                    errors.username && touched.username && 
                                    (                        
                                        <ErrorMessage component='div' name="username" />
                                    )
                                }
                                <label htmlFor="email">Email</label>
                                <Field id="email" type="email" name="email" placeholder="Example@email.com" />
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
                                {/**Password errors */}
                                {
                                    errors.password && touched.password && 
                                    (
                                        <ErrorMessage component='div' name="password" />
                                    )
                                }
                                <label htmlFor="confirm">Confirm Password</label>
                                <Field
                                id="confim"
                                name="confirm"
                                placeholder="Confirm password"
                                type="password"
                                />
                                {/*confirm password errors */}
                                {
                                    errors.confirm && touched.confirm && 
                                    (
                                        <ErrorMessage component='div' name="confirm" />
                                    )
                                }
                                
                                <button type='submit'>Register Account</button>
                                {isSubmitting ? (<p>Sending your credential...</p>): null}

                        </Form>
                    )}
                </Formik>
            
        </div>
    );
}

export default RegisterFormik;
