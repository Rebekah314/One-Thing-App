import React from 'react';
import { useLocalState } from '../util/useLocalStorage';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    function createEntry() {
        fetch("/entries", {
            headers: {
                "content-type": "application/json",
                
            }
        })
    }

    return (
        <div style={{margin: "2em"}}>
            <h1>Welcome back!</h1>
            <h3>What's the ONE thing I can do today that will make everythign else easier or unnecessary?</h3>


            <textarea id="oneThing" name="oneThing" rows="4" cols="50">
            </textarea>
            

            <button onClick={() => createEntry()}>Save Entry: my ONE thing today</button>
            <hr />
            <p> JWT Value is {jwt}</p>
        </div>
    );
};

export default Dashboard;