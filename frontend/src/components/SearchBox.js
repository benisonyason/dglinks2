import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Button, Row } from 'react-bootstrap';

export default function SearchBox() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <Row className="mb-3">
      <Form onSubmit={submitHandler}>
        <Container >
          <Form.Control
            type="text"
            name="q"
            id="q"
            placeholder="Search Products"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <Button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </Button>
        </Container>
      </Form>
    </Row>

  );
}
