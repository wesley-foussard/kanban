const { List, Card, Label } = require("../models")

const labelController = {
  /**
   * Récupérer tous les labels
   * @param {*} _req objet request non utilisé, donc on mets un underscore
   * @param {*} res l'objet reponse
   */
  async getAllLabels(_req, res) {
    try {
      const labels = await Label.findAll();
      // Envoyer l'objet javascript directement en réponse
      res.json(labels);
    }
    catch (error) {
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Récupérer un label
   * @param {*} req doit contenir le param id
   */
  async getOneLabel(req, res) {
    // url c'était /lists/:id -> donc paramss.id existe
    const labelId = req.params.id;
    try {
      const label = await Label.findByPk(labelId);
      // Envoyer l'objet javascript directement en réponse
      if (!label) {
        res.status(404).json('Id non existant');
      }
      else {
        res.json(label);
      }
    }
    catch (error) {
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Création d'un nouveau label et renvoie de cette dernière
   */
  async createLabel(req, res) {
    // Pour créer une liste, il nous faut la position et le name
    // On ne doit pas donner l'id !
    const { name, colour } = req.body;

    if (name === undefined) {
      res.status(400).json('Text, position, and listId required');
      return;
    }

    try {
      // Sequelize rajoute la méthode createCard sur les instance de liste
      // cela vient de notre association List.hasMany(Card)
      const newLabel = await Label.create({
        name,
        colour
      });
      // Si on a créé une liste, on renvoie
      res.json(newLabel);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Mettre à jour le label
   */
  async updateLabel(req, res) {
    // On a l'id
    const labelId = req.params.id;
    // On a aussi les données
    const { name, colour } = req.body;

    try {
      // Récupérer la carte déjà existante à l'id
      const label = await Label.findByPk(labelId);

      // Si la carte n'existe pas, on arrête, on peut pas mettre à jour
      if (!label) {
        res.status(404).json('Id non existant');
        return;
      }

      // Si texte est défini, alors on veut modifier
      if (name !== undefined) {
        label.name = name; // Il y avait un texte dans notre body, donc on mets à jour
      }

      if (colour !== undefined) {
        label.colour = colour;
      }

      // Sequelize, mettre à jour c'est save
      await label.save();

      // On renvoie la nouvelle liste
      res.json(label);
    }
    catch (error) {
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Supprime le label
   */
  async deleteLabel(req, res) {
    const labelId = req.params.id;
    try {
      await Label.destroy({
        where: {
          id: labelId
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
  }
}

module.exports = labelController;