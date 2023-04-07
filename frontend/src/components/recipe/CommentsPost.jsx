import { useState, useRef } from "react";
import axios from "axios";
import { FileUpload } from "primereact/fileupload";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";

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

          <button
            type="submit"
            className="btn btn-primary btn-primary-c mt-3 float-end p-button"
            onClick={handleSubmit}
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
}

export default CommentsPost;
