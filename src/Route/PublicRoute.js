import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { dLogin } from '../Utilits';

function PublicRoute({ component: Component, restricted = false }, ...rest) {
    return (
        <Route {...rest} render={props => (

            dLogin() && restricted ?
                <Redirect to="/" />
                :
                <Component />
                )
            }
   

        />
    );
}

export default PublicRoute;