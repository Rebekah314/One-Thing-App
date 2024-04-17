import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {

console.log("Hello!");

//TO DO for useState: const [getter, setter] = useState(initialValue);
const [jwt, setJwt] = useState("");

//empty dependency array (second input in useEffect) tells app to run this code once upon load
useEffect(() => {
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
    const jwt = body.token;
    console.log("jwt = " + jwt);
    //console.log(headers);
  });


}, [])


  return (
    <div className="App">
      <header className="App-header">
      <h1>Hello World!!!  </h1>
      <h2>Testing h2</h2>
      <h3>Testing h3</h3>
      <h4>Testing h4</h4>
      <h5>Testing h5</h5>
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
