import React from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    return (
        <div >
            <h1>Welcome back!</h1>
            <h3>What's the ONE thing I can do today that will make everythign else easier or unnecessary?</h3>


            <textarea id="oneThing" name="oneThing" rows="4" cols="50">
            </textarea>
            

            <button>Save Entry: my ONE thing today</button>
            <hr />
            <p> JWT Value is {jwt}</p>
        </div>
    );
};

export default Dashboard;