import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {



//TO DO for useState: const [getter, setter] = useState(initialValue);
const [jwt, setJwt] = useState("");

//empty dependency array (second input in useEffect) tells app to run this code once upon load
useEffect(() => {
  console.log("Hello!");
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
    setJwt(body.token);
    //console.log("jwt = " + jwt);
    //console.log(headers);
  });


}, [])


  return (
    <div className="App">
      <header className="App-header">
      <h1>Hello World!!!  </h1>
      <h2>JWT value is {jwt}</h2>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
