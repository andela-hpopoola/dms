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

// show info message
export const info = (message = '') => {
  showToast('info', message, '');
};

// show warning message
export const warning = (message = '') => {
  showToast('warning', message, '');
};
