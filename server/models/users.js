const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync();

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
          msg: 'The name field cannot be empty'
        }
      },
      set(name) {
        this.setDataValue('name', name.trim());
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The password field cannot be empty'
        }
      },
      set(password) {
        const encryptedPassword = bcrypt.hashSync(password, salt);
        this.setDataValue('password', encryptedPassword);
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isInt: {
          msg: 'Invalid Role'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The email field cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    }
  }, {
    hooks: {
    },
    classMethods: {
      associate(models) {
        Users.belongsTo(models.Roles, {
          foreignKey: 'roleId'
        });
        Users.hasMany(models.Documents, {
          foreignKey: 'userId'
        });
      },
      isPassword: (encodedPassword, password) =>
        bcrypt.compareSync(password, encodedPassword)
    }
  });
  return Users;
};
