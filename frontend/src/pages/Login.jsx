import { useState, useContext } from "react";
import AccountContext from "../contexts/AccountContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  Alert,
} from "react-bootstrap";
import "../styles/login.css";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../config/constants";

// todo: proper state for authentication + logout

function Login() {
  const { login } = useContext(AccountContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(LOGIN_ENDPOINT, formData);
      login(response.data.token);
      navigate("/"); // Redirect to the desired page after successful login
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div className="container rounded-3" id="login-container">
      <Row>
        <Col></Col>
        <Col>
          <h1 className="fs-1">Welcome back</h1>
          <p className="mb-4 f-secondary">
            New here?{" "}
            <span>
              <Link to="/register" className="link-primary link-primary-c ms-1">
                Create an account
              </Link>
            </span>
          </p>

          {errors.non_field_errors && (
            <Alert variant="danger">{errors.non_field_errors[0]}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel className="f-secondary">Username</FormLabel>
              <FormControl
                type="text"
                id="loginUsername"
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
              <FormLabel className="f-secondary">Password</FormLabel>
              <FormControl
                type="password"
                id="loginPassword"
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

export default Login;
