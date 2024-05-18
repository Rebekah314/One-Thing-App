import React, { useState } from 'react';
import { reusableFetch } from '../Services/reusableFetch';
import { useLocalState } from '../util/useLocalStorage';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    const loginBody = {
        "username": {username},
        "password": {password}
    }

    function sendLoginRequest() {
        reusableFetch("/login", "POST", null, loginBody).then((response) => {
            setJwt(response);
            return window.location.href = "/dashboard";
        });
        
    }

    return (
        <>
            
                <div>
                    <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} 
                        />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                        />
                </div>
                <div>
                    <button 
                        id="submit" 
                        tyep="button"
                        onClick={() => sendLoginRequest()}>

                    </button>
                </div>
            
        </>
    );
};

export default Login;