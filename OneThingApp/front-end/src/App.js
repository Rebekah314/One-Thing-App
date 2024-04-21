import './App.css';
import { useEffect } from "react";
import { useLocalState } from './util/useLocalStorage';
import {  Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from './Dashboard';
import Homepage from './Homepage';

function App() {



//TO DO for useState: const [getter, setter] = useState(initialValue);
const [jwt, setJwt] = useLocalState("", "jwt");

//empty dependency array (second input in useEffect) tells app to run this code once upon load
//non-empty dependency tells app to run if value changes
useEffect(() => {
  if (!jwt) {
    const reqBody = {
      "username": "Erik",
      "password": "Clinton"
    }
    
    //Communicate from front end to back end with fetch
    fetch('login', {
      "headers": {
    "Content-Type": "application/json"
      },
      "method": "post",
      "body": JSON.stringify(reqBody)
    })
    .then(response => Promise.all([response.json(), response.headers]))
    .then(([body, headers]) => {
      
      //setJwt is an asynchronous operation
      setJwt(body.token);

      //in codercampus video, he gets token from headers.get("authorization"),
      //but he is using a 2yo version of spring security
      
      //console.log(headers);
    });
  }
}, [])

useEffect(() => {
  console.log(`jwt =  ${jwt}`); //example of template literal
}, [jwt])


//Routes is the tag that holds all of the different routes
  return (
    

      <Routes>
        <Route path="/dashboard" element={ <Dashboard/> }/>
        <Route path="/" element={ <Homepage />} />
      </Routes>


      
  );
}

export default App;
