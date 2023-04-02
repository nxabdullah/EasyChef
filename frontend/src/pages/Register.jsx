import { useState } from 'react'
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
  Alert
} from 'react-bootstrap';
import axios from 'axios';
import { REGISTER_ENDPOINT } from '../config/constants';

// TODO: after registering, the form information stays there.
// this is because it is not connected to its own state
// we can do that later if there is time -- also may
// need to redirect after 3 seconds.

function Register() {

  // state for form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State for API errors
  const [errors, setErrors] = useState({});

  // State for success message
  const [successMessage, setSuccessMessage] = useState('');


  // Update formData on input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  // Submit form data and handle errors
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(REGISTER_ENDPOINT, formData);
      // Redirect or perform other actions on successful registration
      setSuccessMessage('Registration successful! You can now log in.');
      setErrors({});
      setFormData({});
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      }
    }
  };


  return (
    <Container className="rounded-3" id="login-container">
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

          {/* Display success message */}
          {successMessage && (
            <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
            Registration successful! You can now{' '}
            <Link to="/login" className="link-primary">
              log in
            </Link>.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Enter Username</FormLabel>
              <FormControl
                type="text"
                id="registerUsername"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                isInvalid={errors.username}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  {errors.username[0]}
                </Form.Control.Feedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Enter Email</FormLabel>
              <FormControl
                type="email"
                id="registerEmail"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                isInvalid={errors.email}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email[0]}
                </Form.Control.Feedback>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Enter Password</FormLabel>
              <FormControl
                type="password"
                id="registerPassword1"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                isInvalid={errors.password}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password[0]}
                </Form.Control.Feedback>
              )}
            </FormGroup>

            {/* Add a repeat password field here, if needed */}

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