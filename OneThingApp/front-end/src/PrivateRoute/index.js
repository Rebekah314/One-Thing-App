import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';
import { reusableFetch } from '../Services/reusableFetch';

//If the user is authenticated, we want to render the "children".
//If the user is not authentication, we want to redirect to the Login page.

//This needs to check if the jwt is expired, not just if it's empty
//JwtService method 'isValid' checks if username matches database and if token is expired

const PrivateRoute = ( { children }) => {

    //check if there is a stored jwt value
    const [jwt, setJwt] = useLocalState("", "jwt");

    if (jwt) {
        //don't pass in jwt because we don't want it to reject it automatically
        reusableFetch(`/validate?token=${jwt}`, "GET", null).then((isValid) => {
            return isValid ? children : <Navigate to="/login" />;
            
            
        });

    
    }

    

    return <Navigate to="/login" />;
};

export default PrivateRoute;