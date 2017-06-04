import axios from 'axios';
import * as auth from './auth';

// Get the saved token if available
const AUTH_TOKEN = auth.getToken();

// Set config defaults when creating the instance
const api = axios.create({
  // Reject only if the status code is greater than or equal to 500
  validateStatus: status => status < 500
});

// if there is a token, include it in the header
if (AUTH_TOKEN) {
  api.defaults.headers.common['x-auth'] = AUTH_TOKEN;
}

export default api;
