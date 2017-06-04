module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Invalid User'
        }
      }
    },
    title: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Document exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The title field cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'The content field cannot be empty'
        }
      }
    },
    access: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        isInt: {
          msg: 'Invalid Access'
        }
      }
    },
    publishedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'Only valid dates are allowed'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Documents;
};
