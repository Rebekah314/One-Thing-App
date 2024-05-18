import React from 'react';


const Login = () => {

    function sendLoginRequest() {
        console.log("I'm logging in");
    }


    return (
        <>
            
                <div>
                    <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
 
                        />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"

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