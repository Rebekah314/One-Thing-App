import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    //need a variable to store all the data, 
    //so that it can be displayed in the view below
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch("entries", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then((response) => {
            if (response.status === 200) return response.json();
    }).then((entriesData) => {
        setEntries(entriesData);
        //entriesData.map((entry) => console.log(entry.id));
    });
    }, []);
    

    function createEntry() {
        fetch("/entries", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
                
            },
            method: "POST",
        }).then(response => {
            if (response.status === 200) return response.json();

        }).then(entry => {
            window.location.href = `/entries/${entry.id}`
            //window.location.href = `/dashboard`
        });
    }

    // useEffect(() => {
    //     console.log(`entries: ${entries}`);
    //     entries.map((entry) => console.log(entry.id));
    // }, [entries]);

    return (
        <div style={{margin: "2em"}}>
            <h1>Welcome back!</h1>
            <h3>What's the ONE thing I can do today that will make everything else easier or unnecessary?</h3>


            <textarea id="oneThing" name="oneThing" rows="4" cols="50">
            </textarea>
            


            <button onClick={() => createEntry()}>Save Entry: my ONE thing today</button>
            <hr />
            <h3>Priority Prism</h3>
            
            {entries ? (
                entries.map((entry) => (
                    <div key={`entryId + ${entry.id}`}><Link to={`/entries/${entry.id}`}>Entry ID: {entry.id}</Link></div>
                ))
            ) : (
                <></>
            )}
            <hr />
            <p> JWT Value is {jwt}</p>
        </div>
    );
};

export default Dashboard;