const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Label extends Model {};

Label.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  colour: DataTypes.TEXT
}, {
  sequelize,
  tableName: "label"
});

module.exports = Label;