const { List, Card, Label } = require("../models")

const cardController = {
  /**
   * Récupérer toutes les cartes
   * @param {*} _req objet request non utilisé, donc on mets un underscore
   * @param {*} res l'objet reponse
   */
  async getAllCards(_req, res) {
    try {
      const cards = await Card.findAll({
        include: Label // On inclut que les labels
      });
      // Envoyer l'objet javascript directement en réponse
      res.json(cards);
    }
    catch (error) {
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Récupérer une carte
   * @param {*} req doit contenir le param id
   */
  async getOneCard(req, res) {
    // url c'était /lists/:id -> donc paramss.id existe
    const cardId = req.params.id;
    try {
      const card = await Card.findByPk(cardId, {
        include: Label
      });
      // Envoyer l'objet javascript directement en réponse
      if (!card) {
        res.status(404).json('Id non existant');
      }
      else {
        res.json(card);
      }
    }
    catch (error) {
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Création d'une nouvelle liste et renvoie de cette dernière
   */
  async createCard(req, res) {
    // Pour créer une liste, il nous faut la position et le name
    // On ne doit pas donner l'id !
    const { position, text, ListId, colour } = req.body;

    if (position === undefined
      || text === undefined
      || ListId === undefined) {
      res.status(400).json('Text, position, and ListId required');
      return;
    }

    try {
      const list = await List.findByPk(ListId);

      // Si la liste n'existe pas, on ne peut pas rajouter la carte
      if (!list) {
        res.status(404).json("La liste n'existe pas");
      }

      // Sequelize rajoute la méthode createCard sur les instance de liste
      // cela vient de notre association List.hasMany(Card)
      const newCard = await list.createCard({
        position,
        text,
        colour // Si colour est undefined, seqeulize mets NULL dans la bdd
      });
      // Si on a créé une liste, on renvoie
      res.json(newCard);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Mettre à jour la liste avec l'id
   */
  async updateCard(req, res) {
    // On a l'id
    const cardId = req.params.id;
    // On a aussi les données
    const { position, text, colour, ListId } = req.body;

    try {
      // Récupérer la carte déjà existante à l'id
      const card = await Card.findByPk(cardId);

      // Si la carte n'existe pas, on arrête, on peut pas mettre à jour
      if (!card) {
        res.status(404).json('Id non existant');
        return;
      }

      // Si texte est défini, alors on veut modifier
      if (text !== undefined) {
        card.text = text; // Il y avait un texte dans notre body, donc on mets à jour
      }

      if (position !== undefined) {
        card.position = position;
      }

      if (colour !== undefined) {
        card.colour = colour;
      }

      if (ListId !== undefined) {
        const list = await List.findByPk(ListId);
        if (!list) {
          res.status(404).json('Id non existant');
          return;
        }
        // On dit que la carte appartient à la liste trouvée
        card.setList(list);
      }

      // Sequelize, mettre à jour c'est save
      await card.save();

      // On renvoie la nouvelle liste
      res.json(card);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Supprime la liste avec l'id
   */
  async deleteCard(req, res) {
    const cardId = req.params.id;
    try {
      await Card.destroy({
        where: {
          id: cardId
        }
      });

      // Dans tous les cas, suppression ou non, on renvoie OK
      res.json('Ok');
    }
    catch (error) {
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Récupère la liste des labels d'une carte
   */
  async getAllLabelsOfCard(req, res) {
    const cardId = req.params.id_card;

    try {
      const card = await Card.findByPk(cardId, {
        include: Label
      });

      res.json(card.Labels);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Associe un label à une carte
   */
  async setLabelOnCard(req, res) {
    const cardId = req.params.id_card;
    const labelId = req.params.id_label;

    try {
      let card = await Card.findByPk(cardId);
      const label = await Label.findByPk(labelId);

      if (!card || !label) {
        res.status(404).json('Id non existant');
        return;
      }

      await card.addLabel(label);// Attention ne mets pas à jour les includes

      // Soit on rajoute le label à la main car save a eu lieu et on sait que le label existe et la carte aussi
      // On refait un find pour récupérer l'include avec le nouveau label
      card = await Card.findByPk(cardId, {
        include: Label
      });

      res.json(card);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  async removeLabelFromCard(req, res) {
    const cardId = req.params.id_card;
    const labelId = req.params.id_label;

    try {
      let card = await Card.findByPk(cardId);
      const label = await Label.findByPk(labelId);

      if (!card || !label) {
        res.status(404).json('Id non existant');
        return;
      }

      await card.removeLabel(label);// Attention ne mets pas à jour les includes

      // Soit on rajoute le label à la main car save a eu lieu et on sait que le label existe et la carte aussi
      // On refait un find pour récupérer l'include avec le nouveau label
      card = await Card.findByPk(cardId, {
        include: Label
      });

      res.json(card);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  }
}

module.exports = cardController;