import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import { reusableFetch } from '../Services/reusableFetch';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const EntryView = () => {

    //TO DO: get access to id in a better way. For now, pull from url
    const entryId = window.location.href.split("/entries/")[1];

    //initialize entry with content = empty string
    const [entry, setEntry] = useState(null);

    const [jwt, setJwt] = useLocalState("", "jwt");

    const [date, setDate] = useState(new Date());


    //track entry fields so that they can be updated
    function updateEntryField(prop, value) {
        const newEntry = {...entry};
        newEntry[prop] = value;
        console.log(prop + ": " + value);
        setEntry(newEntry);
    }

    //when "submit" button is clicked, update database with updates
    function updateEntryRepo() {
        console.log("BEFORE");
        console.log(entry);
        console.log(entry.author);
        reusableFetch(`/entries/${entryId}`, "POST", jwt, entry).then(entryData => {
            setEntry(entryData);
        });
        
    };


    useEffect(() => {
        reusableFetch(`/entries/${entryId}`, "GET", jwt).then(entryData => {
            setEntry(entryData);
        });
    }, []);
    

    //TO DO: entry fields should only be able to be updated 
    //by the author, and maybe the accountability friend

    return (
        <Container>
            <Button variant="secondary" className="pull-right" href={"/dashboard"}>Return to Dashboard</Button>
            <h1>Entry {entryId}</h1>
            {entry ? (
            <>
                <h2>Current Status: {entry.status}</h2>
                <div key="radio_IP" className="mb-3">
                    <Form.Check 
                        type={'radio'}
                        id={"status.IN_PROGRESS"}
                        label="In Progress"
                        name="updateStatus"
                        checked={entry.status === "IN_PROGRESS"}
                        onChange={() => updateEntryField("status", "IN_PROGRESS")} />
                    <Form.Check 
                        type={'radio'}
                        id={"status.COMPLETED"}
                        label="Completed"
                        name="updateStatus"
                        checked={entry.status === "COMPLETED"}
                        onChange={() => updateEntryField("status", "COMPLETED")}
                    />
                    <Form.Check 
                        type={'radio'}
                        id={"status.PIVOTED"}
                        label="Pivoted"
                        name="updateStatus"
                        checked={entry.status === "PIVOTED"}
                        onChange={() => updateEntryField("status", "PIVOTED")}
                    />
                </div>
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
                
                <Button onClick={() => updateEntryRepo()}
                    href={`/entries/${entryId}`}
                >Update Entry</Button>
            </>
            ) : (
            <></>
            )}
        </Container>
    );
};

export default EntryView;