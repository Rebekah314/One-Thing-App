import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { reusableFetch } from '../Services/reusableFetch';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const EntryView = () => {

    ///TO DO: get access to id in a better way. For now, pull from url
    const entryId = window.location.href.split("/entries/")[1];

    const [entry, setEntry] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [date, setDate] = useState(new Date());
    const [entryUpdated, setEntryUpdated] = useState(false);
    const [statusChecked, setStatusChecked] = useState(null);

    //track entry fields so that they can be updated
    function updateEntryField(prop, value) {
        const newEntry = {...entry};
        newEntry[prop] = value;
        console.log(prop + ": " + value);
        setEntry(newEntry);
    }

    //check entry status before updating database
    function checkStatus() {
        const checkEntry = {...entry};
        console.log(typeof checkEntry["status"]);
        if (checkEntry["status"] === "In Progress") {
            checkEntry["status"] = "IN_PROGRESS";
            console.log(checkEntry["status"]);
        } else if (checkEntry["status"] === "Completed") {
            checkEntry["status"] = "COMPLETED";
            console.log(checkEntry["status"]);
        } else if (checkEntry["status"] === "Pivoted") {
            checkEntry["status"] = "PIVOTED";
            console.log(checkEntry["status"]);
        }
        console.log("checkEntry:", checkEntry);
        setEntry(checkEntry);
        console.log("entry:", entry);
    }

    //when "submit" button is clicked, update database with updates
    //Fetch call tested with Postman, and seems to work every time
    function updateEntryRepo() {
        checkStatus();
        
        reusableFetch(`/entries/${entryId}`, "POST", jwt, entry).then(entryData => {
            setEntry(entryData);
            setEntryUpdated(true);
        });
    };

    //this will run once upon page load, and again any time the value in entryUpdated changes
    useEffect(() => {
        reusableFetch(`/entries/${entryId}`, "GET", jwt).then(entryData => {
            setEntry(entryData);
        });
    }, [entryUpdated]);  
    
    //TO DO: entry fields should only be able to be updated by the author, and maybe the accountability friend

    return (
        <>
            <div >
                <Button className="float-end" size="lg" variant="secondary"  href={"/dashboard"}>Return to Dashboard</Button>
            </div>
            <h1>Entry {entryId}</h1>
            {entry ? (
            <Container>
                <form>
                <h2>Current Status: {entry.status}</h2>
                <Form.Select id="statusUpdate" aria-label="updateStatus" onChange={(event) => updateEntryField("status", event.target.value)}>
                    <option value="" >Update Status</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PIVOTED">Pivoted</option>
                </Form.Select>
                
                <h3>Date: {entry.date}</h3>
                <p>Update date: 
                    <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={entry.date ? entry.date : "Not listed"}
                    onChange={(event) => {
                        setDate("date", event.target.value);
                        updateEntryField("date", event.target.value)}}
                    />
              </p>
                <h3>Content: 
                    <textarea id="content" rows="2" cols="40" 
                        onChange={(event) => updateEntryField("content", event.target.value)}
                        value={entry.content ? entry.content : "Type your ONE thing today"}
                    ></textarea>
                </h3>
                <h3>Author: {entry.author.username}</h3>
                </form>
                
                <Button 
                    type="submit"
                    onClick={() => {
                        updateEntryRepo()}}
                    //href={`/entries/${entryId}`}
                >Update Entry</Button>
            </Container>
            ) : (
            <></>
            )}
        </>
    );
};

export default EntryView;