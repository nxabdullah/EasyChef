import { useContext } from "react";
import ShoppingContext from "../../contexts/ShoppingContext";

import CustomCard from "../shared/CustomCard";
import ShoppingListSkeleton from "./ShoppingListSkeleton";
import ShoppingListItem from "./ShoppingListItem";

function AddedRecipes() {
  const { loading, shoppingItems } = useContext(ShoppingContext);

  if (loading) {
    return (
      <CustomCard title="Added Recipes">
        <ShoppingListSkeleton />
      </CustomCard>
    );
  }

  return (
    <CustomCard title="Added Recipes">
      {shoppingItems.map((item) => (
        <ShoppingListItem key={item.recipe.id} item={item} />
      ))}
    </CustomCard>
  );
}

export default AddedRecipes;
