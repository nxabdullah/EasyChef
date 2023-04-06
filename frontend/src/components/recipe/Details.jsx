import { useState, useEffect } from "react";
import CustomCard from "../shared/CustomCard";
import { RECIPE_DETAIL_ENDPOINT } from "../../config/constants";
import axios from "axios";
import DetailsHeader from "./DetailsHeader";
import DetailsIngredients from "./DetailsIngredients";
import DetailsSteps from "./DetailsSteps";
import "../../styles/recipe-details.css";

function Details({ recipe_id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(RECIPE_DETAIL_ENDPOINT(recipe_id));
        setRecipe(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe_id]);

  if (loading) {
    return <div>Loading...</div>; // Replace this with your preferred loading animation
  }

  return (
    <>
      <CustomCard bodyClass={`recipe-detail`}>
        <DetailsHeader recipe={recipe} />
        <hr className="mt-4" />
        <DetailsIngredients ingredients={recipe && recipe.ingredients_list} />
        <hr className="mt-4" />
        <DetailsSteps steps={recipe && recipe.steps} />
      </CustomCard>
    </>
  );
}

export default Details;
