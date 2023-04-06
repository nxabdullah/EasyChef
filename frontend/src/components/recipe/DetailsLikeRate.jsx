import { useState, useEffect } from "react";
import axios from "axios";
import useAuthToken from "../../hooks/useAuthToken";

function DetailsLikeRate({ numFavs, recipeId }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(numFavs);
  const [ratingData, setRatingData] = useState(null);

  useAuthToken();

  useEffect(() => {
    fetchRatingData();
  }, []);

  useEffect(() => {
    fetchFavouriteData();
  }, []);

  async function fetchRatingData() {
    const url = `http://localhost:8000/api/recipes/${recipeId}/ratings/`;

    try {
      const response = await axios.get(url);
      setRatingData(response.data);
    } catch (error) {
      console.error("Error fetching rating data:", error);
    }
  }

  async function fetchFavouriteData() {
    const url = `http://localhost:8000/api/recipes/${recipeId}/favourite/`;

    try {
      const response = await axios.get(url);
      setIsFavorited(response.data.is_favorited);
    } catch (error) {
      console.error("Error fetching favourite data:", error);
    }
  }

  async function handleRemoveRating() {
    const url = `http://localhost:8000/api/recipes/${recipeId}/ratings/`;

    try {
      await axios.delete(url);
      fetchRatingData(); // Fetch the updated rating data after removing the rating
    } catch (error) {
      console.error("Error while removing rating:", error);
    }
  }

  function renderStars() {
    const stars = [];
    const rating = ratingData.rating;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`fa fa-star${i <= Math.round(rating) ? " checked" : ""}`}
          onClick={() => handleRating(i)}
          onDoubleClick={handleRemoveRating}
        ></span>
      );
    }
    return stars;
  }

  async function handleRating(rating) {
    const url = `http://localhost:8000/api/recipes/${recipeId}/ratings/`;

    try {
      const response = await axios.put(url, { rating });
      setRatingData(response.data);
    } catch (error) {
      console.error("Error while setting rating:", error);
    }
  }

  async function handleFavourite() {
    const url = `http://localhost:8000/api/recipes/${recipeId}/favourite/`;

    try {
      if (!isFavorited) {
        // Favourite the recipe
        await axios.post(url);
        setIsFavorited(true);
        setFavoritesCount(favoritesCount + 1);
      } else {
        // Remove the favorite
        await axios.delete(url);
        setIsFavorited(false);
        setFavoritesCount(favoritesCount - 1);
      }
    } catch (error) {
      console.error("Error while favoriting/unfavoriting:", error);
    }
  }

  if (!ratingData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-2 mt-0">
        {renderStars()}(
        {ratingData.avg_rating && ratingData.avg_rating !== 0
          ? ratingData.avg_rating.toFixed(1)
          : "No ratings yet"}
        )
        <span>
          <span className="me-1 ms-1">|</span>
          <i
            className={`fa${isFavorited ? "s liked" : "r"} fa-heart me-1`}
            onClick={handleFavourite}
          ></i>
          <span>({favoritesCount})</span>
        </span>
      </div>
    </>
  );
}

export default DetailsLikeRate;
