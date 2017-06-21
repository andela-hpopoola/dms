/**
 * Error Actions
 * @desc Handles Error Action
 * @param {any} error the error message to display
 * @returns {any} Error Message
 */
export default function displayError(error) {
  let errorMessage = '';
  if (error.response) {
    errorMessage = error.response;
  } else if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data.msg) {
    errorMessage = error.data.msg;
  } else {
    errorMessage = error;
  }
  return errorMessage;
}
