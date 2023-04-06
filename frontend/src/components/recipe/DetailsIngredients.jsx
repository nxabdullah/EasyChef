import React from "react";

function DetailsIngredients({ ingredients }) {
  const midPoint = Math.ceil(ingredients.length / 2);
  const column1 = ingredients.slice(0, midPoint);
  const column2 = ingredients.slice(midPoint);

  // TODO: add ability to update serving size and update ingredient quantities

  const renderIngredients = (ingredientsList) => {
    return (
      <ol className="list-group mt-4">
        {ingredientsList.map((ingredient, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold text-capitalize">{ingredient.name}</div>
              {ingredient.quantity} g
            </div>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="row mt-4 recipe-detail__ingredients">
      <h3>Ingredients</h3>

      <div className="col-6">{renderIngredients(column1)}</div>
      <div className="col-6">{renderIngredients(column2)}</div>
    </div>
  );
}

export default DetailsIngredients;
