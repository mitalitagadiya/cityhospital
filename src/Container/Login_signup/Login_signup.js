import React, { useState } from 'react';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { signUpAction, signInAction } from '../../redux/action/auth.action';
import { useDispatch } from 'react-redux';

function Login_signup(props) {
    
    const [user, setUser] = useState("login");
    const [reset, setReset] = useState(false);

    
    let schemaObj, initVal;

    if(user === "login"){
        schemaObj ={
            email: yup.string().required("please enter email id.").email("please enter valid email id."),
            password: yup.string().required("please enter password."),
        }
        initVal ={
            email: '',
            password: '',
        }
    } else if (user === "Signup"){
        schemaObj ={
            name: yup.string().required("please enter your name."),
            email: yup.string().required("please enter email id.").email("please enter valid email id."),
            password: yup.string().required("please enter password.")
        }
        initVal ={
            name: '',
            email: '',
            password: ''
        }
    } else if (reset === "true"){
        schemaObj ={
            email: yup.string().required("please enter email id.").email("please enter vaild email id.")
        }
        initVal ={
            email: ''
        }
    }

    let schema = yup.object().shape(schemaObj);

    const dispatch = useDispatch();

    const handleData = (values) => {
        // let LocalData = JSON.parse(localStorage.getItem("user"));

        // if (LocalData === null) {
        //     localStorage.setItem("user", JSON.stringify([values]));
        // } else {
        //     LocalData.push(values);
        //     localStorage.setItem("user", JSON.stringify(LocalData));
        // }

        // console.log(values);

        dispatch(signUpAction(values));
    }

    const handleLogin = (values) => {
        dispatch(signInAction(values));
    }


        const formik = useFormik({
          initialValues: initVal,
          validationSchema : schema,
          onSubmit: values => {
            if(user === "login"){
                handleLogin(values);
            } else {
                handleData(values);  
            }
          },
        });

        const {handleChange, handleSubmit, handleBlur, errors, touched} = formik;

    return (
        <center>
            <section>
                <div className="container">
                    <div className="section-title">
                        {
                        reset === "true" ?
                            <h2>Forgot password</h2> :
                            user === "login" ?
                                <h2>login</h2> :
                                <h2>Signup</h2>
                        }
                    </div>
                    <Formik values={formik}>
                    <Form onSubmit={handleSubmit} method="post" role="form" className="php-email-form">
                        {
                            reset === "true" ?
                                 null :
                            user === "login" ?
                                null
                                :
                                <div className="col-md-4 form-group">
                                    <input onChange={handleChange} onBlur={handleBlur} type="text" name="name" className="form-control" id="name" placeholder="Your Name" />
                                    <div className="validate"/>
                                    <p className='text-color'>
                                        {errors.name && touched.name ? errors.name: ''}
                                    </p>
                                </div>
                        }
                        <div className="col-md-4 form-group mt-3 mt-md-0">
                            <input onChange={handleChange} onBlur={handleBlur} type="email" className="form-control" name="email" id="email" placeholder="Your Email" />
                            <div className="validate"/>
                            <p className='text-color'>
                                {errors.email && touched.email ? errors.email: ''}
                            </p>
                        </div>
                        {
                            reset === "true"?
                                null :
                                <div className="col-md-4 form-group mt-3 mt-md-0">
                                    <input onChange={handleChange} onBlur={handleBlur} type="password" className="form-control" name="password" id="password" placeholder="Your password" />
                                    <br></br>
                                    <div className="validate"/>
                                    <p className='text-color'>
                                        {errors.password && touched.password ? errors.password: ''}
                                    </p>
                                </div>
                        }
                        {
                            reset === "true"?
                                <div className="text-center"><button className='s-btn appointment-btn scrollto' type="submit">Submit</button></div>
                                :
                                user === "login" ?
                                    <div className="text-center"><button className='s-btn appointment-btn scrollto' type="submit">Login</button></div>
                                    :
                                    <div className="text-center"><button className='s-btn appointment-btn scrollto' type="submit">Signup</button></div>
                        }
                        {
                            user === "login" ?
                                <div className="text-center">
                                    <br>
                                    </br>
                                    <span>Already have an Account ? <a className="signup" onSubmit={handleSubmit} onClick={() => {setReset('false') ; setUser("Signup")}} type="submit">Signup</a></span>
                                </div>
                                :
                                <div className="text-center">
                                    <br>
                                    </br>
                                    <span>Creat a new Account ? </span> <a className="Login" onSubmit={handleSubmit} onClick={() => {setReset('false') ; setUser("Login")}} type="submit">Login</a>
                                </div>
                        }
                        <br></br>
                         <div className="text-center"><a type="submit" className="submit" onSubmit={handleSubmit} onClick={() => {setReset('true') ; setUser("submit")}}>Forgot password</a></div>
                    </Form>
                    </Formik>
                </div>
            </section>
        </center>

    );
}

export default Login_signup;