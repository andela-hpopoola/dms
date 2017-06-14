/**
 * Initial State of Application
 * @desc Gives a preview of the states defined in the application
 */
export default {
  documents: {
    public: [],
    role: [],
    current: {}
  },
  user: {
    documents: [],
    roleName: 'Unknown'
  },
  all: {
    users: [],
    documents: [],
    roles: [],
    search: [],
    pagination: {}
  },
  roles: [],
  ajaxStatus: false,
  auth: false,
  errorMessage: ''
};
