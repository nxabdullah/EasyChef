import React, { useState, useContext } from "react";
import AccountContext from "../../contexts/AccountContext";
import axios from "axios";
import CustomCard from "../shared/CustomCard";
import { ACCOUNT_ENDPOINT } from "../../config/constants";
import useToken from "../../hooks/useToken";
import ProfilePictureUpload from "./ProfilePictureUpload";

// takes account state
function ProfileDetailsCard() {
  const { account, setAccount } = useContext(AccountContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(account || {});

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

      console.log("setting state for account");
      console.log(response.data);

      // update account state
      //setAccount(formValues);
      setAccount(response.data);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        setErrorMessage("There was an error updating your profile.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
        console.log(error);
      }
      setSuccessMessage("");
    }
  };

  return (
    <CustomCard title={`Profile`}>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-12">
          <ProfilePictureUpload account={account} setAccount={setAccount} />
        </div>

        <div className="col-md-6 mt-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="first_name"
            className="form-control"
            onChange={handleChange}
            value={formValues.first_name || ""}
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
            onChange={handleChange}
            value={formValues.last_name || ""}
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
            onChange={handleChange}
            value={formValues.email || ""}
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
            onChange={handleChange}
            value={formValues.phone_number || ""}
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
