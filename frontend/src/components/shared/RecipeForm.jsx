import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CustomMultiSelect from "./CustomMultiSelect";
import IngredientsList from "../recipeCreate/IngredientsList";
import RecipeStep from "../recipeCreate/RecipeStep";

const RecipeCusines = ["Chinese", "Italian", "Mexican", "Japanese", "Indian"];
const RecipeDiets = [
  "Vegan",
  "Vegetarian",
  "Halal",
  "Keto",
  "Paleo",
  "Gluten-free",
  "Low-carb",
  "Pescatarian",
  "Mediterranean",
  "DASH",
];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cuisines: Yup.array().required("At least one cuisine is required"),
  serving_size: Yup.number()
    .positive("Serving size must be a positive number")
    .required("Serving size is required"),
  prep_time: Yup.number()
    .positive("Prep time must be a positive number")
    .required("Prep time is required"),
  cook_time: Yup.number()
    .positive("Cook time must be a positive number")
    .required("Cook time is required"),
  diets: Yup.array().required("At least one diet is required"),
});

function RecipeForm() {
  const [recipeCuisines, setRecipeCuisines] = useState(RecipeCusines);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      cuisines: [],
      serving_size: null,
      prep_time: null,
      cook_time: null,
      diets: [],
      ingredients: [{ name: "", quantity: "" }],
      steps: [
        {
          description: "",
          prep_time: "",
          cook_time: "",
          images: [],
          videos: [],
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form data:", values);
    },
  });

  const handleCuisinesChange = (e) => {
    formik.setFieldValue("cuisines", e.value);
  };

  const handleDietsChange = (e) => {
    formik.setFieldValue("diets", e.value);
  };

  const addIngredient = () => {
    formik.setFieldValue("ingredients", [
      ...formik.values.ingredients,
      { name: "", quantity: "" },
    ]);
  };

  const handleIngredientChange = (index, fieldName, value) => {
    const updatedIngredients = formik.values.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [fieldName]: value } : ingredient
    );
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  const handleStepChange = (index, fieldName, value) => {
    const updatedSteps = formik.values.steps.map((step, i) =>
      i === index ? { ...step, [fieldName]: value } : step
    );
    formik.setFieldValue("steps", updatedSteps);
  };

  const addStep = () => {
    formik.setFieldValue("steps", [
      ...formik.values.steps,
      {
        description: "",
        prep_time: "",
        cook_time: "",
        images: [],
        videos: [],
      },
    ]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Row>
        <div className="col-md-12 mt-4">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <br />
          <InputText
            id="name"
            placeholder="Blueberry Banana Pancakes"
            className="recipe-form-input"
            {...formik.getFieldProps("name")}
            autoComplete="off"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-danger">{formik.errors.name}</div>
          ) : null}
        </div>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <InputTextarea
            rows={3}
            autoResize
            className="recipe-form-input"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-danger">{formik.errors.description}</div>
          ) : null}
        </div>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label htmlFor="cuisines" className="form-label">
            Cuisines
          </label>
          <CustomMultiSelect
            options={recipeCuisines}
            value={formik.values.cuisines}
            onChange={handleCuisinesChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.cuisines}
            touched={formik.touched.cuisines}
            fieldName="cuisines"
            label="Cuisines"
            addNewItemLabel="Click here to add a cuisine."
          />
          {formik.touched.cuisines && formik.errors.cuisines ? (
            <div className="text-danger">{formik.errors.cuisines}</div>
          ) : null}
        </div>
      </Row>

      <Row className="mt-4">
        <Col>
          <label className="form-label">Serving Size</label>
          <br />
          <InputText
            className="recipe-input-form"
            placeholder="2"
            type="number"
            {...formik.getFieldProps("serving_size")}
          />
          {formik.touched.serving_size && formik.errors.serving_size ? (
            <div className="text-danger">{formik.errors.serving_size}</div>
          ) : null}
        </Col>

        <Col>
          <label className="form-label">Prep Time (Minutes)</label>
          <br />
          <InputText
            className="recipe-input-form"
            placeholder="20"
            type="number"
            {...formik.getFieldProps("prep_time")}
          />
          {formik.touched.prep_time && formik.errors.prep_time ? (
            <div className="text-danger">{formik.errors.prep_time}</div>
          ) : null}
        </Col>

        <Col>
          <label className="form-label">Cook Time (Minutes)</label>
          <br />
          <InputText
            className="recipe-input-form"
            placeholder="15"
            type="number"
            {...formik.getFieldProps("cook_time")}
          />
          {formik.touched.cook_time && formik.errors.cook_time ? (
            <div className="text-danger">{formik.errors.cook_time}</div>
          ) : null}
        </Col>
      </Row>

      <Row>
        <div className="col-md-12 mt-4">
          <label htmlFor="diets" className="form-label">
            Diets
          </label>
          <CustomMultiSelect
            options={RecipeDiets}
            value={formik.values.diets}
            onChange={handleDietsChange}
            onBlur={formik.handleBlur}
            errors={formik.errors.diets}
            touched={formik.touched.diets}
            fieldName="diets"
            label="Diets"
            addNewItemLabel="Click here to add a diet."
          />
          {formik.touched.diets && formik.errors.diets ? (
            <div className="text-danger">{formik.errors.diets}</div>
          ) : null}
        </div>
      </Row>

      <IngredientsList
        ingredients={formik.values.ingredients}
        handleIngredientChange={handleIngredientChange}
        addIngredient={addIngredient}
      />

      <Row className="mt-4">
        <label className="mb-2">
          Please enter all of the steps for this recipe
        </label>
        {formik.values.steps.map((step, index) => (
          <>
            <label className="mb-3 mt-3">Step {index + 1}</label>
            <RecipeStep
              key={index}
              step={step}
              handleStepChange={(fieldName, value) =>
                handleStepChange(index, fieldName, value)
              }
              index={index}
            />
          </>
        ))}
        <div className="col-lg-3 col-md-4 col-sm-7">
          <Button
            className="mt-4"
            onClick={addStep}
            severity="secondary"
            text
            style={{ fontSize: "13px", height: "35px" }}
          >
            Click to add more steps
          </Button>
        </div>
      </Row>

      <Button type="submit" className="btn btn-primary-c mt-4 mb-4 float-end">
        Save
      </Button>
    </form>
  );
}

export default RecipeForm;
