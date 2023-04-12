//POPULAR RECIPE ENDPOINT
//RECIPE CARDS DISPLAY

import { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/landing/Search.jsx";
import "../styles/search.css";
import RecipeCard from "../components/shared/RecipeCard.jsx";
import { SEARCH_ENDPOINT, RECIPES_ENDPOINT } from "../config/constants";
import { Button } from "react-bootstrap";

function Landing() {
  //Set states for searchQuery and filters as planned
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [cookTime, setCookTime] = useState([0, 121]); // default min and max cook times
  const [searchedPage, setSearchedPage] = useState(1)
  const [popularPage, setPopularPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setTotal(0);
        
        if (searchQuery.length === 0 && cuisines.length===0 && diets.length===0) {
          setSearchedRecipes([])
          const response = await axios.get(`${RECIPES_ENDPOINT}popular/`, { params: { page: popularPage } });
          const newRecipes = response.data.results;
          setTotal(response.data.count);  
          if (popularPage === 1) {
            setPopularRecipes(newRecipes);
          } else {
            setPopularRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          }
        } else if (searchQuery.length !== 0 || cuisines.length!==0 || diets.length !==0) {
          setPopularRecipes([]); // Clear popular recipes array 
          const params = {
            page: searchedPage,
            search: searchQuery,
            cuisines: cuisines.join(","),
            diets: diets.join(","),
            min_cook_time: cookTime[0],
            max_cook_time: cookTime[1],
          };
          
          const response = await axios.get(SEARCH_ENDPOINT, { params });
          const newRecipes = response.data.results;
          setTotal(response.data.count);
          if (searchedPage === 1) {
            setSearchedRecipes(newRecipes);
          } else {
            setSearchedRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          }
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, [popularPage, searchedPage, searchQuery, cuisines, diets, cookTime]); 
  
  
  //event handlers to update respective state variables upon user itneraction
  const handleSearchChange = (event) => {

    setSearchQuery(event.target.value);
    setSearchedPage(1)
    setPopularPage(1)
  };

  const handleShowMore = () => {
    if (popularRecipes.length < total) {
      setPopularPage(prevPage => prevPage + 1);
    }
  };
  
  const handleShowMore2 = () => {
    if (searchedRecipes.length < total) {
      setSearchedPage(prevPage => prevPage + 1);
    }
  };

  //ADD FOR POPULAR PAGE TOO?
  const handleCuisinesChange = (selectedOptions) => {
    setCuisines(selectedOptions.map((option) => option.value));
  };
  const handleDietsChange = (selectedOptions) => {
    setDiets(selectedOptions.map((option) => option.value));
  };

  const handleCookTimeChange = (newValue) => {
    setCookTime(newValue);

  };
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
      {(!searchQuery && diets.length === 0 && cuisines.length===0) ? "Popular on EasyChef" : (total > 0 ? `Search Results (${total})` : "No recipes found")}

      </h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {popularRecipes.map((recipe) => (
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
        {searchedRecipes.map((recipe) => (
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
        {!searchQuery ? (
  <div style={{textAlign: "center"}}>
    {popularRecipes.length < total ? (
      <Button
        style={{
          backgroundColor: "#3a9691",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px",
          marginTop: "20px",
          width: "15vw",
        }}
        onClick={handleShowMore}
      >
        Show More
      </Button>
    ) : (
      total > 0 && <p>No more recipes found</p>
    )}
  </div>
) : (
  <div style={{textAlign: "center"}}>
    {searchedRecipes.length < total ? (
      <Button
        style={{
          backgroundColor: "#3a9691",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px",
          marginTop: "20px",
          width: "15vw",
        }}
        onClick={handleShowMore2}
      >
        Show More
      </Button>
    ) : (
      total > 0 && <p>No more recipes found</p>
    )}
  </div>
)}

    </div>
  );
}

export default Landing;
