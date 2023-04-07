// SELECTED FILTERS: ALMOST DONE GOTTA ADD BUTTON
// ARROW KEY NAVIGATION
// PAGINATION
import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import '../../styles/search.css';
import Select from 'react-select';
import Modal from 'react-modal';
import { GiAvocado, GiKnifeFork } from "react-icons/gi";
import { TbClockRecord, TbAdjustmentsHorizontal } from "react-icons/tb";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';



function Search({
    searchQuery,
    cuisines,
    diets,
    cookTime, 
    onSearchChange,
    onCuisinesChange,
    onDietsChange,
    onCookTimeChange,
   }) {
  

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const selectionStyles={
    container: (provided) => ({
      ...provided,
      margin: '20px 0',
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: '10px',
      border: '1px solid #ccc',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #ccc',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3a9691' : 'transparent',
      color: state.isSelected ? 'white' : '#333',
      '&:hover': {
        backgroundColor: '#3a9691',
        color: 'white',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '10px',
    }),
    multiValue: (provided) => ({
      ...provided,
      borderRadius: '20px',
      backgroundColor: '#3a9691',
      color: 'white',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      borderRadius: '0px 15px 15px 0px'
    }),
  }
  const [allDiets] = useState([
    { value: 'Low Carb', label: 'Low Carb' },
    { value: 'Gluten-Free', label: 'Gluten-Free' },
    { value: 'Vegetarian', label: 'Vegetarian' },
  ]);
  const [filteredDiets, setFilteredDiets] = useState(allDiets);

  useEffect(() => {
    // Filter out the selected options from the full list of options
    setFilteredDiets(allDiets.filter(option => !diets.includes(option.value)));
  }, [diets]);

  const [allCuisines] = useState([{ value: 'Middle Eastern', label: 'Middle Eastern' },
  { value: 'Italian', label: 'Italian' }, 
  { value: 'Asian', label: 'Asian' },
  { value: 'Indian', label: 'Indian' },
  { value: 'Sudanese', label: 'Sudanese' },
  { value: 'Jamaican', label: 'Jamaican' },
  { value: 'French', label: 'French' }, ]);
  const [filteredCuisines, setFilteredCuisines] = useState(allCuisines);

  useEffect(() => {
    // Filter out the selected options from the full list of options
    setFilteredCuisines(allCuisines.filter(option => !cuisines.includes(option.value)));
  }, [cuisines]);

  
  const selected = (filteredDiets, filteredCuisines, filteredCookTimes) => {
    
    const dietsSelected = filteredDiets.map((diet, index) => ( //set dietsSelected to span elements of each array in filteredDiets
      <span className="selection mb-3" key={index}> {/* Set the key as we are mapping */}
        <GiAvocado style={{ marginRight: "5px" }} />
        {diet} 
        <button
          className="filter-x"
          onClick={() => {
            const newFilteredDiets = filteredDiets.filter((i) => i !== diet);
            console.log(newFilteredDiets)
            onDietsChange(newFilteredDiets);
          }}
        >
          x
        </button>
      </span>
    ));
    console.log(filteredDiets)
  
    return (
      <Container style={{ textAlign: "center" }}>
        {/* {dietsSelected} */}
        {filteredDiets.length > 0 && (
          <span className="selection mb-3">
            <GiAvocado style={{ marginRight: "5px" }} />
            {filteredDiets.join(", ")}
          </span>
        )}
        {filteredCuisines.length > 0 && (
          <span className="selection mb-3">
            <GiKnifeFork style={{ marginRight: "5px" }} />
            {filteredCuisines.join(", ")}
          </span>
        )}
        {filteredCookTimes.length > 0 && filteredCookTimes[0] !== 0 || filteredCookTimes[1] !== 121 && (
          <span className="selection mb-3">
          <TbClockRecord style={{ marginRight: "5px" }} />
            {`${filteredCookTimes[0]} - ${filteredCookTimes[1]} mins`}
          </span>
        )}
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
    
    const railStyle = { backgroundColor: "#ccc", height: "8px", borderRadius: "2px" };
    const trackStyle = { backgroundColor: "#3a9691", height: "8px", borderRadius: "2px" };
    const handleStyle = { borderColor: "#3a9691", height: "20px", width: "20px", marginLeft: "-8px", marginTop: "-8px", backgroundColor: "white" };
    const activeHandleStyle = { borderColor: "#3a9691", height: "20px", width: "20px", marginLeft: "-8px", marginTop: "-8px", backgroundColor: "#3a9691" };
    
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
        Max Cook Time: {range[1] !== null ? (range[1] >= 121 ? "120+ mins" : range[1] + " mins") : 240}
        </Container>
      </Container>
    );
  };



  

  return (
  <Container class="row py-lg-5">
    <Container class="col-lg-10 col-md-12 mx-auto">
      <h1 id="searchText" className='center mt-4'>What would you like to <span id="text-rotation"></span> today?</h1>
      <Container class="search">
        <InputGroup class="w-100 d-flex mb-4">
          <i class="fa fa-search fa-lg ms-5 mt-4" id="search-input-icon"></i>
          <Form.Control id="search-bar" name="q" className="form-control cornerless flex-grow-1 mb-4 ms-2" type="search" placeholder="Search 100+ recipes" value={searchQuery} onChange={onSearchChange} required />
            <Button variant= "outline-secondary" id="button-addon2" style={{
                color: 'white',
                borderRadius: '0px 5px 5px 0px',
                border: 'none',
                backgroundColor: '#3a9691',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                width: '80px',
                height: '50px',
                zIndex: '0',
            }} onClick={openModal}> 
              <TbAdjustmentsHorizontal style={{ fontSize: "24px" }}></TbAdjustmentsHorizontal>
            </Button>
        </InputGroup>
        <Container>
      {selected(diets, cuisines, cookTime)}
    </Container>

      </Container>
      <Container class="search-filters">
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={{content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            height: 'auto',
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            padding: '20px',
          }}}
          contentLabel="Select Diets"> 
        <h3 style={{textAlign: 'center' }}>FILTERS</h3>
        <Row>
          <Col>
            <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', padding: '10px', borderRadius: '10px 10px 0 0' }}>Diet <GiAvocado style={{height: '25px'}}></GiAvocado></h2>
            <Select
              options = {filteredDiets}
              value={diets.map(diet => ({ value: diet, label: diet }))}
              onChange={onDietsChange}
              isMulti
              menuPlacement="bottom"
              menuPortalTarget={document.body}
              closeMenuOnSelect = {false}
              styles={selectionStyles}
            />
          </Col>
          <Col>
            <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', padding: '10px', borderRadius: '10px 10px 0 0' }}>
              Cuisine <GiKnifeFork style={{height: '25px'}}></GiKnifeFork>
            </h2>
            <Select
              options = {filteredCuisines}
              value={cuisines.map(cuisine => ({ value: cuisine, label: cuisine }))}
              onChange={onCuisinesChange}
              isMulti
              menuPlacement="bottom"
              menuPortalTarget={document.body}
              closeMenuOnSelect = {false}
              styles={selectionStyles}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', padding: '10px', borderRadius: '10px 10px 0 0' }}>
              Cook Time <TbClockRecord style={{height: '25px'}}></TbClockRecord>
            </h2>
            <CookTimeSlider></CookTimeSlider>
          </Col>
        </Row>
        <Container style={{ textAlign: 'center' }}>
          <Button onClick={closeModal} style={{ backgroundColor: '#3a9691', color: 'white', border: 'none', borderRadius: '10px', padding: '0.5vw 1.7vw', cursor: 'pointer' }}>Close</Button>
        </Container>
      </Modal>               
    </Container>
  </Container>
</Container>

  );
}

export default Search;
