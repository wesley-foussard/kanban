const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class List extends Model {};

List.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  // utilise le nom de la table sql sans pluriel
  tableName: "list"
});

module.exports = List;