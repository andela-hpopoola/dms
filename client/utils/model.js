export const getAll = (req, res, name, Model, where={}) => {
  Model
    .findAll(where)
    .then((model) => {
      if (model) {
        res.json(model);
      } else {
        res.status(404).json({ msg: `No ${name.toLowerCase()} found` });
      }
    })
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
};

export const create = (req, res, name, Model) => {
  Model
    .create(req.body)
    .then((model) => {
      if (model) {
        res.json(model);
      } else {
        res.status(412).json({ msg: `${name} cannot be created` });
      }
    })
    .catch((error) => {
      res.status(412).json({ msg: error.message });
    });
}