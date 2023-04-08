//REMEMBER TO PUSH TO

import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/landing/Search.jsx";
import RecipeCard from "../components/shared/RecipeCard.jsx";
import { SEARCH_ENDPOINT } from "../config/constants";

function Landing() {
  //Set states for searchQuery and filters as planned
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [cookTime, setCookTime] = useState([0, 121]); // default min and max cook times

  //useEffect hook for popular recipes (no params)
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await axios.get(SEARCH_ENDPOINT);
        setPopularRecipes(response.data.results);
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      }
    };

    fetchPopularRecipes();
  }, []);

  //useEffect hook for queried recipes (uses same hook function: setPopularRecipes)
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const params = {
          //params available
          search: searchQuery,
          cuisines: cuisines.join(","),
          diets: diets.join(","),
          min_cook_time: cookTime[0],
          max_cook_time: cookTime[1],
        };

        const response = await axios.get(SEARCH_ENDPOINT, { params }); //endpoint plus params
        console.log(params);
        setPopularRecipes(response.data.results); //produce results (PAGINATION YET TO BE ADDRESSED)
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [searchQuery, cuisines, diets, cookTime]); //dependency array for the hook (when any of these change, the hook runs again)

  //event handlers to update respective state variables upon user itneraction
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCuisinesChange = (selectedOptions) => {
    setCuisines(selectedOptions.map((option) => option.value));
  };
  const handleDietsChange = (selectedOptions) => {
    console.log(selectedOptions);
    setDiets(selectedOptions.map((option) => option.value));
    console.log(diets);
  };

  const handleCookTimeChange = (newValue) => {
    setCookTime(newValue);
  };
  console.log(popularRecipes);

  return (
    <div>
      <Search
        searchQuery={searchQuery}
        cuisines={cuisines}
        diets={diets}
        cookTime={cookTime}
        onSearchChange={handleSearchChange}
        onCuisinesChange={handleCuisinesChange}
        onDietsChange={handleDietsChange}
        onCookTimeChange={handleCookTimeChange}
      />
      <h3 className="mt-4 pt-4">
        {searchQuery ? "Search Results" : "Popular on Easychef"}
      </h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {popularRecipes.map((recipe, index) => (
          <div key={recipe.id} className="col">
            <RecipeCard
              id={recipe.id}
              title={recipe.name}
              image={recipe.images[0] && recipe.images[0].image}
              time={recipe.totalTime}
              rating={recipe.rating}
              numReviews={recipe.numReviews}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Landing;
