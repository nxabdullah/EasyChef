//REMEMBER TO PUSH TO

import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from '../components/landing/Search.jsx'
import RecipeCard from '../components/shared/RecipeCard.jsx'
import { SEARCH_ENDPOINT } from '../config/constants';
import {Container, Row, Col} from 'react-bootstrap';
// /*
//   Plan:
//     The search query and filters are going to be stored as state
//     Everytime the user change them, the recipe cards should update accordingly

//     Initially, there will be no query (that's okay, because empty query results in
//     all recipes sorted by popularity).
// */
function Landing() {
  //Set states for searchQuery and filters as planned
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [cookTime, setCookTime] = useState([0, 120]); // default min and max cook times
  // const [minCookTime, setMinCookTime] = useState('');
  // const [maxCookTime, setMaxCookTime] = useState('');
  

  //useEffect hook for popular recipes (no params)
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await axios.get(SEARCH_ENDPOINT); 
        setPopularRecipes(response.data.results);
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
      }
    };

    fetchPopularRecipes();
  }, []);

  //useEffect hook for queried recipes (uses same hook function: setPopularRecipes)
  useEffect(() => {
    const fetchRecipes = async () => {
      
      try {
        const params = { //params available
          search: searchQuery,
          cuisines: cuisines.join(','),
          diets: diets.join(','),
          // min_cook_time: minCookTime,
          // max_cook_time: maxCookTime,
          min_cook_time: cookTime[0],
          max_cook_time: cookTime[1],
        };

        const response = await axios.get(SEARCH_ENDPOINT, { params }); //endpoint plus params
        console.log(params)
        setPopularRecipes(response.data.results); //produce results (PAGINATION YET TO BE ADDRESSED)
      } catch (error) { 
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [searchQuery, cuisines, diets, cookTime]); //dependency array for the hook (when any of these change, the hook runs again)
  // }, [searchQuery, cuisines, diets, minCookTime, maxCookTime]); //dependency array for the hook (when any of these change, the hook runs again)


  //event handlers to update respective state variables upon user itneraction 
  const handleSearchChange = (event) => { 
    setSearchQuery(event.target.value);
  };

  const handleCuisinesChange = (selectedOptions) => {
    setCuisines(selectedOptions.map(option => option.value));
  };
  const handleDietsChange = (selectedOptions) => {
    setDiets(selectedOptions.map(option => option.value));
  };

  // const handleMinCookTimeChange = (event) => {
  //   setMinCookTime(event.target.value);
  //   // Filter the options of the max cook time based on the selected min cook time
  //   // Filter the options of the max cook time based on the selected min cook time
  //   const selectedMinCookTime = parseInt(event.target.value);
  //   if (selectedMinCookTime !== '') {
  //     setMaxCookTime('');
  //   }
  // };

  // const handleMaxCookTimeChange = (event) => {
  //   setMaxCookTime(event.target.value);
  // };
  const handleCookTimeChange = (event, newValue) => {
    setCookTime(newValue);
  };
  return (
    <div>
      <Search
        //set PARAMS
        searchQuery={searchQuery}
        cuisines={cuisines}
        diets={diets}
        // minCookTime={minCookTime}
        // maxCookTime={maxCookTime}
        cookTime={cookTime}
        //call handlers when applicable
        onSearchChange={handleSearchChange}
        onCuisinesChange={handleCuisinesChange}
        onDietsChange={handleDietsChange}
        // onMinCookTimeChange={handleMinCookTimeChange}
        // onMaxCookTimeChange={handleMaxCookTimeChange}
        onCookTimeChange={handleCookTimeChange}
      />
      <h3 className="mb-4">Results</h3>
      <Container>
        <Row>
          {popularRecipes
            .map((recipe, index) => (
              <Col key={recipe.id} md={4} className="mb-4">
                <RecipeCard
                  id={recipe.id}
                  title={recipe.name}
                  image={recipe.image}
                  time={recipe.totalTime}
                  rating={recipe.rating}
                  numReviews={recipe.numReviews}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
  
export default Landing;