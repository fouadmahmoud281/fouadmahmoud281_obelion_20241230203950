const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize('Attend', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

class Organizer extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
      modelName: 'Organizers',
      timestamps: false,
    });
  }
}

module.exports = Organizer;