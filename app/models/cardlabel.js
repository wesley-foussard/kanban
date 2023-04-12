const { Model } = require('sequelize');
const sequelize = require('../database');

class CardLabel extends Model {};

CardLabel.init({}, {
  sequelize,
  tableName: "card_has_label",
  updatedAt: false
});

module.exports = CardLabel;