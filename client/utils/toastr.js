import toastr from 'toastr';

const showToast = (type, message, title) => {
  if (message !== '') {
    toastr[type](message, title);
  }
};

export const error = (message = '') => {
  showToast('error', message, 'Error Message');
};

export const success = (message = '') => {
  showToast('success', message, 'Success');
};
