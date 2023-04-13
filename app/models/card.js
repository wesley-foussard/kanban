const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Card extends Model { };

Card.init({
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  colour: DataTypes.TEXT,
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "card"
});

module.exports = Card;