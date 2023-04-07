import { useState, useRef } from "react";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Image } from "primereact/image";

// POST http://localhost:8000/api/recipes/<recipe_id>/comments/
/*
  Request body
  {
    "description": "Comment with photo and video",
    "images": [1,2],
    "videos": [1]
}
*/

function CommentsPost({ comments, recipe_id, triggerRefresh, setComments }) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const toast = useRef(null);

  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "You can't post an empty comment.",
      life: 5000,
    });
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your comment was posted successfully.",
      life: 5000,
    });
  };

  const handleSubmit = async () => {
    if (!description) {
      showError();
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/recipes/${recipe_id}/comments/`,
        {
          description,
          // need to send the image IDs
          images: images.map((image) => image.id),
          videos: videos.map((video) => video.id),
        }
      );

      if (response.status === 201) {
        const newComment = response.data;
        // setComments([newComment, ...comments]);
        //triggerRefresh();
        if (Array.isArray(comments.results)) {
          setComments({
            ...comments,
            results: [newComment, ...comments.results],
          });
        } else {
          setComments({ ...comments, results: [newComment] });
        }

        setDescription(""); // Clear the description field
        setImages([]); // Clear the images
        showSuccess();
      } else {
        // handle unexpected status codes
        console.log(response);
      }
    } catch (error) {
      // handle errors from the API
      console.log(error);
    }
  };

  const handleImageUpload = async (event) => {
    // send the image to the API http://localhost:8000/api/recipes/comments/images/
    const formData = new FormData();
    console.log(event.files);
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/recipes/comments/images/",
        formData
      );
      if (response.status === 201) {
        setImages([...images, response.data]);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    event.target.value = "";
  };

  const handleVideoUpload = async (event) => {
    // send the image to the API http://localhost:8000/api/recipes/comments/videos/
    // API returns an id for the video
    // add the id to the videos state
    console.log("Handle video upload");
    const formData = new FormData();
    console.log(event.files);
    formData.append("video", event.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/recipes/comments/videos/",
        formData
      );
      if (response.status === 201) {
        setVideos([...videos, response.data]);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }

    event.target.value = "";
  };

  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  const triggerVideoUpload = () => {
    console.log("Trigger video upload");
    console.log(videoInputRef.current);
    videoInputRef.current.click();
  };

  const handleDeleteImage = (image) => {
    console.log("Delete image with id: " + image.id);

    // Delete it from the images state
    setImages(images.filter((img) => img.id !== image.id));
  };

  const handleDeleteVideo = (video) => {
    setVideos(videos.filter((v) => v.id !== video.id));
  };

  return (
    <>
      <Toast ref={toast} />
      <h3 className="mb-4">Post a comment</h3>
      <div class="row mb-4">
        <div>
          <span className="p-float-label">
            <InputTextarea
              autoResize
              rows={2}
              style={{ width: "100%" }}
              id="comment-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="comment-textarea">Leave a comment here</label>
          </span>

          <Button
            icon="pi pi-send"
            rounded
            raised
            aria-label="Filter"
            size="small"
            className="float-end mt-2 me-4"
            onClick={handleSubmit}
          />

          {/* Use these to upload images and videos.. multi select should be allowed for both */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleVideoUpload}
          />

          <Button
            icon="pi pi-image"
            rounded
            text
            raised
            aria-label="Filter"
            size="small"
            className="float-end mt-2 me-3"
            onClick={triggerImageUpload}
          />

          <Button
            icon="pi pi-video"
            rounded
            text
            raised
            aria-label="Filter"
            size="small"
            className="float-end mt-2 me-3"
            onClick={triggerVideoUpload}
          />

          <br />
          {images.length > 0 && (
            <div className="images-bar mb-4">
              <p>Attached Photos</p>
              {images.map((image, index) => (
                <div key={index} className="media-delete-overlay">
                  <Button
                    rounded
                    raised
                    className="media-delete-btn"
                    icon="pi pi-times"
                    severity="danger"
                    onClick={() => handleDeleteImage(image)}
                  ></Button>
                  <Image
                    src={image.image}
                    // key={index}
                    width={85}
                    height={85}
                    className="me-2 custom-avatar"
                  />
                </div>
              ))}
            </div>
          )}

          {videos.length > 0 && (
            <div className="images-bar">
              <p className="mb-0">Attached Videos</p>
              {videos.map((video, index) => (
                <div key={index} className="video-delete-overlay">
                  <Button
                    rounded
                    raised
                    className="video-delete-btn"
                    icon="pi pi-times"
                    severity="danger"
                    onClick={() => handleDeleteVideo(video)}
                  ></Button>
                  <video
                    src={video.video}
                    // poster={`${process.env.PUBLIC_URL}/video_preview.png`}
                    width={125}
                    height={125}
                    className="me-2"
                    controls
                    style={{ marginTop: "0px" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentsPost;
