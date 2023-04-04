import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import useToken from '../hooks/useToken';
import RecipeCard from '../components/shared/RecipeCard';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHeart, faBowlRice } from '@fortawesome/free-solid-svg-icons';

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState(null); // Set initial state to null
  const [favRecipes, setFavRecipes] = useState(null); // Set initial state to null
  const [interactions, setInteractions] = useState(null); // Set initial state to null

  const { token } = useToken();
  const [activeTab, setActiveTab] = useState('my-recipes');

  const handleSelect = (key) => {
    setActiveTab(key);
  };


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
        setFavRecipes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchInteractions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/account/interactions/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setInteractions(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
    fetchFavRecipes();
    fetchInteractions();
  }, [token]);
  

  if (myRecipes === null || favRecipes === null || interactions === null) { // Show loading indicator while waiting for the response
    return <p>Loading...</p>;
  }

  return (
    <div>
       <Card className="mt-4">
       <Card.Header>
       <h1>My Recipes</h1>
      </Card.Header>
      <Tabs
          defaultActiveKey="my-recipes"
          className="mb-3"
          fill={true}
          onSelect={handleSelect}
        >
    <Tab
        eventKey="my-recipes"
        title={
          <span style={activeTab === 'my-recipes' ? { color: '#3a9691' } : { color: 'grey' }}>
            <FontAwesomeIcon icon={faBowlRice} /> My Recipes
          </span>
        }
      >
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
      </Tab>
      <Tab
          eventKey="fav-recipes"
          title={
            <span style={activeTab === 'fav-recipes' ? { color: '#3a9691' } : { color: 'grey' }}>
              <FontAwesomeIcon icon={faHeart} /> Favourites
            </span>
          }
        >
      {Array.isArray(favRecipes) && favRecipes.length > 0 ? (
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
       
      </Tab>
      <Tab
          eventKey="interacted"
          title={
            <span style={activeTab === 'interacted' ? { color: '#3a9691' } : { color: 'grey' }}>
              <FontAwesomeIcon icon={faUsers} /> Interacted with
            </span>
          }
        >
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
          <p>No interactions found.</p>
        )}
      </Tab>
    </Tabs>
  </Card>
</div>
  );
}
export default MyRecipes;
