/**
 * Initial State of Application
 * @desc Gives a preview of the states defined in the application
 */
export default {
  documents: {
    private: [],
    public: [],
    role: [],
    current: {},
    currentDocument: {}
  },
  user: {
    roleName: 'Unknown'
  },
  pagination: {},
  all: {
    users: [],
    documents: [],
    roles: [],
    search: []
  },
  roles: [],
  ajaxStatus: false,
  auth: false
};
