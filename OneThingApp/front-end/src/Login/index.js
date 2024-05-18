import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';


const Login = () => {

    const [jwt, setJwt] = useLocalState("", "jwt");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function sendLoginRequest() {

        
        
            
              const reqBody = {
                "username": username,
                "password": password
              }
              
              //Communicate from front end to back end with fetch
              //the 'login' here is from the AuthenticationController on the backend
              fetch('login', {
                "headers": {
              "Content-Type": "application/json"
                },
                "method": "post",
                "body": JSON.stringify(reqBody)
              })
              .then(response => {
                if (response.status === 200) {
                    return Promise.all([response.json(), response.headers])
                }
                else {
                    return Promise.reject("Invalid Login Attempt")
                }
                
              })
              .then(([body, headers]) => {
                
                setJwt(body.token);
                window.location.href = "dashboard";
              }).catch((message) => alert(message));
          }
    


    return (
        <>
            
                <div>
                    <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(event)=> setUsername(event.target.value)}
 
                        />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(event)=> setPassword(event.target.value)}

                        />
                </div>
                <div>
                    <button id="submit" type="button" onClick={() => sendLoginRequest()}>
                        Log In
                    </button>
                </div>

            
        </>
    );
};

export default Login;