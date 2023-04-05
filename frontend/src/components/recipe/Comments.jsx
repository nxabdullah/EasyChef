import { useState, useEffect } from 'react';
import axios from 'axios';
import { RECIPE_COMMENTS_ENDPOINT } from '../../config/constants';
import CustomCard from '../shared/CustomCard';
import CommentsPost from './CommentsPost';
import CommentsView from './CommentsView';

function Comments({ recipe_id }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(RECIPE_COMMENTS_ENDPOINT(recipe_id));
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [recipe_id]);

  return (
    <CustomCard>
      {loading ? (
        <div>Loading...</div> // Replace this with your preferred loading animation
      ) : (
        <>
          <CommentsPost />
          <CommentsView comments={comments} />
        </>
      )}
    </CustomCard>
  );
}

export default Comments;
