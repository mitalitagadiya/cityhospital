import { Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { NavLink, useHistory } from 'react-router-dom';

function Appointment(props) {

    const history = useHistory();
    const [updata, setUpdata] = useState(false)



    useEffect(() => 
    {
        let localData = JSON.parse(localStorage.getItem("BookAppointment"));

            if(props.location.state && localData !== null){

            let localData = JSON.parse(localStorage.getItem("BookAppointment"));

            let fdata = localData.filter((l) => l.id === props.location.state.id);
    
            formik.setValues(fdata[0]);
            // console.log(fdata[0]);

            setUpdata(true);
    
        } 
    },
    []);


    let schema = yup.object().shape({
        name: yup.string().required("please enter name."),
        email: yup.string().email("please enter vaild email id.").required("please enter email id."),
        phone: yup.string().required("please enter your phone number"),
        date: yup.string().required("please enter any Date."),
        department: yup.string().required("please select any Department."),
        message: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            date: '',
            department: '',
            message: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if(updata){
                handleupdatedata(values)
            } else {
            handleInsert(values);
            }
        },
    });

    const { handleChange, handleBlur, handleSubmit, errors, touched, values } = formik;

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("BookAppointment"));

        let id = Math.floor(Math.random() * 10000);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("BookAppointment", JSON.stringify([data]));
        }
        else {
            localData.push(data);
            localStorage.setItem("BookAppointment", JSON.stringify(localData));
        }

        history.push("/ListAppointment");

        console.log([data]);
    }

    const handleupdatedata= (values) => {
        let localData = JSON.parse(localStorage.getItem("BookAppointment"));

           let uData =  localData.map((l) => {
                if(l.id === values.id){
                    return values;
                } else {
                    return l;
                }
            });

            localStorage.setItem("BookAppointment", JSON.stringify(uData));

            history.replace();

            formik.resetForm();

            setUpdata(false);

            history.push("/ListAppointment");
    }

    return (
        <div>
            <main>
                <section id="appointment" className="appointment">
                    <div className="container">
                        <div className="section-title">
                            <h2>Appointment</h2>
                        </div>
                        <div className='row text-center mb-4'>
                            <div className='col-6'>
                                <NavLink exact to={"/BookAppointment"}>Book an Appointment</NavLink>
                            </div>
                            <div className='col-6'>
                                <NavLink exact to={"/ListAppointment"}>List an Appointment</NavLink>
                            </div>
                        </div>
                        <Formik values={formik}>
                            <Form onSubmit={handleSubmit} className="php-email-form">
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" name="name" className="form-control" id="name" placeholder="Your Name"  />
                                        <p className='text-color'>
                                            {errors.name && touched.name ? errors.name : ''}
                                        </p>
                                    </div>
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                        <p className='text-color'>
                                            {errors.email && touched.email ? errors.email : ''}
                                        </p>
                                    </div>
                                    <div className="col-md-4 form-group mt-3 mt-md-0">
                                        <input value={values.phone} onChange={handleChange} onBlur={handleBlur} type="tel" className="form-control" name="phone" id="phone" placeholder="Your Phone" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <p className='text-color'>
                                            {errors.phone && touched.phone ? errors.phone : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group mt-3">
                                        <input value={values.date} onChange={handleChange} onBlur={handleBlur} type="date" name="date" className="form-control datepicker" id="date" placeholder="Appointment Date" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <p className='text-color'>
                                            {errors.date && touched.date ? errors.date : ''}
                                        </p>
                                    </div>
                                    <div className="col-md-4 form-group mt-3">
                                        <select value={values.department} onChange={handleChange} onBlur={handleBlur} name="department" id="department" className="form-select">
                                            <option value>Select Department</option>
                                            <option value="Department 1">Department 1</option>
                                            <option value="Department 2">Department 2</option>
                                            <option value="Department 3">Department 3</option>
                                        </select>
                                        <p className='text-color'>
                                            {errors.department && touched.department ? errors.department : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <textarea value={values.message} onChange={handleChange} onBlur={handleBlur} className="form-control" name="message" rows={5} placeholder="Message (Optional)" defaultValue={""} />
                                </div>
                                <div className="mb-3">
                                    <div className="loading">Loading</div>
                                    <div className="error-message" />
                                    <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
                                </div>
                                <div className="text-center">
                                    
                                    {
                                        updata ? 
                                        <button type="submit">updata an Appointment</button>
                                        :
                                        <button type="submit">Make an Appointment</button>
                                    }
                                   
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </section>
            </main>

        </div>
    );
}

export default Appointment;