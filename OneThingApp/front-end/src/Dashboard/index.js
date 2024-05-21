import { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { Link } from 'react-router-dom';
import { reusableFetch } from '../Services/reusableFetch';
import Card from 'react-bootstrap/Card';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");

    //need a variable to store all the data, 
    //so that it can be displayed in the view below
    const [entries, setEntries] = useState([]);

    useEffect(() => {

        reusableFetch("entries", "GET", jwt).then((entriesData) => {
            setEntries(entriesData);
        });
    }, []);
    
    function createEntry() {
        reusableFetch("/entries", "POST", jwt).then(entry => {
            window.location.href = `/entries/${entry.id}`
        });
    }

    return (
        <div style={{margin: "2em"}}>
            <h1>Welcome back!</h1>
            <h3>What's the ONE thing YOU can do today that will make everything else easier or unnecessary?</h3>

            <textarea id="oneThing" name="oneThing" rows="2" cols="40">
            </textarea>
            
            <button onClick={() => createEntry()}>Save Entry: my ONE thing today</button>
            
            <hr />
            
            <h3>Priority Prism</h3>
            {entries ? (
                entries.map((entry) => (
                    <div key={`entryId + ${entry.id}`}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Entry #{entry.id}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    {entry.content}
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                ))
            ) : (
                <></>
            )} 

        </div>
    );
};

export default Dashboard;