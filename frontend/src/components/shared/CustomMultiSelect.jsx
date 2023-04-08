import { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const CustomMultiSelect = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  errors,
  touched,
  fieldName,
  addNewItemLabel,
}) => {
  const [localOptions, setLocalOptions] = useState(options);
  const [newItemDialog, setNewItemDialog] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [showAddError, setShowAddError] = useState(false);

  const showNewItemDialog = () => {
    setNewItemDialog(true);
  };

  const hideNewItemDialog = () => {
    setNewItemDialog(false);
  };

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const addNewItem = () => {
    // if item is in localOptions, don't add it
    if (localOptions.find((item) => item === newItem)) {
      setShowAddError(true);
      return;
    }

    setLocalOptions([...localOptions, newItem]);
    onChange({ value: [...value, newItem] }); // Update this line
    setNewItem("");
    hideNewItemDialog();
    setShowAddError(false);
  };

  const newItemDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" onClick={hideNewItemDialog} />
      <Button label="Add" icon="pi pi-check" onClick={addNewItem} />
    </>
  );

  return (
    <>
      <label htmlFor={fieldName} className="form-label"></label>
      <MultiSelect
        id={fieldName}
        options={localOptions}
        display="chip"
        placeholder={`Select ${label}`}
        // maxSelectedLabels={3}
        className="recipe-form-input"
        value={value}
        onChange={onChange} // Update this line
        onBlur={onBlur}
      />
      <label className="small mt-2">
        Can't find what you're looking for?{" "}
        <u className="form-add-link" onClick={showNewItemDialog}>
          {addNewItemLabel}
        </u>
      </label>
      {touched && errors ? <div className="text-danger">{errors}</div> : null}

      <Dialog
        header={`Add New ${label}`}
        visible={newItemDialog}
        onHide={hideNewItemDialog}
        footer={newItemDialogFooter}
      >
        <div className="p-fluid">
          {showAddError && (
            <p className="text-danger">Item already in the list.</p>
          )}
          <div className="p-field">
            <label htmlFor="newItem">{`${label} Name`}</label>
            <InputText
              id="newItem"
              value={newItem}
              onChange={handleNewItemChange}
              autoComplete="off"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CustomMultiSelect;
