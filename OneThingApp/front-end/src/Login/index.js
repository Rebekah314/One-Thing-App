import React, { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
            <Container className="mt-5">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label htmlFor="username" className="fs-4">Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        id="username"
                        placeholder="Type in your Username"
                        size="lg"
                        value={username}
                        onChange={(event)=> setUsername(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label htmlFor="password" className="fs-4">Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        id="password"
                        placeholder="Type in your password"
                        size="lg"
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)}

                    />
                </Form.Group>
                <Row>
                    <Col className="mt-5">
                        <Button 
                            id="submit" 
                            type="button" 
                            size="lg"
                            onClick={() => sendLoginRequest()}
                            variant="primary"
                        >
                            Log In
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            size="lg"
                            onClick={() => window.location.href="/"}
                        >
                            Exit
                        </Button>
                    </Col>
                </Row>
            </Container>
            
        </>
    );
};

export default Login;