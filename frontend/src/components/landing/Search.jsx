// SELECTED FILTERS:
// ARROW KEY NAVIGATION
// SORT BY
import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/search.css';
import Select from 'react-select';
import Modal from 'react-modal';
import { GiAvocado, GiKnifeFork } from "react-icons/gi";
import { TbClockRecord } from "react-icons/tb";
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
  

  const RangeSlider = () => {
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
          max={120}
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
            120: "2 hrs+",
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
          Max Cook Time: {range[1] !== null ? range[1] + " mins" : 120}
        </Container>
      </Container>
    );
  };



  

  return (
  <Container class="row py-lg-5">
    <Container class="col-lg-10 col-md-12 mx-auto">
      <h1 id="searchText" className='center'>What would you like to <span id="text-rotation"></span> today?</h1>
      <Container class="search">
        <form class="d-flex">
          <Container class="search-container w-100 mb-4 ms-2">
            <i class="fa fa-search fa-lg" id="search-input-icon"></i>
            ​<Form.Control id="search-bar" name="q" className="form-control cornerless w-100" type="search" placeholder="Search 100+ recipes" value={searchQuery} onChange={onSearchChange} required />
          </Container>

        </form>
        <h3 class="text-center">Filters</h3>
        <Container class="search-filters">
          <Container id="diets-filter">
            <p>diet</p>
      <Button style={{
        color: '#3a9691',
        borderRadius: '5px',
        border: 'none',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '110px',
        height: '30px'
      }}  onClick={openModal}>Select...</Button>
          <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={{content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '50vw',
              height: 'auto',
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              padding: '20px'
            }}}
            contentLabel="Select Diets"
      > 
         <h3 style={{textAlign: 'center' }}>FILTERS</h3>
        <Row>
        <Col>
        <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', padding: '10px', borderRadius: '10px 10px 0 0' }}>
          Diet <GiAvocado style={{height: '25px'}}></GiAvocado>
        </h2>
        <Select
          options = {filteredDiets}
          value={diets.map(diet => ({ value: diet, label: diet }))}
          onChange={onDietsChange}
          isMulti
          menuPlacement="bottom"
          menuPortalTarget={document.body}
          closeMenuOnSelect = {false}
          styles={{
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
          }}
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
          styles={{
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
          }}
        />
        </Col>
        </Row>
        <Row>
        <Col>
        <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', padding: '10px', borderRadius: '10px 10px 0 0' }}>
          Cook Time <TbClockRecord style={{height: '25px'}}></TbClockRecord>
        </h2>
          <RangeSlider  value={cookTime}
            onChange={onCookTimeChange}> </RangeSlider>
        </Col>
        
        </Row>
        <Container style={{ textAlign: 'center' }}>
          <Button onClick={closeModal} style={{ backgroundColor: '#3a9691', color: 'white', border: 'none', borderRadius: '10px', padding: '0.5vw 1.7vw', cursor: 'pointer' }}>Close</Button>
        </Container>
      </Modal>               
          </Container>
        </Container>
      </Container>
   </Container>
  </Container>
  );
}

export default Search;
