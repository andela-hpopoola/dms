export const DOCUMENTS = {
  ALL: -2,
  PUBLIC: -1,
  PRIVATE: 0
};

export const ROLES = {
  SUPERADMIN: 1,
  ADMIN: 2,
  USER: 3
};

export const DEFAULT = {
  LIMIT: 20,
  OFFSET: 0
};

export const LIMIT = {
  USERS: 10,
  DOCUMENTS: 10
};

export const MOCK_DOCUMENTS = {
  PRIVATE: {
    id: 1,
    title: 'Private Document',
    content: 'Private Content',
    userId: 1,
    roleId: ROLES.SUPERADMIN,
    access: DOCUMENTS.PRIVATE,
    createdAt: '2017-12-30'
  },
  PUBLIC: {
    id: 2,
    title: 'Public Document',
    content: 'Public Content',
    userId: 2,
    roleId: ROLES.ADMIN,
    access: DOCUMENTS.PUBLIC,
    createdAt: '2017-12-30'
  },
  ROLE: {
    id: 3,
    title: 'ROLE Document',
    content: 'ROLE Content',
    userId: 2,
    roleId: ROLES.USER,
    access: 3,
    createdAt: '2017-12-30'
  },
  ANOTHER_USER: {
    id: 3,
    title: 'Another User Document',
    content: 'Another User Content',
    userId: 2,
    roleId: ROLES.USER,
    access: 3,
    createdAt: '2017-12-30'
  },
};

export const EDITOR_CONFIG = {
  height: 350,
  toolbarButtons: [
    'fullscreen',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'subscript',
    'superscript',
    '|',
    'fontFamily',
    'fontSize',
    'color',
    '|',
    'paragraphFormat',
    'align',
    'formatOL',
    'formatUL',
    'outdent',
    'indent',
    'quote',
    '-',
    'insertLink',
    'insertHR',
    'selectAll',
    'clearFormatting',
    '|',
    'spellChecker',
    'help',
    '|',
    'undo',
    'redo'
  ]
};
