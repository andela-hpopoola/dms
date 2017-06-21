import axios from 'axios';

// Set config defaults when creating the instance
const api = axios.create({
  // Reject only if the status code is greater than or equal to 500
  validateStatus: status => status < 500
});

export default api;
