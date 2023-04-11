import { useContext, useState } from "react";
import ShoppingContext from "../../contexts/ShoppingContext";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config/constants";
import { Button } from "primereact/button";

function ShoppingListItem({ item }) {
  const { setShoppingItems } = useContext(ShoppingContext); // will use to edit shopping items
  const [servingSize, setServingSize] = useState(item.serving_size);

  return (
    <div className="d-flex flex-row mb-4">
      <div className="p-2 me-2">
        <img
          src={item.recipe.images[0] && BASE_URL + item.recipe.images[0].image}
          className="small-recipe-pic rounded-3"
          alt="recipe pic"
        />
      </div>
      <div className="p-2">
        <h4 className="mb-0">
          <Link
            to={`/recipes/${item.recipe.id}`}
            className="link-dark text-decoration-none"
          >
            {item.recipe.name}
          </Link>
        </h4>
        <span className="date mt-0"></span>
        <div className="mt-2">
          <Button icon="pi pi-minus" className="serving-btn" rounded />
          <span className="me-2 ms-2 text-333 text-serving">
            {servingSize} servings
          </span>
          <Button icon="pi pi-plus" className="serving-btn" rounded />
        </div>
      </div>
    </div>
  );
}

export default ShoppingListItem;
