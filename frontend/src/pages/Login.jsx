import React from 'react'
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap';
import '../styles/login.css';

function Login() {
  return (
    <div class="container justify-content-center align-items-center rounded-3" id="login-container">
      <Row>
        <Col></Col>
        <Col>
          <h1 className="fs-1">Welcome back</h1>
          <p className="mb-4 f-secondary">
            New here?{' '}
            <span>
              <Link to="/register" className="link-primary link-primary-c ms-1">
                Create an account
              </Link>
            </span>
          </p>
          <Form action="index.html">
            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Email address</FormLabel>
              <FormControl
                type="email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Password</FormLabel>
              <FormControl type="password" id="exampleInputPassword1" required />
            </FormGroup>


            <Button type="submit" className="btn-primary-c" id="login-btn">
              Login
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Login