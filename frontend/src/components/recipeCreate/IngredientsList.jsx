import React from "react";
import { Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const IngredientsList = ({
  ingredients,
  handleIngredientChange,
  addIngredient,
}) => {
  return (
    <Row className="mt-4">
      <div className="col-md-12">
        <label>Ingredients and their corresponding quantity in grams</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="d-flex mt-2">
            <InputText
              className="recipe-form-input me-4"
              placeholder="Blueberries"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
            />
            <InputText
              className="recipe-form-input"
              placeholder="500"
              style={{ width: "70%" }}
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
            />
          </div>
        ))}
        <div className="">
          <Button
            className="mt-4"
            onClick={addIngredient}
            severity="secondary"
            text
            style={{ fontSize: "13px", height: "35px" }}
          >
            Click to add more steps
          </Button>
        </div>
      </div>
    </Row>
  );
};

export default IngredientsList;
