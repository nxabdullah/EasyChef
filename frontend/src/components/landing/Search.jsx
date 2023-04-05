
import { React, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/search.css';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
// import {default as ReactSelect} from 'react-select';
import Select from 'react-select';
import Modal from 'react-modal';



function Search({
    searchQuery,
    cuisines,
    diets,
    minCookTime,
    maxCookTime,
    onSearchChange,
    onCuisinesChange,
    onDietsChange,
    onMinCookTimeChange,
    onMaxCookTimeChange,
   }) {
  // Generate an array of options for maxCookTime based on the selected minCookTime
  const generateMaxCookTimeOptions = () => {
     let options = [<option key="" value="" selected>--</option>];
    for (let i = 0; i <= 120; i += 15) { //somehow does not work if i = minCookTime and we iterate from there
      if (i > minCookTime) {
        options.push(<option key={i} value={i}>{i} mins</option>);
      }
    }
    options.push(<option key="121" value="121">More than 2 hrs</option>)
    return options;
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  return (
  <div class="row py-lg-5">
    <div class="col-lg-10 col-md-12 mx-auto">
      <h1 id="searchText" className='center'>What would you like to <span id="text-rotation"></span> today?</h1>
      <div class="search">
        <form class="d-flex">
          <div class="search-container w-100 mb-4 ms-2">
            <i class="fa fa-search fa-lg" id="search-input-icon"></i>
            ​<Form.Control id="search-bar" name="q" className="form-control cornerless w-100" type="search" placeholder="Search 100+ recipes" value={searchQuery} onChange={onSearchChange} required />
          </div>

          {/* <Button class="btn btn-primary btn-primary-c" id="search-btn" type="submit" onClick={() => {}}>Search</Button> */} 

        </form>
        <h3 class="text-center">Filters</h3>
        <div class="search-filters">
          {/* <div class="filter">
            <p>sort by</p>
      
              <select class="form-input">
                  <option value="rel" selected>Relevance</option>
                  <option value="alp">Alphabetical</option>
                  <option value="revalp">Reverse Alphabetical</option>
              </select>                    

          </div> */}
          <div class="filter" multiple value={cuisines} onChange={onCuisinesChange}>
            <p> cuisine </p>
            <select class="form-input">
              <option value="">--</option>
              <option value="1">Middle Eastern</option>
              <option value="2">Italian</option>
              <option value="4">Asian</option>
              <option value="5">Indian</option>
              <option value="6">Sudanese</option>
              <option value="7">Jamaican</option>
              <option value="8">French</option> {/*Add options when add recipe complete*/}
            </select>  
          </div>
          <div id="diets-filter">
            <p>diet</p>
      <button onClick={openModal}>Open Modal</button>
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
          width: '30vw',
          height: 'auto',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          padding: '20px'
        }}}
        contentLabel="Select Diets"
      >
        <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', padding: '10px', borderRadius: '10px 10px 0 0' }}>
          Select Diets
        </h2>
        <Select
          options={[{ value: 'Low Carb', label: 'Low Carb' },
          { value: 'Gluten-Free', label: 'Gluten-Free' }, 
          { value: 'Vegetarian', label: 'Vegetarian' }, ]}
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
        <div style={{ textAlign: 'center' }}>
          <button onClick={closeModal} style={{ backgroundColor: '#3a9691', color: 'white', border: 'none', borderRadius: '10px', padding: '0.5vw 1.7vw', cursor: 'pointer' }}>Close</button>
        </div>
      </Modal>
            {/* <button onClick={openModal}>Open Modal</button>
            <Modal 
            isOpen={isOpen} 
            onRequestClose={closeModal}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '30vw',
                height: '20vw',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                padding: '20px'
              }
            }}
            >
                <h2 style={{ textAlign: 'center', backgroundColor: '#3a9691', color: 'white', top: '0'}}>Select diets</h2>
                <Select options={[{value: 'Low Carb', label: 'Low Carb'},
                      {value: 'Gluten-Free', label: 'Gluten-Free'},
                      {value: 'Vegetarian', label: 'Vegetarian'},
                  ]}
                  onChange={onDietsChange}

                  isMulti
                   />
                  <button onClick={closeModal}>Close</button>
            </Modal> */}
            {/* <ReactSelect
            onChange={onDietsChange}
            options={[{value: 'Low Carb', label: 'Low Carb'},
                      {value: 'Gluten-Free', label: 'Gluten-Free'},
                      {value: 'Vegetarian', label: 'Vegetarian'},
                  ]}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={true}
                  menuPlacement="bottom"
                  menuPosition='fixed'
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: 5,
                      borderRadius: 5,
                    }),
                    toggle: (provided) => ({
                      ...provided,
                      height: 5,
                      width: 5,
                    }),
                  }}
            > </ReactSelect> */}
            {/* <select class="form-input">
                <option value="" selected>--</option>
                <option value="Low Carb">Low Carb</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Vegetarian">Vegetarian</option> {/*Add options when add recipe complete
            </select>    */}
                             
          </div>
          <div class="filter" multiple value={minCookTime} onChange={onMinCookTimeChange}>
            <p>min. cook time</p>
      
              <select class="form-input">
                  <option value="0" selected>--</option>
                  <option value="1">Less than 15 mins</option>
                  <option value="15">15 mins</option>
                  <option value="30">30 mins</option>
                  <option value="45">45 mins</option>
                  <option value="60">1 hr</option>
                  <option value="120">2 hrs</option>

              </select>                    

          </div>
          <div class="filter" multiple value={maxCookTime} onChange={onMaxCookTimeChange}>
            <p>max. cook time</p>
            
              <select class="form-input">
              {generateMaxCookTimeOptions()}
              </select>                    

          </div>
        </div>
      </div>
   </div>
  </div>
  );
}

export default Search;
