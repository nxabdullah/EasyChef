// SELECTED FILTERS: ALMOST DONE GOTTA ADD BUTTON
import { React, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "../../styles/search.css";
import Select from "react-select";
import Modal from "react-modal";
import { GiAvocado, GiKnifeFork } from "react-icons/gi";
import { TbClockRecord, TbAdjustmentsHorizontal } from "react-icons/tb";
import { BiSearchAlt } from "react-icons/bi"
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { InputText } from "primereact/inputtext";

function Search({
  searchQuery,
  cuisines,
  diets,
  cookTime,
  onSearchChange,
  onCuisinesChange,
  onDietsChange,
  onCookTimeChange,
  onSearchSubmit,
  onPageChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  const selectionStyles = {
    container: (provided) => ({
      ...provided,
      margin: "20px 0",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "10px",
      border: "1px solid #ccc",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #ccc",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#3a9691" : "transparent",
      color: state.isSelected ? "white" : "#333",
      "&:hover": {
        backgroundColor: "#3a9691",
        color: "white",
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: "20px",
      backgroundColor: "#3a9691",
      color: "white",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      borderRadius: "0px 15px 15px 0px",
    }),
  };
  const [allDiets] = useState([
    { value: "Low Carb", label: "Low Carb" },
    { value: "Gluten-Free", label: "Gluten-Free" },
    { value: "Vegetarian", label: "Vegetarian" },
    { value: "Vegan", label: "Vegan" },
    { value: "Dairy-Free", label: "Dairy-Free" },
  ]);
  const [filteredDiets, setFilteredDiets] = useState(allDiets);

  useEffect(() => {
    // Filter out the selected options from the full list of options
    setFilteredDiets(
      allDiets.filter((option) => !diets.includes(option.value))
    );
  }, [diets]);

  const [allCuisines] = useState([
    { value: "Mediterranean", label: "Mediterranean" },
    { value: "Italian", label: "Italian" },
    { value: "American", label: "American" },
    { value: "Latin-American", label: "Latin-American" },
    { value: "South Asian", label: "South Asian" },
    { value: "Eastern European", label: "Eastern European" },
    { value: "Oceanic", label: "Oceanic" },
    { value: "South-East Asian", label: "South-East Asian" },
    { value: "Central African", label: "Central African" },
    { value: "Caribbean", label: "Caribbean"}
  ]);
  const [filteredCuisines, setFilteredCuisines] = useState(allCuisines);

  useEffect(() => {
    // Filter out the selected options from the full list of options
    setFilteredCuisines(
      allCuisines.filter((option) => !cuisines.includes(option.value))
    );
  }, [cuisines]);

  
  const selected = (filteredDiets, filteredCuisines, filteredCookTimes) => { 
    // const dietsSelected = filteredDiets.map((diet, index) => (
    //   <span className="selection mb-3" key={index}>
    //     <GiAvocado style={{ marginRight: "5px" }} />
    //     {diet} 
    //     <button
    //       className="filter-x"
    //       onClick={() => {
    //         onDietsChange(filteredDiets.filter((i) => i.label !== diet.label));
    //       }}
    //     >
    //       x
    //     </button>
    //   </span>
    // ));
    // // console.log(filteredDiets)
  
    return (
      <Container style={{ textAlign: "center" }}>
        {/* {dietsSelected} */}
        {filteredDiets.length > 0 && (
          <span className="selection">
            <GiAvocado style={{ marginRight: "5px" }} />
            {filteredDiets.join(", ")}
          </span>
        )}
        {filteredCuisines.length > 0 && (
          <span className="selection">
            <GiKnifeFork style={{ marginRight: "5px" }} />
            {filteredCuisines.join(", ")}
          </span>
        )}
        {(filteredCookTimes.length > 0 && filteredCookTimes[0] !== 0) ||
          (filteredCookTimes[1] !== 121 && (
            <span className="selection">
              <TbClockRecord style={{ marginRight: "5px" }} />
              {`${filteredCookTimes[0]} - ${filteredCookTimes[1]} mins`}
            </span>
          ))}
      </Container>
    );
  };

  const CookTimeSlider = () => {
    const [range, setRange] = useState(cookTime);

    const handleRangeChange = (values) => {
      if (values[0] > values[1]) {
        setRange([range[0], values[0]]);
      } else if (values[1] < values[0]) {
        setRange([values[1], range[1]]);
      } else {
        setRange(values);
      }
      onCookTimeChange(values);
    };

    const railStyle = {
      backgroundColor: "#ccc",
      height: "8px",
      borderRadius: "2px",
    };
    const trackStyle = {
      backgroundColor: "#3a9691",
      height: "8px",
      borderRadius: "2px",
    };
    const handleStyle = {
      borderColor: "#3a9691",
      height: "20px",
      width: "20px",
      marginLeft: "-8px",
      marginTop: "-8px",
      backgroundColor: "white",
    };
    const activeHandleStyle = {
      borderColor: "#3a9691",
      height: "20px",
      width: "20px",
      marginLeft: "-8px",
      marginTop: "-8px",
      backgroundColor: "#3a9691",
    };

    
    return (
      <Container>
        <Slider
          range
          value={range}
          onChange={handleRangeChange}
          min={0}
          max={121}
          step={5}
          dotStyle={{ height: 10, width: 10, alignContent: "center" }}
          railStyle={railStyle}
          trackStyle={[trackStyle]}
          handleStyle={[handleStyle, handleStyle]}
          activeHandleStyle={[activeHandleStyle, activeHandleStyle]}
          marks={{
            0: "0 mins",
            30: "30 mins",
            60: "1 hr",
            90: "1 hr 30 mins",
            121: "2 hrs+",
          }}
          style={{
            width: "45vw",
            marginLeft: "1vw",
            height: "3vw",
          }}
        />
        <Container>
          Min Cook Time: {range[0] !== null ? range[0] + " mins" : 0}
        </Container>
        <Container>
          Max Cook Time:{" "}
          {range[1] !== null
            ? range[1] >= 121
              ? "120+ mins"
              : range[1] + " mins"
            : 240}
        </Container>
      </Container>
    );
  };

  return (
    <Container class="row py-lg-5">
      <Container class="col-lg-10 col-md-12 mx-auto">
        <h1 id="searchText" className="animated-text center mt-4">
          What would you like to <span id="text-rotation"></span> today?
        </h1>
        <Container className="search">
        <Form onSubmit={onSearchSubmit}>
    <InputGroup className="w-100 d-flex mb-4">
      <Button
        type="submit"
        variant="outline-secondary"
        id="button-addon1"
        style={{
          color: "white",
          borderRadius: "5px 0px 0px 5px",
          border: "none",
          backgroundColor: "#3a9691",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          width: "55px",
          height: "50px",
          zIndex: "0",
        }}
      >
        <BiSearchAlt style={{ fontSize: "24px" }} />
      </Button>
      <InputText
        id="search-bar"
        name="q"
        placeholder="Search 100+ recipes"
        value={searchQuery}
        onChange={onSearchChange}
        className="form-control cornerless flex-grow-1 mb-4 font-alv"
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
        style={{
          color: "white",
          borderRadius: "0px 5px 5px 0px",
          border: "none",
          backgroundColor: "#3a9691",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          width: "80px",
          height: "50px",
          zIndex: "0"
        }}
        onClick={openModal}
      >
        <TbAdjustmentsHorizontal style={{ fontSize: "24px" }} />
      </Button>
    </InputGroup>
  </Form>

          <Container>{selected(diets, cuisines, cookTime)}</Container>
        </Container>
        <Container class="search-filters">
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
                width: "50vw",
                height: "auto",
                border: "none",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                padding: "20px",
                zIndex: "9999"
              },
            }}
            contentLabel="Select Diets"
          >
            <h3 style={{ textAlign: "center" }}>FILTERS</h3>
            <Row>
              <Col>
                <h2
                  style={{
                    textAlign: "center",
                    backgroundColor: "#3a9691",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  Diet <GiAvocado style={{ height: "25px" }}></GiAvocado>
                </h2>
                <Select
                  options={filteredDiets}
                  value={diets.map((diet) => ({ value: diet, label: diet }))}
                  onChange={onDietsChange}
                  isMulti
                  menuPlacement="bottom"
                  menuPortalTarget={document.body}
                  closeMenuOnSelect={false}
                  styles={selectionStyles}
                />
              </Col>
              <Col>
                <h2
                  style={{
                    textAlign: "center",
                    backgroundColor: "#3a9691",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  Cuisine <GiKnifeFork style={{ height: "25px" }}></GiKnifeFork>
                </h2>
                <Select
                  options={filteredCuisines}
                  value={cuisines.map((cuisine) => ({
                    value: cuisine,
                    label: cuisine,
                  }))}
                  onChange={onCuisinesChange}
                  isMulti
                  menuPlacement="bottom"
                  menuPortalTarget={document.body}
                  closeMenuOnSelect={false}
                  styles={selectionStyles}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2
                  style={{
                    textAlign: "center",
                    backgroundColor: "#3a9691",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  Cook Time{" "}
                  <TbClockRecord style={{ height: "25px" }}></TbClockRecord>
                </h2>
                <CookTimeSlider></CookTimeSlider>
              </Col>
            </Row>
            <Container style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  onPageChange();
                  closeModal();
                }}
                style={{
                  backgroundColor: "#3a9691",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "0.5vw 1.7vw",
                  cursor: "pointer",
                }}
              >
                Close
              </Button>
            </Container>
          </Modal>
        </Container>
      </Container>
    </Container>
  );
}

export default Search;
