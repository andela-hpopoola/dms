import toastr from 'toastr';

// General Function to show Toast
const showToast = (type, message, title) => {
  if (message !== '') {
    toastr[type](message, title);
  }
};

// show error message
export const error = (message = '') => {
  showToast('error', message, '');
};

// show success message
export const success = (message = '') => {
  showToast('success', message, '');
};
