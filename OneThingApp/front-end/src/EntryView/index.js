import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import fetchService from '../Services/fetchService';


const EntryView = () => {

    //TO DO: get access to id in a better way. For now, pull from url
    const entryId = window.location.href.split("/entries/")[1];

    //initialize entry with content = empty string
    const [entry, setEntry] = useState(null);

    const [jwt, setJwt] = useLocalState("", "jwt");

    //track entry fields so that they can be updated
    function updateEntryField(prop, value) {
        const newEntry = {...entry};
        newEntry[prop] = value;
        setEntry(newEntry);
        console.log("Entry object:");
        console.log(entry);
        console.log("Stringified Entry object:");
        console.log(JSON.stringify(entry));
    }

    function reusableFetch(url, requestMethod, jwt, requestBody) {
        const fetchData = {
            headers: {
                "Content-Type": "application/json"
            },
            method: requestMethod
        };
        if (jwt) {
            fetchData.headers.Authorization = `Bearer ${jwt}`;
        };
        if (requestBody) {
            fetchData.body = JSON.stringify(requestBody);
        };
        return fetch(url, fetchData).then(response => {
            if (response.status === 200) return response.json();
        }); 
    }

    function updateEntryRepo() {
        reusableFetch(`/entries/${entryId}`, "PUT", jwt, entry).then(entryData => {
            setEntry(entryData);
        });
    };

    //when "submit" button is clicked, update database with updates
    //This is not working yet... There is a binding error to work out.

    useEffect(() => {
        reusableFetch(`/entries/${entryId}`, "GET", jwt, null).then(entryData => {
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
                <h3>Content: 
                    <textarea id="content" rows="4" cols="50" 
                        onChange={(event) => updateEntryField("content", event.target.value)}
                        value={entry.content}
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