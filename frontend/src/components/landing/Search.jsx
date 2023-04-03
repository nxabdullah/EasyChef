import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../styles/search.css';

function Search() {
  return (
    <div class="row py-lg-5">
    <div class="col-lg-10 col-md-12 mx-auto">
      <h1 id="searchText" className='center'>What would you like to <span id="text-rotation"></span> today?</h1>
      <div class="search">
        <form action="search-page.html" class="d-flex">
          <div class="search-container w-100 mb-4 ms-2">
            <i class="fa fa-search fa-lg" id="search-input-icon"></i>
            ​<input id="search-bar" name="q" className="form-control cornerless w-100" type="search" placeholder="Search 100+ recipes" required />
          </div>

          <button class="btn btn-primary btn-primary-c" id="search-btn" type="submit">Search</button>

        </form>
      </div>
    </div>
  </div>

  );
}

export default Search;
