import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/shared/RecipeCard';
import { Card, Nav, Tab } from 'react-bootstrap';
import '../styles/recipe-cards.css';
import axios from 'axios';

function MyRecipes() {
  const [activeTab, setActiveTab] = useState('myRecipesTab');
  const [myRecipes, setMyRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [interactedRecipes, setInteractedRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myRecipesResponse = await axios.get('/api/account/recipes/');
        setMyRecipes(myRecipesResponse.data);
        
        const favoriteRecipesResponse = await axios.get('/api/account/favourites/');
        setFavoriteRecipes(favoriteRecipesResponse.data);

        const interactedRecipesResponse = await axios.get('/api/account/interactions/');
        setInteractedRecipes(interactedRecipesResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <Card className="mt-4">
      <Card.Header>
        <h2>My Recipes</h2>
      </Card.Header>
      <Card.Header>
        <Nav justify variant="tabs" className="nav-responsive">
          <Nav.Item>
            <Nav.Link
              className={`mb-0 ${activeTab === 'myRecipesTab' ? 'active' : ''}`}
              eventKey="myRecipesTab"
              onClick={() => handleTabChange('myRecipesTab')}>
              <i className="fa-solid fa-bowl-rice" ><br></br></i> My Recipes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`mb-0 ${activeTab === 'favouriteRecipesTab' ? 'active' : ''}`}
              eventKey="favouriteRecipesTab"
              onClick={() => handleTabChange('favouriteRecipesTab')}>
              <i className="fa-regular fa-heart"><br></br></i> Favourite
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={`mb-0 ${activeTab === 'interactedRecipesTab' ? 'active' : ''}`}
              eventKey="interactedRecipesTab"
              onClick={() => handleTabChange('interactedRecipesTab')}>
              <i className="fa-solid fa-users"><br></br></i> Interacted with
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body className="p-2 p-sm-4">
        <Tab.Content>
          <Tab.Pane eventKey="myRecipesTab" className={`${activeTab === 'myRecipesTab' ? 'active show' : ''}`}>
            {myRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </Tab.Pane>
          <Tab.Pane eventKey="favouriteRecipesTab" className={`${activeTab === 'favouriteRecipesTab' ? 'active show' : ''}`}>
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </Tab.Pane>
          <Tab.Pane eventKey="interactedRecipesTab" className={`${activeTab === 'interactedRecipesTab' ? 'active show' : ''}`}>
            {interactedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </Tab.Pane>
      </Tab.Content>
   </Card.Body>
  </Card>
          );
          }

export default MyRecipes;
