import { NavLink, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';


function ListAppointment(props) { 

    const history = useHistory();
    let [data, setData] = useState([]);

    const dData = () => {
        let localData = JSON.parse(localStorage.getItem("BookAppointment"));

        setData(localData);
    }

    useEffect(() => {
        dData();

    }, []);

    const handleDelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("BookAppointment"));

        let fData = localData.filter((l) => l.id !== id);

        localStorage.setItem("BookAppointment",JSON.stringify(fData));

        console.log(localData);

        dData();
    }

    const  data_app = (id) => {

        history.push("/BookAppointment", {id : id});
        console.log(id);
    } 

    return (
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
                        {
                            data.map((d, i) => {
                                return (
                                    <Card key={i}
                                    body
                                    color="secondary"
                                    inverse
                                    >
                                        <CardBody>
                                            <CardTitle tag="h5">
                                                {d.name}
                                            </CardTitle>
                                            <CardSubtitle
                                                className="mb-2"
                                                tag="h6"
                                            >
                                                {d.email}
                                            </CardSubtitle>
                                            <CardText>
                                              {d.date}
                                            </CardText>
                                            <Button onClick={() => data_app(d.id)}>Edit</Button>
                                            <Button onClick={() => handleDelete(d.id)}>Delete</Button>
                                        </CardBody>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ListAppointment;