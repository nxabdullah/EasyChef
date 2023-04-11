import { useContext } from "react";
import ShoppingContext from "../../contexts/ShoppingContext";
import CustomCard from "../shared/CustomCard";
import IngredientsSkeleton from "./IngredientsSkeleton";

function ShoppingList() {
  const { ingredients, ingredientsLoading } = useContext(ShoppingContext);

  if (ingredientsLoading) {
    return (
      <CustomCard title="Shopping List">
        <IngredientsSkeleton />
      </CustomCard>
    );
  }

  if (ingredients.length === 0) {
    return;
  }

  return (
    <CustomCard title="Shopping List">
      <ul className="list-group pb-4">
        {ingredients.map((ingredient) => (
          <li className="list-group-item pt-3">
            <span className="text-333">{ingredient.name}</span>{" "}
            <span className="quantity">{ingredient.quantity} g</span>
          </li>
        ))}
      </ul>
    </CustomCard>
  );
}

export default ShoppingList;
