import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// TODO: the button can be much smoother
// and we can add some animation
// placeholder should be grayer

/*
            {loading
              ? "Processing..."
              : inShoppingList
              ? "Update Shopping List"
              : "Add To Shopping List"}
*/

/*
serving size of 0 to remove? or button?
*/

function DetailsShopping({ servingSize, recipeId }) {
  const [selectedServingSize, setSelectedServingSize] = useState(null);
  const [inShoppingList, setInShoppingList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [updated, setUpdated] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    fetchServingSize();
  }, []);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Your shopping list was updated!",
      life: 2000,
    });
  };

  const fetchServingSize = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/shopping_list/recipes/${recipeId}/`
      );
      if (response.data.serving_size) {
        setSelectedServingSize(response.data.serving_size);
        setInShoppingList(true);
      } else {
        setSelectedServingSize(servingSize);
        setInShoppingList(false);
      }
    } catch (error) {
      console.error("Error fetching serving size:", error);
    }
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      await axios.put("http://localhost:8000/api/shopping_list/recipes/", {
        recipe_id: recipeId,
        serving_size: selectedServingSize,
      });

      // setSuccessMessage(
      //   inShoppingList
      //     ? "Serving size updated."
      //     : "Recipe added to shopping list."
      // );
      setInShoppingList(true);
      setUpdated(false);
      showSuccess();
    } catch (error) {
      console.error("Error updating shopping list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-4 recipe-detail__ingredients">
      <Toast ref={toast} />
      <h3>
        {inShoppingList
          ? "This recipe is in your shopping list."
          : "Like this recipe? Add it to your shopping list"}
      </h3>
      {inShoppingList && (
        <p className="text-secondary">You can update the serving size below</p>
      )}
      {/* {successMessage && <p className="text-success">{successMessage}</p>} */}

      <div className="col-8">
        <label className="form-label">Enter Serving Size</label> <br />
        <InputNumber
          value={selectedServingSize}
          // onValueChange={(e) => {
          //   setSelectedServingSize(e.value);
          // }}
          onChange={(e) => {
            setUpdated(true);
            setSelectedServingSize(e.value);
          }}
          min={1}
          placeholder={servingSize}
          showButtons
          //onClick={() => setUpdated(true)}
        />
        <div className="mt-4">
          <button
            className="btn btn-primary btn-primary-c p-button"
            id="shop-ingredients"
            rounded
            onClick={handleButtonClick}
            disabled={
              loading ||
              (!updated && inShoppingList) ||
              selectedServingSize === null
            }
          >
            {inShoppingList ? "Update Shopping List" : "Add To Shopping List"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailsShopping;
