const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The name field cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The password field cannot be empty"
        }
      }
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'token'
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isInt: {
          msg: "Invalid Role"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email exists in db"
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The email field cannot be empty"
        },
        isEmail: {
          msg: "Invalid email address"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        user.name = user.name.trim();
        const payload = { email: user.email };
        user.token = jwt.sign(payload, 'secret');
      }
    },
    classMethods: {
      associate: function(models) {
        Users.belongsTo(models.Roles, {
          foreignKey: 'roleId'
        });
        Users.hasMany(models.Documents, {
          foreignKey: 'userId'
        });
      },
      isPassword: (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
      },
    }
  });
  return Users;
};
