
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/search.css';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {default as ReactSelect} from 'react-select';


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
          <div class="filter">
            <p>diet</p>
            <ReactSelect
            options={[{value: 'Low Carb', label: 'Low Carb'},
                      {value: 'Gluten-Free', label: 'Gluten-Free'},
                      {value: 'Vegetarian', label: 'Vegetarian'},
                  ]}
                  isMulti
                  value={diets}
                  onChange={onDietsChange}
                  
            > </ReactSelect>
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
