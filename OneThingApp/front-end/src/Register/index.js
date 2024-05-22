import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useLocalState } from '../util/useLocalStorage';

const Register = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    function sendRegisterRequest() {

              const reqBody = {
                "username": username,
                "email": email,
                "password": password,
                "role": role
              }
              
              //Communicate from front end to back end with fetch
              //the 'register' here is from the AuthenticationController on the backend
              fetch('register', {
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
                    return Promise.reject("Invalid Registration Attempt")
                }
                
              })
              .then(([body, headers]) => {
                
                console.log(username);
                setJwt(body.token);
                window.location.href = "dashboard";
              }).catch((message) => alert(message));
          }
    


    return (
        <>
            <Container className="mt-5 ">
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4">Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Type in your Username"
                                size="lg"
                                value={username}
                                onChange={(event)=> setUsername(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="fs-4">Email</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="name@email.com"
                                size="lg"
                                value={email}
                                onChange={(event)=> setEmail(event.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="fs-4">Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Type in your password"
                                size="lg"
                                value={password}
                                onChange={(event)=> setPassword(event.target.value)}

                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="verifyPassword">
                            <Form.Label className="fs-4">Re-Type Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Type in your password again"
                                size="lg"
                                value={verifyPassword}
                                onChange={(event)=> setVerifyPassword(event.target.value)}

                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row  className="justify-content-center">
                    <Col md="8" lg="6">
                        <Form.Group>
                        <Form.Label className="fs-4">Select Role</Form.Label>
                    <Form.Check 
                        type={'radio'}
                        id={"USER"}
                        label="User"
                        name="role"
                        onClick={() => setRole("USER")}
                    />
                    <Form.Check 
                        type={'radio'}
                        id={"FRIEND"}
                        label="Accountability Friend"
                        name="role"
                        onClick={() => setRole("FRIEND")}
                    />
                    <Form.Check 
                        type={'radio'}
                        id={"ADMIN"}
                        label="Admin"
                        name="role"
                        onClick={() => setRole("ADMIN")}
                    />

                        </Form.Group>
                    </Col>
                </Row>
                
                <Row className="justify-content-center">
                    <Col md="8" lg="6" className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-between">
                        <Button 
                            id="submit" 
                            type="button" 
                            size="lg"
                            onClick={() => {
                                if(password !==verifyPassword) {
                                    alert("Passwords don't match");
                                } else {
                                sendRegisterRequest()}}}
                            variant="primary"
                        >
                            Register
                        </Button>
                        <Button
                            variant="secondary"
                            type="button"
                            size="lg"
                            onClick={() => window.location.href="/"}
                        >
                            Exit to Homepage
                        </Button>
                    </Col>
                </Row>
            </Container>
            
        </>
    );
};

export default Register;