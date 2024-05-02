import { useEffect, useState } from "react";

//following this video from coderCampus: 
//https://www.youtube.com/watch?v=aIr288-3AFE&list=PL2OrQJM8zmZ2-O_rM2Ju9zYMbY8Ta-8I4&index=12

//which is following this page:
//https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/

function useLocalState (defaultValue, key) {

    //local storage stores strings
    //if object needs to be stored (e.g., json), must stringify first

    const [value, setValue] = useState(() => {
        const localStorageValue = window.localStorage.getItem(key);

        return localStorageValue !== null
            ? JSON.parse(localStorageValue)
            : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export {useLocalState};