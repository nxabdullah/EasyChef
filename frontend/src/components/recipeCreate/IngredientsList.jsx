import { useState } from "react";
import { Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import axios from "axios";

const IngredientsList = ({
  ingredients,
  handleIngredientChange,
  addIngredient,
}) => {
  const [items, setItems] = useState([]);

  const search = (event) => {
    axios
      .get(`http://localhost:8000/api/recipes/ingredients/?name=${event.query}`)
      .then((response) => {
        //setItems(response.data.results);
        const suggestions = response.data.results.map((item) => item.name);
        setItems(suggestions);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Row className="mt-4">
      <div className="col-md-12">
        <label>Ingredients and their corresponding quantity in grams</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="d-flex mt-2">
            {/* <InputText
              className="recipe-form-input me-4"
              placeholder="Blueberries"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
            /> */}

            <AutoComplete
              className="me-4 autocomplete-custom"
              placeholder="Blueberries"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              suggestions={items}
              completeMethod={search}
            />

            <InputText
              className="recipe-form-input"
              placeholder="500"
              style={{ width: "70%" }}
              value={ingredient.quantity}
              type="number"
              min={1}
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
            type="button"
          >
            Click to add more Ingredients
          </Button>
        </div>
      </div>
    </Row>
  );
};

export default IngredientsList;
