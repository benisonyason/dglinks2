import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Form, Col, Row, Button } from 'react-bootstrap';

export default function SigninScreen(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className='content'>
      <Form onSubmit={submitHandler}>
        <Row>

          <div>
            <h1>Sign In</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <Col sm={2}>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label htmlFor="email">Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group controlId="formGridPassword">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Button variant="primary" type="submit">
              Log In
            </Button>
            <div>
              <div>
                New User?{' '}
                <Link to={`/register?redirect=${redirect}`}>
                  Create your account
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
