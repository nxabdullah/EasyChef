import React from "react";
import { Link } from "react-router-dom";
import "../../styles/recipe-details.css";
import DetailsLikeRate from "./DetailsLikeRate";
import RecipeCarousel from "./RecipeCarousel";

function DetailsHeader({ recipe }) {
  return (
    <div className="row gx-5">
      <div className="col-lg-5">
        {recipe && <RecipeCarousel images={recipe && recipe.images} />}
      </div>

      <div className="col-lg-6">
        <span className="text-capitalize">By: {recipe && recipe.creator}</span>

        <div className="btn-group float-end me-3" style={{ paddingTop: "4px" }}>
          <button
            type="button"
            className="btn btn-sm"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="fa-solid fa-ellipsis fa-lg"
              style={{ fontSize: "28px" }}
            ></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Delete
              </a>
            </li>
          </ul>
        </div>

        <button className="btn btn-secondary btn-sm float-end me-3">
          Duplicate
        </button>

        <h1>{recipe && recipe.name}</h1>

        <DetailsLikeRate
          numFavs={recipe && recipe.num_favourites}
          avgRating={recipe && recipe.avg_rating}
          recipeId={recipe && recipe.id}
        />

        <p>{recipe && recipe.description}</p>

        <div id="recipe-time-section">
          <div className="recipe-details-icons">
            <div>
              <i className="fas fa-clock"></i>
              <h5>prep time</h5>
              <p>{recipe && recipe.prep_time} min</p>
            </div>

            <div>
              <i className="far fa-clock"></i>
              <h5>cook time</h5>
              <p>{recipe && recipe.cook_time} min</p>
            </div>

            <div>
              <i className="fas fa-user-friends"></i>
              <h5>serving size</h5>
              <p>{recipe && recipe.active_serving_size}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsHeader;
