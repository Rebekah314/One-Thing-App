import React from 'react';

const EntryView = () => {

//TO DO: get access to id in a better way. For now, pull from url
const entryId = window.location.href.split("/entries/")[1];

//TO DO: entry fields should only be able to be updated 
//by the author, and maybe the accountability friend

    return (
        <div>
            <h1>Entry {entryId}</h1>

        </div>
    );
};

export default EntryView;