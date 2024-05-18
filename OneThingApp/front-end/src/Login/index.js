import React from 'react';

const Login = () => {


    
    return (
        <>
            <Container>
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
            </Container>
        </>
    );
};

export default Login;