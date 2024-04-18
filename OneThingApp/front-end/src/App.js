import './App.css';
import { useEffect, useState } from "react";

function App() {



//TO DO for useState: const [getter, setter] = useState(initialValue);
const [jwt, setJwt] = useState("");

//empty dependency array (second input in useEffect) tells app to run this code once upon load
//non-empty dependency tells app to run if value changes
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
    
    //setJwt is an asynchronous operation
    setJwt(body.token);

    //in codercampus video, he gets token from headers.get("authorization"),
    //but he is using a 2yo version of spring security
    
    //console.log(headers);
  });
}, [])

useEffect(() => {
  console.log(`jwt =  ${jwt}`); //example of template literal
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
