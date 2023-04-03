import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from '../components/landing/Search.jsx'
import RecipeCard from '../components/shared/RecipeCard.jsx'
import { SEARCH_ENDPOINT } from '../config/constants';
import {Container, Row, Col} from 'react-bootstrap';

/*
  Plan:
    The search query and filters are going to be stored as state
    Everytime the user change them, the recipe cards should update accordingly

    Initially, there will be no query (that's okay, because empty query results in
    all recipes sorted by popularity).
*/

function Landing() {
  const [popularRecipes, setPopularRecipes] = useState([]);

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

  return (
    <div>
      <Search />
      <h3 className="mb-4">Popular on EasyChef</h3>
        {popularRecipes
          .map((recipe, index) => (
            <Col key={recipe.id} md={4} className="mb-4">
              <RecipeCard
                id={recipe.id}
                title={recipe.name}
                image={recipe.images[0].image}
                description={recipe.description}
                prep_time={recipe.prep_time}
                cook_time={recipe.cook_time}
                serving_size={recipe.serving_size}
              />
            </Col>
          ))
          .reduce((accumulator, currentValue, currentIndex) => {
            if (currentIndex % 3 === 0) {
              accumulator.push([]);
            }
            accumulator[accumulator.length - 1].push(currentValue);
            return accumulator;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>{row}</div>
          ))}
    </div>
  );

}

export default Landing
