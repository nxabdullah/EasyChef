import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import useAuthToken from "../hooks/useAuthToken";

const ShoppingContext = createContext();
// structure of shoppingItems:
// [{recipe: {}, serving_size: 1}, {recipe: {}, serving_size: 5}, ...]
export const ShoppingProvider = ({ children }) => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]); // [{name: IngredientName, quantity}, {}, ...
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const hasMountedRef = useRef(false); // prevent the issues with strict mode (may not need it now tho)

  // required to make requests to the backend
  useAuthToken();

  // Load the Ingredients
  // Shopping list contain results: [{name: IngredientName, quantity}, {}, ...]
  const fetchIngredients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/shopping_list/"
      );
      setIngredients(response.data.results);
      setIngredientsLoading(false);
    } catch (error) {
      console.error(error);
      setIngredientsLoading(false);
    }
  };

  useEffect(() => {
    setIngredientsLoading(true);
    fetchIngredients();
    setIngredientsLoading(false);
  }, [shoppingItems]);

  // load the recipes
  // GET http://localhost:8000/api/shopping_list/recipes
  const fetchShoppingList = async (cursor = null) => {
    try {
      setLoading(true);
      const response = await axios.get(
        cursor
          ? `http://localhost:8000/api/shopping_list/recipes/?cursor=${cursor}`
          : "http://localhost:8000/api/shopping_list/recipes/"
      );

      if (response.data.next) {
        setNextCursor(response.data.next.split("=")[1]);
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setShoppingItems((prevItems) => [...prevItems, ...response.data.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const loadMoreRecipes = () => {
    fetchShoppingList(nextCursor);
  };

  useEffect(() => {
    if (!hasMountedRef.current) {
      fetchShoppingList();
      hasMountedRef.current = true;
    }
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

  const decreaseServingSize = (recipeId) => {
    const updatedItems = shoppingItems.map((item) => {
      if (item.recipe.id === recipeId && item.serving_size > 0) {
        const updatedServingSize = item.serving_size - 1;
        updateServingSize(recipeId, updatedServingSize);
        return { ...item, serving_size: updatedServingSize };
      }
      return item;
    });

    setShoppingItems(updatedItems);
  };

  const deleteRecipeFromBackend = async (recipeId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/shopping_list/recipes/${recipeId}/`
      );

      console.log("Shopping item successfully deleted");
    } catch (error) {
      console.error("Error deleting shopping item", error);
    }
  };

  const deleteRecipe = (item) => {
    setShoppingItems(
      shoppingItems.filter((i) => i.recipe.id !== item.recipe.id)
    );

    deleteRecipeFromBackend(item.recipe.id);
  };

  return (
    <ShoppingContext.Provider
      value={{
        shoppingItems,
        loading,
        increaseServingSize,
        decreaseServingSize,
        ingredients,
        ingredientsLoading,
        deleteRecipe,
        hasMore,
        loadMoreRecipes,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
