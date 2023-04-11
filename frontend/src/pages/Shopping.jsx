import React from "react";
import AddedRecipes from "../components/shopping/AddedRecipes";
import { ShoppingProvider } from "../contexts/ShoppingContext";
import "../styles/shopping-list.css";

function Shopping() {
  return (
    <ShoppingProvider>
      <AddedRecipes />
    </ShoppingProvider>
  );
}

export default Shopping;
