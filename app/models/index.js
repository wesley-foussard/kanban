const Card = require("./card");
const CardLabel = require("./cardlabel");
const Label = require("./label")
const List = require("./list")

// On va venir définir nos associations

// 11 -> 0N
// Créé la foreign key correspondante, sous le nom list_id (car on underscored: true dans sequelize) + les méthodes
List.hasMany(Card);
/* Sequelize permet la précision qu'une clef étrangère existe pour pouvoir donner la valeur lors d'un create
List.hasMany(Card,{
  foreignKey: 'list_id'
});*/

// Les méthodes sur les objets cards
Card.belongsTo(List);


// 0N -> 0N
Card.belongsToMany(Label, {
  through: {
    model: CardLabel,
    unique: true
  }
});

Label.belongsToMany(Card, {
  through: {
    model: CardLabel,
    unique: true
  }
});

module.exports = {List, Card, Label};