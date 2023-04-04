import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomCard from "../shared/CustomCard";
import { ACCOUNT_ENDPOINT } from "../../config/constants";
import useToken from "../../hooks/useToken";

// takes account state
function ProfileDetailsCard({ account, setAccount }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(account || {});
  const [imagePreview, setImagePreview] = useState(null);

  const { token } = useToken();
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(ACCOUNT_ENDPOINT, formValues);
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
      setErrors({});

        console.log("setting state for account")
        console.log(response.data);

        // update account state
        //setAccount(formValues);
        setAccount(response.data)
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        setErrorMessage("There was an error updating your profile.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        console.log(error)
      }
      setSuccessMessage("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues({ ...formValues, profile_picture: file });

    // Read the selected file and update the img element's src attribute
    const reader = new FileReader();
    reader.onload = (e) => {
      //document.getElementById('upload-image-preview').src = e.target.result;
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const getProfileImage = () => {
      if (account !== null) {
          if (account.profile_picture) {
            return account.profile_picture
          } else {
            return `${process.env.PUBLIC_URL}/default_pfp.svg`
          }
      } else {
        return `${process.env.PUBLIC_URL}/default_pfp.svg`
      }
  }

  return (
    <CustomCard Title={`Profile`}>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form className="row" onSubmit={handleSubmit}>

        <div className="col-12">
            <label className="form-label">Profile Photo</label>
                <div>
                    <label className="me-4" for="upload-image">

                        {imagePreview ? (
                            <img id="upload-image-preview" class="rounded-circle border" src={imagePreview} alt="Profile" />

                        ) : (
                            <img id="upload-image-preview" class="rounded-circle border" src={getProfileImage()} alt="Profile" />
                        )}
                    </label>
                </div>
            <label class="link-primary-c" id="upload-image-label" for="upload-image">Click here to change</label>
            <input
                id="upload-image"
                className="form-control d-none"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                />
            </div>


        <div className="col-md-6 mt-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange = {handleChange}
            value={formValues.first_name || ''}
            placeholder="Enter your first name"
          />
          {errors.first_name && (
            <small className="text-danger">{errors.first_name[0]}</small>
          )}
        </div>

        <div className="col-md-6 mt-4">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="last_name"
            className="form-control"
            onChange = {handleChange}
            value={formValues.last_name || ''}
            placeholder="Enter your last name"
          />
          {errors.last_name && (
            <small className="text-danger">{errors.last_name[0]}</small>
          )}
        </div>

        <div className="col-md-6 mt-4">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange = {handleChange}
            value={formValues.email || ''}
            placeholder="Enter your email"
          />
          {errors.email && (
            <small className="text-danger">{errors.email[0]}</small>
          )}
        </div>

        <div className="col-md-6 mt-4">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            className="form-control"
            onChange = {handleChange}
            value={formValues.phone_number || ''}
            placeholder="Enter your phone number"
          />
          {errors.phone_number && (
            <small className="text-danger">{errors.phone_number[0]}</small>
          )}
        </div>

        <div className="col-12 text-end">
          <button className="btn btn-primary btn-primary-c mb-0 mt-4 mb-4">
            Save
          </button>
        </div>
      </form>
    </CustomCard>
  );
}

export default ProfileDetailsCard;
