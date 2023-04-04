import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ACCOUNT_ENDPOINT } from "../../config/constants";

function ProfilePictureUpload({ account }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Read the selected file and update the img element's src attribute
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    console.log("Remove profile picture");
    setShowModal(false);
  };

  const getProfileImage = () => {
    if (account.profile_picture) {
      return account.profile_picture;
    } else {
      return `${process.env.PUBLIC_URL}/default_pfp.svg`;
    }
  };

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
                    src={imagePreview}
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
          <button className="btn btn-sm btn-secondary" onClick={handleRemove}>
            Cancel
          </button>
          <button
            className="btn btn-sm btn-primary-c text-light"
            onClick={() => setShowModal(false)}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePictureUpload;
