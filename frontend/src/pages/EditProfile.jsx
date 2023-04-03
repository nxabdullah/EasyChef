import { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useToken from '../hooks/useToken';

function EditProfile() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  });
  const {token} = useToken()
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/account/')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handlePersonalInfoSave = (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const new_email = document.getElementById('email').value.trim();
    axios
      .patch('http://localhost:8000/api/account/', {
        first_name: firstName,
        last_name: lastName,
        email: new_email
      })
      .then((response) => {
        setUser({
          ...user,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          new_email: response.data.email
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const validatePasswords = () => {
    if (newPassword !== repeatNewPassword) {
      setPasswordError('New passwords do not match');
      return false;
    } else if (newPassword.length < 8) {
      setPasswordError('New password should be at least 8 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!validatePasswords()) {
      return;
    }
    axios.post('http://127.0.0.1:8000/api/account/', {
      old_password: currentPassword,
      new_password1: newPassword,
      new_password2: repeatNewPassword
    })
      .then(response => {
        setShowSuccessMessage(true);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  
  return (
    <div>
  <Card className="mt-4">
    <Card.Header>
      <h4 className="card-header-title">Personal Information</h4>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handlePersonalInfoSave}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="upload-image" className="form-label">Upload your profile photo</Form.Label>
          <div className="">
            <label htmlFor="upload-image" className="me-4">
              <img id="upload-image-preview" className="rounded-circle border" src="img/kianoosh.jpeg" alt="" />
            </label>
          </div>
          <label htmlFor="upload-image" className="link-primary-c" id="upload-image-label">Click here to change</label>
          <Form.Control id="upload-image" className="d-none" type="file" />
        </Form.Group>
        <div className="row">
          <div className="col-md-6 mt-4">
            <Form.Label htmlFor="first-name" className="form-label">First Name</Form.Label>
            <Form.Control type="text" id="first-name" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
          </div>
          <div className="col-md-6 mt-4">
            <Form.Label htmlFor="last-name" className="form-label">Last Name</Form.Label>
            <Form.Control type="text" id="last-name" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} />
          </div>
          <div className="col-md-6 mt-4">
            <Form.Label htmlFor="email" className="form-label">Email Address</Form.Label>
            <Form.Control type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />          
          </div>
          <div className="col-md-6 mt-4">
            <Form.Label htmlFor="phone-number" className="form-label">Phone Number</Form.Label>
            <Form.Control type="text" id="phone-number" value={user.phone_number} onChange={(e) => setUser({ ...user, phone_number: e.target.value })} />
          </div>
        </div>
        <div className="text-end mt-4">
          <Button type="submit" variant="primary" className="btn btn-primary btn-primary-c mb-0 mt-4">Save Changes</Button>
        </div>
      </Form>
    </Card.Body>
  </Card>

  <Card className="mt-4">
    <Card.Header>
      <h4 className="card-header-title">Change Password</h4>
    </Card.Header>
    <Card.Body>
      <Form onSubmit={handlePasswordChange}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="current-password" className="form-label">Current Password</Form.Label>
          <Form.Control type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="new-password" className="form-label">New Password</Form.Label>
          <Form.Control type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="repeat-new-password" className="form-label">Repeat New Password</Form.Label>
          <Form.Control type="password" id="repeat-new-password" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
          {passwordError && <div className="text-danger">{passwordError}</div>}
          {showSuccessMessage && <div className="text-success">Password changed successfully</div>}
        </Form.Group>
        <div className="text-end mt-4">
          <Button type="submit" variant="primary" className="btn btn-primary btn-primary-c mb-0 mt-4">Change Password</Button>
        </div>
      </Form>
    </Card.Body>
  </Card>

  {showSuccessMessage && (
    <div className="alert alert-success mt-4" role="alert">
      Your changes have been saved successfully!
    </div>
  )}
</div>
);
}

export default EditProfile;
