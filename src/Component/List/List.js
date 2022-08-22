import React from 'react';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

function List({ Data, getId }) {
    return (
        <div>
            {
            Data.map((o, i) => {
                return (
                    <Card key={i}>

                        <CardBody>
                            
                            <CardTitle tag="h5">                         
                            {o.name}
                            </CardTitle>
                            
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {o.price}
                            </CardSubtitle>

                            <CardText>
                            {o.quantity}
                            </CardText>

                            <button onClick={() => getId(o.id)}>click</button>

                        </CardBody>
    
                    </Card>
                    
                )
            })
        }
        </div>
    );
}

export default List;