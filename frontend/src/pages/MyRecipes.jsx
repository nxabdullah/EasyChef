import React, { useState } from 'react';
import RecipeCard from '../components/shared/RecipeCard';
import { Card, Nav, Tab } from 'react-bootstrap';
import '../styles/recipe-cards.css';

function MyRecipes() {
  const [activeTab, setActiveTab] = useState('myRecipesTab');
  const recipes = [
    {
      id: 1,
      title: 'Blueberry Banana Pancakes',
      image: '../pancake.jpg',
      description: 'Indulge in a treat with our scrumptious Blueberry Banana Pancakes.',
      prepTime: '30',
      cookTime: '15',
      servingSize: '6',
      isFavourite: false,
      hasInteraction: true,
    },
  ];

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
          <RecipeCard />
          </Tab.Pane>
          <Tab.Pane eventKey="favouriteRecipesTab" className={`${activeTab === 'favouriteRecipesTab' ? 'active show' : ''}`}>
          <RecipeCard />
          </Tab.Pane>
          <Tab.Pane eventKey="interactedRecipesTab" className={`${activeTab === 'interactedRecipesTab' ? 'active show' : ''}`}>
            <RecipeCard />
          </Tab.Pane>
        </Tab.Content>
      </Card.Body>
    </Card>
  );
}

export default MyRecipes;
