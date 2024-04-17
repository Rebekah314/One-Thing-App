import logo from './logo.svg';
import './App.css';

function App() {

console.log("Hello!");

//**TO DO** figure out why code is running twice
//try "use effect" hook

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
  console.log(body.token);
  console.log(headers);
});



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
