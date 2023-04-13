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
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [maxCookTime, setMaxCookTime] = useState(null); // default min and max cook times
  const [searchedPage, setSearchedPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setTotal(0);

        if (
          searchQuery.length === 0 &&
          cuisines.length === 0 &&
          diets.length === 0 &&
          !maxCookTime
        ) {
          setSearchedRecipes([]);
          const response = await axios.get(`${RECIPES_ENDPOINT}popular/`, {
            params: { page: popularPage },
          });
          const newRecipes = response.data.results;
          setTotal(response.data.count);
          if (popularPage === 1) {
            setPopularRecipes(newRecipes);
          } else {
            setPopularRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
          }
        } else if (
          searchQuery.length !== 0 ||
          cuisines.length !== 0 ||
          diets.length !== 0 ||
          maxCookTime
        ) {
          setPopularRecipes([]); // Clear popular recipes array
          const params = {
            page: searchedPage,
            search: searchQuery,
            cuisines: cuisines.join(","),
            diets: diets.join(","),
            max_cook_time: maxCookTime,
          };
          
          const response = await axios.get(SEARCH_ENDPOINT, { params });
          const newRecipes = response.data.results;
          setTotal(response.data.count);
          if (searchedPage === 1) {
            setSearchedRecipes(newRecipes);
          } else {
            setSearchedRecipes((prevRecipes) => [
              ...prevRecipes,
              ...newRecipes,
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
    setSearched(false);
  }, [popularPage, searchedPage, searched, cuisines, diets, maxCookTime]);

  //event handlers to update respective state variables upon user itneraction
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearched(true);
    setSearchedPage(1);
    setPopularPage(1);
  };

  const handleShowMore = () => {
    if (popularRecipes.length < total) {
      setPopularPage((prevPage) => prevPage + 1);
    }
  };

  const handleShowMore2 = () => {
    if (searchedRecipes.length < total) {
      setSearchedPage((prevPage) => prevPage + 1);
    }
  };

  //ADD FOR POPULAR PAGE TOO?
  const handleCuisinesChange = (selectedOptions) => {
    setSearchedRecipes([]);
    setCuisines(selectedOptions.map((option) => option.value));
  };
  const handleDietsChange = (selectedOptions) => {
    setSearchedRecipes([]);
    setDiets(selectedOptions.map((option) => option.value));
  };

  const handleMaxCookTimeChange = (event, newValue) => {
    if (newValue === 0) {
      setMaxCookTime(null)
    } else {
      setMaxCookTime(newValue);
    }
  };

  const handlePageChange = () => {
    setSearchedPage(1);
    setPopularPage(1);
  };

  return (
    <div>
      <Search
        searchQuery={searchQuery}
        cuisines={cuisines}
        diets={diets}
        maxCookTime={maxCookTime}
        onSearchChange={handleSearchChange}
        onCuisinesChange={handleCuisinesChange}
        onDietsChange={handleDietsChange}
        onMaxCookTimeChange={handleMaxCookTimeChange}
        onSearchSubmit={handleSearchSubmit}
        onPageChange={handlePageChange}
      />
      <h3 className="mt-1 pt-4">
        {searchedRecipes.length === 0 && total > 0 &&
        diets.length === 0 &&
        cuisines.length === 0 &&
        maxCookTime === null
          ? "Popular on EasyChef"
          : total > 0
          ? `Search Results (${total})`
          : "No recipes found"}
      </h3>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {popularRecipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
        {searchedRecipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
      {!searchQuery ? (
        <div style={{ textAlign: "center" }}>
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
            total > 0 && (
              <p className="mt-3" style={{ fontSize: "20px" }}>
                No more recipes found
              </p>
            )
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
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
            total > 0 && (
              <p className="mt-3" style={{ fontSize: "20px" }}>
                No more recipes found
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Landing;
