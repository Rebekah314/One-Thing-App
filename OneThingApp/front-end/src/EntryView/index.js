import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const EntryView = () => {

//TO DO: get access to id in a better way. For now, pull from url
const entryId = window.location.href.split("/entries/")[1];

//retrieve entry by ID
const [entry, setEntry] = useState(null);
const [jwt, setJwt] = useLocalState("", "jwt");

//track entry fields so that they can be updated
function updateEntryField(prop, value) {
    entry[prop] = value;
    console.log(entry);
    console.log(JSON.stringify(entry));
}

function updateEntryRepo() {
    fetch(`/entries/${entryId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
            
        },
        method: "PUT",
        body: JSON.stringify(entry)
    }).then(response => {
        if (response.status === 200) return response.json();
    }).then(entryData => {
        setEntry(entryData);
    });
};


//when "submit" button is clicked, update database with updates
//This is not working yet... There is a binding error to work out.

useEffect(() => {
    fetch(`/entries/${entryId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`,
            
        },
        method: "GET",
    }).then(response => {
        if (response.status === 200) return response.json();

    }).then(entryData => {
        setEntry(entryData);
    });
}, []);

//TO DO: entry fields should only be able to be updated 
//by the author, and maybe the accountability friend

    return (
        <div>
            <h1>Entry {entryId}</h1>
            {entry ? (
            <>
                <h2>Status: {entry.status}</h2>
                <h3>Date: {entry.date}</h3>
                <h3>Content: {entry.content}
                    <textarea id="content" rows="4" cols="50" 
                        onChange={(event) => updateEntryField("content", event.target.value)}
                    ></textarea>
                </h3>
                <h3>Author: {entry.author.username}</h3>
                
                <button onClick={() => updateEntryRepo()}>Update Entry</button>

            </>
            ) : (
            <></>
            )}
            
            

        </div>
    );
};

export default EntryView;