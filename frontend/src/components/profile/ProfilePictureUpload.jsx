import { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { ACCOUNT_ENDPOINT } from "../../config/constants";
import useToken from "../../hooks/useToken";


function ProfilePictureUpload({ account }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null); // Add a state to store the selected file
  const [showModal, setShowModal] = useState(false);

  const { token } = useToken();
  axios.defaults.headers.common["Authorization"] = `Token ${token}`;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Store the selected file in the state

    // Read the selected file and update the img element's src attribute
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(selectedFile); // Pass the selectedFile instead of file
  };

  const handleSave = async () => {
    console.log("Save profile picture");

    // create form data
    const formData = new FormData();
    formData.append("profile_picture", file);

    // Send a PATCH request to ACCOUNT_ENDPOINT with profile_photo
    try {
        const response = await axios.patch(ACCOUNT_ENDPOINT, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Profile picture updated:", response.data);
      } catch (error) {
        console.error("Error updating profile picture:", error); // TODO: improve this later
    }

    setShowModal(false);
  };

  const getProfileImage = () => {
    if (account.profile_picture) {
      return account.profile_picture;
    } else {
      return `${process.env.PUBLIC_URL}/default_pfp.svg`;
    }
  };

  // TODO: add a loading spinner.

  return (
    <>
      <label className="form-label">Profile Photo</label>
      <div>
        <label className="me-4" htmlFor="upload-image">
          {imagePreview ? (
            <img
              id="upload-image-preview"
              className="rounded-circle border"
              src={imagePreview}
              alt="Profile"
            />
          ) : (
            <img
              id="upload-image-preview"
              className="rounded-circle border"
              src={getProfileImage()}
              alt="Profile"
            />
          )}
        </label>
      </div>
      <label
        className="link-primary-c"
        id="upload-image-label"
        onClick={() => setShowModal(true)}
      >
        <strong>Click here to change</strong>
      </label>


      <Modal show={showModal} onHide={() => setShowModal(false)}>

        <Modal.Body id='profile-image-upload-modal-body'>
            <div id='profile-image-upload-modal-body-title'>
                <img
                    id="modal-upload-image-preview"
                    className="rounded-circle border center"
                    src={imagePreview ? imagePreview :  `${process.env.PUBLIC_URL}/default_pfp.svg`}
                    alt="Profile"
                />
                <h5>Profile Photo</h5>
            </div>

            <div className="profile-image-upload-modal-body-button">
                <label class="link-primary-c"  htmlFor="upload-image"><strong>Upload Photo</strong></label>
                <input
                id="upload-image"
                className="form-control d-none"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                />
            </div>

            <div className="profile-image-upload-modal-body-button profile-image-upload-modal-body-button-end">
                <label className="link-danger link-primary-danger-c"><strong>Remove Current Photo</strong></label>
            </div>


            {/*<div className="profile-image-upload-modal-body-button profile-image-upload-modal-body-button-end">
                <label>Cancel</label>
            </div>*/}

        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button
            className="btn btn-sm btn-primary-c text-light"
            onClick={handleSave}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePictureUpload;
