import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { dLogin } from '../Utilits';

function PrivateRoute({component: Component, ...rest}) {
    return (
        
            <Route {...rest} render={props => (
                dLogin() ?
                <Component {...props} />
                :
                <Redirect to="/login_signup" />
            )
            }
    

            />
        
    );
}

export default PrivateRoute;