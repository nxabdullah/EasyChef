import { useState, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import useAuthToken from "../../hooks/useAuthToken";

function RecipeStepMedia({ images, setImages, videos, setVideos }) {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  useAuthToken();

  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    console.log(event.files);
    formData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/recipes/steps/images/",
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

  const triggerVideoUpload = () => {
    videoInputRef.current.click();
  };

  const handleVideoUpload = async (event) => {
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

  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
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

      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoUpload}
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
    </>
  );
}

export default RecipeStepMedia;
