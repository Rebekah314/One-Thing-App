import React, { useState } from 'react';

const EntryView = () => {

//TO DO: get access to id in a better way. For now, pull from url
const entryId = window.location.href.split("/entries/")[1];

//retrieve entry by ID
const [entry, setEntry] = useState(null);

useEffect(() => {
    fetch()
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