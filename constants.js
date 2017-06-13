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
