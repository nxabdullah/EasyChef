import { createContext, useState, useEffect } from "react";
import axios from "axios";
import useAuthToken from "../hooks/useAuthToken";

const ShoppingContext = createContext();
// structure of shoppingItems:
// [{recipe: {}, serving_size: 1}, {recipe: {}, serving_size: 5}, ...]
export const ShoppingProvider = ({ children }) => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // required to make requests to the backend
  useAuthToken();

  // load the recipes
  // GET http://localhost:8000/api/shopping_list/recipes
  const fetchShoppingList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/shopping_list/recipes/"
      );
      setShoppingItems(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShoppingList();
    setLoading(false);
  }, []);

  const updateServingSize = async (recipeId, servingSize) => {
    try {
      await axios.put("http://localhost:8000/api/shopping_list/recipes/", {
        recipe_id: recipeId,
        serving_size: servingSize,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const increaseServingSize = (recipeId) => {
    const updatedItems = shoppingItems.map((item) => {
      if (item.recipe.id === recipeId) {
        const updatedServingSize = item.serving_size + 1;
        updateServingSize(recipeId, updatedServingSize);
        return { ...item, serving_size: updatedServingSize };
      }
      return item;
    });

    setShoppingItems(updatedItems);
  };

  const decreaseServingsSize = (recipeId) => {
    const updatedItems = shoppingItems.map((item) => {
      if (item.recipe.id === recipeId && item.serving_size > 1) {
        const updatedServingSize = item.serving_size - 1;
        updateServingSize(recipeId, updatedServingSize);
        return { ...item, serving_size: updatedServingSize };
      }
      return item;
    });

    setShoppingItems(updatedItems);
  };

  return (
    <ShoppingContext.Provider
      value={{
        shoppingItems,
        loading,
        increaseServingSize,
        decreaseServingsSize,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
