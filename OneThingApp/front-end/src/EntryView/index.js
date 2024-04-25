import React from 'react';

const EntryView = () => {

//TODO get access to id in a better way. For now, pull from url
const entryId = window.location.href.split("/entries/")[1];

    return (
        <div>
            <h1>Entry {entryId}</h1>
        </div>
    );
};

export default EntryView;