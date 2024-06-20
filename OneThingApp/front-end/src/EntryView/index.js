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
    const [tempEntry, setTempEntry] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [date, setDate] = useState(new Date());
    const [entryUpdated, setEntryUpdated] = useState(false);
    const [statusChecked, setStatusChecked] = useState(false);

    //this will run once upon page load, and again any time the value in entryUpdated changes
    useEffect(() => {
        reusableFetch(`/entries/${entryId}`, "GET", jwt).then(entryData => {
            setEntry(entryData);
            setTempEntry(entryData);
        });
    }, [entryUpdated]); 

    //track entry fields so that they can be updated
    function updateEntryField(prop, value) {
        const newEntry = {...tempEntry};
        newEntry[prop] = value;
        console.log(prop + ": " + value);
        setTempEntry(newEntry);
    }

    //when "submit" button is clicked, update database with updates
    function updateEntryRepo() {
        reusableFetch(`/entries/${entryId}`, "POST", jwt, tempEntry).then(entryData => {
            setEntry(entryData);
            setEntryUpdated(true);
        });
        alert("database updated");
    };

    //when "delete" button clicked, delete entry from repo
    function deleteEntry() {
        reusableFetch(`/entries/${entryId}`, "DELETE", jwt).then(() => 
        window.location.href = "/dashboard");
    }

 
    
    //TO DO: entry fields should only be able to be updated by the author, and maybe the accountability friend

    return (
        <>
            <div >
                <Button className="float-end" size="lg" variant="secondary"  href={"/dashboard"}>Return to Dashboard</Button>
            </div>
            <h1>What's the ONE thing YOU can do today that will make everything else easier or unnecessary?</h1>
            <br />
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
                <br />
                <h3>Date: {entry.date}</h3>
                <p>Update date: 
                    <Form.Control
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    value={tempEntry.date ? tempEntry.date : "Not listed"}
                    onChange={(event) => {
                        setDate("date", event.target.value);
                        updateEntryField("date", event.target.value)}}
                    />
                </p>
                <br />
                <h3>Content: 
                    <textarea id="content" rows="2" cols="40" 
                        onChange={(event) => updateEntryField("content", event.target.value)}
                        value={tempEntry.content ? tempEntry.content : "Type your ONE thing today"}
                    ></textarea>
                </h3>
                <br />
                <h3>Author: {entry.author.username}</h3>
                </form>
                <br />
                <div className="d-flex gap-2">
                <Button 
                size="lg"
                    type="submit"
                    onClick={() => {
                        updateEntryRepo()}}
                        
                >Update Entry</Button>

                <Button 
                size="lg"
                    type="submit"
                    variant="danger"
                    onClick={() => {

                        deleteEntry()}}
                        
                >Delete Entry</Button>
                </div>

            </Container>
            ) : (
            <></>
            )}
        </>
    );
};

export default EntryView;