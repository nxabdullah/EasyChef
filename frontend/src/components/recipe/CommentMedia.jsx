import React, { useState } from "react";
import { Image } from "primereact/image";
import { Modal } from "react-bootstrap";
import { BASE_URL } from "../../config/constants";

function CommentMedia({ images = [], videos = [] }) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(null);

  const openVideoModal = (videoSrc) => {
    setCurrentVideoSrc(videoSrc);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setCurrentVideoSrc(null);
    setVideoModalOpen(false);
  };

  return (
    <>
      {images.map((img, index) => (
        <Image
          key={index}
          src={BASE_URL + img.image}
          alt={`comment-img-${index}`}
          preview
          width="75"
          height="75"
          template={`View`}
          className="me-2"
        />
      ))}
      {videos.map((video, index) => (
        <div
          className="video-thumbnail"
          onClick={(e) => {
            e.preventDefault();
            openVideoModal(BASE_URL + video.video);
          }}
        >
          <Image
            key={`vid-${index}`}
            src={`${process.env.PUBLIC_URL}/video_preview.png`} // assuming `thumbnail` field exists in video object
            alt={`comment-vid-${index}`}
            zoomSrc={null}
            width="100"
            height="75"
            className="me-2"
            style={{ cursor: "pointer", width: "100%" }}
          />
          <div className="overlay"></div>
        </div>
      ))}
      <Modal show={videoModalOpen} onHide={closeVideoModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentVideoSrc && (
            <video src={currentVideoSrc} controls width="100%" autoplay muted />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CommentMedia;
