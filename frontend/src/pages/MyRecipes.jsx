import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../hooks/useToken';
import RecipeCard from '../components/shared/RecipeCard';

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState(null);
  const [favRecipes, setFavRecipes] = useState(null);

  const { token } = useToken();

  useEffect(() => {
    const fetchRecipes = async () => {
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
  
    const fetchFavRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/account/favourites/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (Array.isArray(response.data.results) && response.data.results.length > 0) {
          setFavRecipes(response.data.results);
        } else {
          setFavRecipes(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
  
    fetchRecipes();
    fetchFavRecipes();
  }, [token]);

  if (myRecipes === null || favRecipes === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Recipes</h1>

      <h2>My Favorite Recipes</h2>
      {favRecipes ? (
        <div className="recipe-cards">
          {favRecipes.map(recipe => (
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
        <p>No favorite recipes found.</p>
      )}

      <h2>My Recipes</h2>
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
