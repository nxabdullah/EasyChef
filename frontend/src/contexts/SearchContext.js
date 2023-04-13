import { createContext, useState, useEffect } from "react";
import axios from "axios";
import useAuthToken from "../hooks/useAuthToken";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  useAuthToken();

  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
};

export default SearchContext;
