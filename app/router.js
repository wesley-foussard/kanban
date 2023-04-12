const express = require("express");
const cardController = require("./controllers/cardController");
const labelController = require("./controllers/labelController");
const listController = require("./controllers/listController");
const router = express.Router();

// Lists
// GET lists
router.get('/lists', listController.getAllLists);
// POST lists
router.post('/lists', listController.createList);
// GET lists/:id
router.get('/lists/:id', listController.getOneList);
// PATCH lists/:id
router.patch('/lists/:id', listController.updateList);
// DELETE lists/:id
router.delete('/lists/:id', listController.deleteList);

// Cards
// GET cards
router.get('/cards', cardController.getAllCards);
// GET cards/:id
router.get('/cards/:id', cardController.getOneCard);
// POST cards
router.post('/cards', cardController.createCard);
// PATCH cards/:id
router.patch('/cards/:id', cardController.updateCard);
// DELETE cards/:id
router.delete('/cards/:id', cardController.deleteCard);

// Labels
// GET labels
router.get('/labels', labelController.getAllLabels);
// GET labels/:id
router.get('/labels/:id', labelController.getOneLabel);
// POST labels
router.post('/labels', labelController.createLabel);
// PATCH labels/:id
router.patch('/labels/:id', labelController.updateLabel);
// DELETE labels/:id
router.delete('/labels/:id', labelController.deleteLabel);

// GET labels
router.get('/cards/:id_card/labels', cardController.getAllLabelsOfCard);
// Ajouter un label sur une carte POST 
router.post('/cards/:id_card/labels/:id_label', cardController.setLabelOnCard);
// Suppression du label sur une carte DELETE
router.delete('/cards/:id_card/labels/:id_label', cardController.removeLabelFromCard);

module.exports = router;