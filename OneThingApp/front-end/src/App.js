import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {



//TO DO for useState: const [getter, setter] = useState(initialValue);
const [jwt, setJwt] = useState("");

//empty dependency array (second input in useEffect) tells app to run this code once upon load
//non-empty dependency tells app to run if value changes
useEffect(() => {
  console.log(`jwt =  ${jwt}`); //example of template literal
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
    
    //console.log(headers);
  });


}, [jwt])


  return (
    <div className="App">
      <header className="App-header">
      <h1>Hello World!!!  </h1>
      <h2>JWT value is {jwt}</h2>


      </header>
    </div>
  );
}

export default App;
