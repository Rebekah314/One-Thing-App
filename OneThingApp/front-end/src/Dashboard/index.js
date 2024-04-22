import React from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    return (
        <div >
            <h1>Hello, Dashboard!</h1>
            <p>JWT Value is {jwt}</p>
        </div>
    );
};

export default Dashboard;