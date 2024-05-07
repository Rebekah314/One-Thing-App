import React from 'react';

const Login = () => {
    return (
        <>
            <Container>
                <div>
                    <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                </div>
            </Container>
        </>
    );
};

export default Login;