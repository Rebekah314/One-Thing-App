import './App.css';
import { useEffect } from "react";
import { useLocalState } from './util/useLocalStorage';
import {  Routes, Route} from "react-router-dom";
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import EntryView from './EntryView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {



//TO DO for useState: const [getter, setter] = useState(initialValue);
const [jwt, setJwt] = useLocalState("", "jwt");

//empty dependency array (second input in useEffect) tells app to run this code once upon load
//non-empty dependency tells app to run if value changes
// useEffect(() => {
//   if (!jwt) {
//     const reqBody = {
//       "username": "Erik",
//       "password": "Clinton"
//     }
    
//     //Communicate from front end to back end with fetch
//     //the 'login' here is from the AuthenticationController on the backend
//     fetch('login', {
//       "headers": {
//     "Content-Type": "application/json"
//       },
//       "method": "post",
//       "body": JSON.stringify(reqBody)
//     })
//     .then(response => Promise.all([response.json(), response.headers]))
//     .then(([body, headers]) => {
      
//       //setJwt is an asynchronous operation
//       setJwt(body.token);

//       //in codercampus video, he gets token from headers.get("authorization"),
//       //but he is using a 2yo version of spring security
      
//       //console.log(headers);
      
//     });
//   }
// }, [])

// useEffect(() => {
//   console.log(`jwt =  ${jwt}`); //example of template literal
// }, [jwt])


//Routes is the tag that holds all of the different routes
//This works because main index.js has App component inside of <BrowserRouter" tags
//A PrivateRoute means you have to be logged in to see it

  return (
      <Routes>
        <Route 
          path="/dashboard" 
          element={ 
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />

        <Route
        path="/entries/:id"
          element={
            <PrivateRoute>
              <EntryView/>
            </PrivateRoute>
          }
        />

        <Route path="/login" element={ <Login />} />

        <Route path="/register" element={ <Register />} />

        <Route path="/" element={ <Homepage />} />

      </Routes>
  );
}

export default App;
