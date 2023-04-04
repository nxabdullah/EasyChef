import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../hooks/useToken';
import RecipeCard from '../components/shared/RecipeCard';

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState(null); // Set initial state to null

  const { token } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/account/recipes/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setMyRecipes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);
  

  if (myRecipes === null) { // Show loading indicator while waiting for the response
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Recipes</h1>
      {Array.isArray(myRecipes) ? (
        <div className="recipe-cards">
          {myRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.name}
              image={recipe.image}
              description={recipe.description}
              prep_time={recipe.prep_time}
              cook_time={recipe.cook_time}
              serving_size={recipe.serving_size}
            />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

export default MyRecipes;
