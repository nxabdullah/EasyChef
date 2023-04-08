import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/recipe-cards.css";
import { BASE_URL } from "../../config/constants";

function RecipeCard({
  id,
  title,
  image,
  description,
  prep_time,
  cook_time,
  serving_size,
}) {
  console.log(image);

  return (
    <Link className="clicky" to={`/recipes/${id}`}>
      <Card className="recipe shadow-sm">
        <Card.Img
          variant="top"
          src={BASE_URL + image}
          className="recipe-picture"
        />
        <Card.Body>
          <Card.Title>
            <h2>{title}</h2>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
          <Container>
            <div className="card-icons">
              <div>
                <i className="fas fa-clock fa-lg"></i>
                <p>
                  prep time <br />
                  <small>{prep_time} mins</small>
                </p>
              </div>
              <div>
                <i className="far fa-clock fa-lg"></i>
                <p>
                  cook time <br />
                  <small>{cook_time} mins</small>
                </p>
              </div>
              <div className="serving">
                <i className="fas fa-user-friends fa-lg"></i>
                <p>
                  serving size <br />
                  <small>{serving_size}</small>
                </p>
              </div>
            </div>
          </Container>
        </Card.Body>
      </Card>
    </Link>

    // <Link className="clicky" to={`/recipes/${id}`}>
    //   <div class="col cardy">
    //     <div class="card shadow-sm">
    //       <img
    //         src="./img/pulao.jpeg"
    //         class="recipe-picture"
    //         width="100%"
    //         height="100%"
    //       />
    //       <div class="card-body">
    //         <h2>Chicken Pulao</h2>
    //         <p class="card-text">
    //           Indulge in a delicious breakfast treat with our delightful Chicken
    //           Pulao.
    //         </p>
    //         <div class="card-icons">
    //           <div>
    //             <i class="fas fa-clock fa-lg"></i>
    //             <p>
    //               prep time <br /> <small>30 mins</small>
    //             </p>
    //           </div>
    //           <div>
    //             <i class="far fa-clock fa-lg"></i>
    //             <p>
    //               cook time <br /> <small>15 mins</small>
    //             </p>
    //           </div>
    //           <div class="serving">
    //             <i class="fas fa-user-friends fa-lg"></i>
    //             <p>
    //               {" "}
    //               serving size <br /> <small>6 servings</small>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
}

RecipeCard.defaultProps = {
  id: 1,
  title: "Blueberry",
  image: `${process.env.PUBLIC_URL}/pancake.jpg`,
  description:
    "Indulge in a treat with our scrumptious Blueberry Banana Pancakes.",
  prep_time: "30",
  cook_time: "15",
  serving_size: "6",
};

export default RecipeCard;
