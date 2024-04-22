import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';

//If the user is authenticated, we want to render the "children".
//If the user is not authentication, we want to redirect to the Login page.

const PrivateRoute = ( { children }) => {

    //check if there is a stored jwt value
    const [jwt, setJwt] = useLocalState("", "jwt");

    return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;