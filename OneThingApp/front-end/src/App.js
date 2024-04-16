import logo from './logo.svg';
import './App.css';

function App() {

console.log("Hello!");

//Communicate from front end to back end with fetch
fetch('http://localhost:8080/login', {
  "headers": {
"Content-Type": "application/json"
  },
  "method": "post"
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
