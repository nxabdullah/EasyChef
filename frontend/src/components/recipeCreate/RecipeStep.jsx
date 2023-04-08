import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Col, Row } from "react-bootstrap";

// plan is that images and videos will be passed as a list of
// integers, which are the IDs of the images and videos
// from the media component
function RecipeStep() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  return (
    <>
      <Col md={12}>
        <InputTextarea
          autoResize
          rows={2}
          id="step-1"
          className="recipe-form-input"
          placeholder="Step 1"
        />
      </Col>

      <Row className="mt-2">
        <Col md={4}>
          <label>Prep Time (Minutes)</label>
          <InputText placeholder="20" className="recipe-form-input" />
        </Col>

        <Col md={4}>
          <label>Cook Time (Minutes)</label>
          <InputText placeholder="20" className="recipe-form-input" />
        </Col>
      </Row>
    </>
  );
}

export default RecipeStep;
