import { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { ACCOUNT_ENDPOINT } from '../config/constants';

function EditProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    axios.get(ACCOUNT_ENDPOINT)
      .then(response => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handlePersonalInfoSave = (e) => {
    e.preventDefault();
    axios.put(ACCOUNT_ENDPOINT, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone
    })
    .then(response => {
      setShowSuccessMessage(true);
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  const handlePasswordChange = (e) => {
    e.preventDefault();
    axios.post('/api/accounts/', {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: repeatNewPassword
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
                <Form.Control type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="col-md-6 mt-4">
                <Form.Label htmlFor="last-name" className="form-label">Last Name</Form.Label>
                <Form.Control type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="col-md-6 mt-4">
                <Form.Label htmlFor="email" className="form-label">Email Address</Form.Label>
                <Form.Control type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="col-md-6 mt-4">
                <Form.Label htmlFor="phone" className="form-label">Phone Number</Form.Label>
                <Form.Control type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your mobile number" />
              </div>
            </div>
            <div className="text-end mt-4">
              <Button type="submit" className="btn btn-primary btn-primary-c mb-0 mt-4">Save</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h4 className="card-header-title">Update Password</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3" controlId="current-password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control type="password" placeholder="Enter current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="new-password">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="repeat-new-password">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm new password" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} />
            </Form.Group>

            <div className="text-end mt-4">
              <Button type="submit" className="btn btn-primary btn-primary-c mb-0 mt-4">Change Password</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditProfile