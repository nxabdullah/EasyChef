import React from 'react'
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from 'react-bootstrap';

function Register() {
  return (
    <Container className="justify-content-center align-items-center rounded-3" id="login-container">
      <Row>
        <Col></Col>
        <Col>
          <h1 className="fs-1">Create new account</h1>
          <p className="mb-4 f-secondary">
            Already a member?{' '}
            <span>
              <Link to="/login" className="link-primary link-primary-c ms-1">
                Log in
              </Link>
            </span>
          </p>
          <Form action="index.html">
            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Enter Email</FormLabel>
              <FormControl type="email" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Enter Password</FormLabel>
              <FormControl type="password" id="exampleInputPassword1" required />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Repeat Password</FormLabel>
              <FormControl type="password" id="exampleInputPassword2" required />
            </FormGroup>

            <Button type="submit" className="btn-primary-c" id="login-btn">
              Sign up
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Register