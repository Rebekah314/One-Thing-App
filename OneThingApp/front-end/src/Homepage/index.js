import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Homepage = () => {
    return (
        <Container className="mt-5">
            <Row>
                <h1>Reshape Your Life, ONE Thing at a Time</h1>
            </Row>
            <Row>
                <Col className="mt-5">
            <Button
                            variant="primary"
                            type="button"
                            size="lg"
                            onClick={() => window.location.href="/login"}
                        >
                            Log In
                        </Button>
                        </Col>
                        </Row>
        </Container>
    );
};

export default Homepage;