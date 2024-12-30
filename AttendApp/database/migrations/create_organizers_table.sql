const { Model, DataTypes, Sequelize } = require('sequelize');

class Organizer extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      permissions: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    }, {
      sequelize,
      modelName: 'Organizer',
      timestamps: false,
    });
  }
}

module.exports = Organizer;
