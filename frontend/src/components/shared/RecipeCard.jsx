import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../styles/recipe-cards.css';
import { BASE_URL } from '../../config/constants';

function RecipeCard({ id, title, image, description, prep_time, cook_time, serving_size }) {
  return (
    <Link className='clicky' to={`/recipes/${id}`}>
    <Card className="recipe shadow-sm">
      <Card.Img variant="top" src={BASE_URL + image} className="recipe-picture" />
      <Card.Body>
        <Card.Title><h2>{title}</h2></Card.Title>
        <Card.Text>{description}</Card.Text>
        <Container>
          <Row className="card-icons">
            <Col>
              <i className="fas fa-clock fa-lg"></i>
              <p>
                prep time <br />
                <small>{prep_time} mins</small>
              </p>
            </Col>
            <Col>
              <i className="far fa-clock fa-lg"></i>
              <p>
                cook time <br />
                <small>{cook_time} mins</small>
              </p>
            </Col>
            <Col className="serving">
              <i className="fas fa-user-friends fa-lg"></i>
              <p>
                serving size <br />
                <small>{serving_size}</small>
              </p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
    </Link>
  );
};

RecipeCard.defaultProps = {
  id: 1,
  title: 'Blueberry',
  image: `${process.env.PUBLIC_URL}/pancake.jpg`,
  description: 'Indulge in a treat with our scrumptious Blueberry Banana Pancakes.',
  prep_time: '30',
  cook_time: '15',
  serving_size: '6',
};

export default RecipeCard;
