import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Homepage = () => {
    return (
        <Container className="mt-5" >
            <Row>
                <h1>Reshape MY life, ONE THING at a time.</h1>
            </Row>
<div className="d-grid gap-3" 
                    style={{gridTemplateColumns: "repeat(auto-fill, 18rem)"}}>
            <Card style={{ width: '18rem' }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Ready to SIMPLIFY my to-do list</Card.Title>
                    <Button
                            variant="primary"
                            type="button"
                            size="lg"
                            onClick={() => window.location.href="/register"}
                    >
                        Register
                    </Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Continue my productivity journey</Card.Title>
                    <Button
                            variant="primary"
                            type="button"
                            size="lg"
                            onClick={() => window.location.href="/login"}
                    >
                        Log In
                    </Button>
                </Card.Body>
            </Card>
            </div>
        </Container>
    );
};

export default Homepage;