import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RECIPE_DETAIL_ENDPOINT } from "../config/constants";
import AccountContext from "../contexts/AccountContext";
import CustomCard from "../components/shared/CustomCard";
import RecipeForm from "../components/shared/RecipeForm";

function EditRecipe() {
  const { id } = useParams();
  const { account } = useContext(AccountContext);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(RECIPE_DETAIL_ENDPOINT(id));
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (recipe && recipe.creator !== account.username) {
    return <div>You are not the creator of this recipe!</div>;
  }

  return (
    <CustomCard title="Edit Recipe">
      <RecipeForm isEditing={true} recipe={recipe} />
    </CustomCard>
  );
}

export default EditRecipe;
