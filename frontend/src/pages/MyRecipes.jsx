import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../hooks/useToken';

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
        <ul>
          {myRecipes.map(recipe => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
  
}

export default MyRecipes;



