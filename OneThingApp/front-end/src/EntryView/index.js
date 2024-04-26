import React, { useEffect, useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';

const EntryView = () => {

//TO DO: get access to id in a better way. For now, pull from url
const entryId = window.location.href.split("/entries/")[1];

//retrieve entry by ID
const [entry, setEntry] = useState(null);
const [jwt, setJwt] = useLocalState("", "jwt");

useEffect(() => {
    fetch(`/entry/${entryId}`, {
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

            </>
            ) : (
            <></>
            )}
            <h2>Status: {entry.status}</h2>

        </div>
    );
};

export default EntryView;