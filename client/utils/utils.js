export const userExists = (Model, where, req res) => {

}

export const getAll = (req, res, Model, where={}) => {
  Model
  .findAll(where)
  .then((model) => {
    if (model) {
      res.json(model);
    } else {
      res.status(404).json({ msg: `No user found` });
    }
  })
  .catch((error) => {
    res.status(412).json({ msg: error.message });
  });
};