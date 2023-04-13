import React, { useState, useContext } from "react";
import SearchContext from "../../contexts/SearchContext";
import FilterModal from "./FilterModal";
import CardRenderer from "./CardRenderer";

function NewSearch() {
  const { searchUrl, setSearchQuery } = useContext(SearchContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInput);
  };

  return (
    <>
      <div>
        <h1>Search Recipes</h1>
        <input
          type="text"
          placeholder="Enter search query"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearchSubmit}
        >
          Search
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => setModalVisible(true)}
        >
          Filter
        </button>
        <div>DEBUG: {searchUrl}</div>
        <FilterModal
          visible={modalVisible}
          onHide={() => setModalVisible(false)}
        />
      </div>
      <CardRenderer url={searchUrl} />
    </>
  );
}

export default NewSearch;
