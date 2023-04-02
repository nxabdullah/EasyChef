// constants.js

// API endpoints
export const API_BASE_URL = 'http://localhost:8000/api/';

// Authentication endpoints
export const LOGIN_ENDPOINT = `${API_BASE_URL}account/login/`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}account/register/`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}account/logout/`;

// Account endpoints
export const ACCOUNT_ENDPOINT = `${API_BASE_URL}account/`;
export const ACCOUNT_INTERACTIONS_ENDPOINT = `${API_BASE_URL}account/interactions/`;
export const ACCOUNT_FAVOURITES_ENDPOINT = `${API_BASE_URL}account/favourites/`;
export const ACCOUNT_RECIPES_ENDPOINT = `${API_BASE_URL}account/recipes/`;


// ... more to come


// Search endpoint
export const SEARCH_ENDPOINT = `${API_BASE_URL}search/`;

// Colors
export const PRIMARY_COLOR = '#3a9691'; // dark green

// Other constants
export const PAGE_SIZE = 10;