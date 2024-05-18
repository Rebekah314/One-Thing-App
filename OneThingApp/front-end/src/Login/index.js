import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
            <Container>
                <Row>
                    <Col>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(event)=> setUsername(event.target.value)}

                        />
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(event)=> setPassword(event.target.value)}

                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <div>
                        <button id="submit" type="button" onClick={() => sendLoginRequest()}>
                            Log In
                        </button>
                    </div>
                    </Col>
                </Row>
            </Container>
            
        </>
    );
};

export default Login;