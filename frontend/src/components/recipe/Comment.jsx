import React from "react";
import { Avatar } from "primereact/avatar";
import { BASE_URL } from "../../config/constants";

import CommentMedia from "./CommentMedia";

function timeAgo(date) {
  date = new Date(date);

  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  }

  return `${Math.floor(seconds)} second${
    Math.floor(seconds) > 1 ? "s" : ""
  } ago`;
}

// TODO: make it use username if no first and last name
function Comment({ comment }) {
  return (
    <>
      <div className="d-flex flex-row mb-4">
        <div className="p-2 me-2">
          <Avatar
            icon="pi pi-user"
            size="xlarge"
            label={
              comment.user.first_name
                ? comment.user.first_name[0]
                : comment.user.username[0]
            }
            image={
              comment.user.profile_picture &&
              BASE_URL + comment.user.profile_picture
            }
            shape="circle"
            className="custom-avatar"
          />
        </div>
        <div className="p-1">
          {comment.user.first_name && comment.user.last_name ? (
            <h4 className="mb-0">{`${comment.user.first_name} ${comment.user.last_name}`}</h4>
          ) : (
            <h4 className="mb-0">{`${comment.user.username}`}</h4>
          )}
          <span className="date mt-0 small">
            {comment && timeAgo(comment.date_created)}
          </span>
          <p className="mt-1 text-black">{comment.description}</p>
          <div className="p-2 col-lg-5">
            {/* <RecipeCarousel
            images={comment.images}
            videos={comment.videos}
            autoPlay={false}
            showThumbs={false}
          /> */}
            <div className="d-flex flex-row mb-4">
              <CommentMedia images={comment.images} videos={comment.videos} />
            </div>
          </div>
        </div>
      </div>

      <hr className="mb-4 pb-4" />
    </>
  );
}

export default Comment;
