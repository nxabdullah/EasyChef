import { useState, useEffect } from "react";
import axios from "axios";
import { RECIPE_COMMENTS_ENDPOINT } from "../../config/constants";
import CustomCard from "../shared/CustomCard";
import CommentsPost from "./CommentsPost";
import CommentsView from "./CommentsView";

function Comments({ recipe_id }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchComments = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${RECIPE_COMMENTS_ENDPOINT(recipe_id)}?page=${page}`
      );
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(1).then((data) => {
      if (data) setComments(data);
    });
  }, [recipe_id]);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await fetchComments(nextPage);
    if (response && response.results) {
      setComments((prevComments) => ({
        ...response,
        results: [...prevComments.results, ...response.results],
      }));
      setPage(nextPage);
    }
  };

  return (
    <CustomCard>
      {loading ? (
        <div>Loading...</div> // Replace this with your preferred loading animation
      ) : (
        <>
          <CommentsPost
            setComments={setComments}
            recipe_id={recipe_id}
            comments={comments}
          />
          <CommentsView comments={comments} setComments={setComments} />
          {comments && comments.next && (
            <button className="btn btn-primary" onClick={loadMore}>
              Load more
            </button>
          )}
        </>
      )}
    </CustomCard>
  );
}

export default Comments;
