import { useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import axios from "axios";

function DeleteConfirmDialog({ recipe, onConfirm }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/recipes/${recipe.id}/`);
      onConfirm();
    } catch (error) {
      console.error("Error while deleting the recipe:", error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <button className="dropdown-item" onClick={handleDelete}>
        Delete
      </button>
      <ConfirmDialog
        header="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action is irreversible."
        visible={showDeleteDialog}
        onHide={() => setShowDeleteDialog(false)}
        accept={confirmDelete}
        reject={() => setShowDeleteDialog(false)}
        acceptLabel="Yes"
        rejectLabel="No"
        className="p-dialog--custom"
      />
    </>
  );
}

export default DeleteConfirmDialog;
