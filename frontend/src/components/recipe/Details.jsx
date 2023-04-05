import { useState, useEffect } from 'react';
import CustomCard from '../shared/CustomCard';
import { RECIPE_DETAIL_ENDPOINT } from '../../config/constants';
import axios from 'axios';

function Details({ recipe_id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(RECIPE_DETAIL_ENDPOINT(recipe_id));
        setRecipe(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipe_id]);

  return (
    <CustomCard>
      {loading ? (
        <div>Loading...</div> // Replace this with your preferred loading animation
      ) : (
        <>Recipe details</>
      )}
    </CustomCard>
  );
}

export default Details;
