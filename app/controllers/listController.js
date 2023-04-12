const { List, Card } = require("../models")

const listController = {
  /**
   * Récupérer toutes les listes, leur cartes et les labels
   * @param {*} _req objet request non utilisé, donc on mets un underscore
   * @param {*} res l'objet reponse
   */
  async getAllLists(_req, res){
    try {
      const lists = await List.findAll({
        include: { all: true, nested: true }
      });
      // Envoyer l'objet javascript directement en réponse
      res.json(lists);
    }
    catch(error){
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Récupérer une liste
   * @param {*} req doit contenir le param id
   */
  async getOneList(req, res){
    // url c'était /lists/:id -> donc paramss.id existe
    const listId = req.params.id;
    try {
      const list = await List.findByPk(listId, {
        include: { all: true, nested: true }
      });
      // Envoyer l'objet javascript directement en réponse
      if(!list){
        res.status(404).json('Id non existant');
      }
      else {
        res.json(list);
      }
    }
    catch(error){
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Création d'une nouvelle liste et renvoie de cette dernière
   */
  async createList(req, res){
    // Pour créer une liste, il nous faut la position et le name
    // On ne doit pas donner l'id !
    const { position, name } = req.body;

    if(position === undefined || name === undefined){
      res.status(400).json('Name and position required');
      return;
    }

    try{
      const newList = await List.findOrCreate({
        where: {
          position, 
          name
        }
      });
      // Si on a créé une liste, on renvoie
      res.json(newList[0]);
    }
    catch(error){
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Mettre à jour la liste avec l'id
   */
  async updateList(req, res){
    // On a l'id
    const listId = req.params.id;
    // On a aussi les données
    const { position, name } = req.body;

    try{
      // Récupérer la liste déjà existante à l'id
      const list = await List.findByPk(listId);

      // Si la liste n'existe pas, on arrête, on peut pas mettre à jour
      if(!list){
        res.status(404).json('Id non existant');
        return;
      }

      if(name !== undefined){
        list.name = name;
      }

      if(position !== undefined){
        list.position = position;
      }

      // Sequelize, mettre à jour c'est save
      await list.save();

      // On renvoie la nouvelle liste
      res.json(list);
    }
    catch(error){
      console.trace(error);
      res.status(500).json(error.message);
    }
  },
  /**
   * Supprime la liste avec l'id
   */
  async deleteList(req, res){
    const listId = req.params.id;
    try {
      await List.destroy({
        where:{
          id: listId
        }
      });
      
      // Dans tous les cas, suppression ou non, on renvoie OK
      res.json('Ok');
    }
    catch(error){
      // trace permet d'avoir les fonctions par lesquelles est passé le code avant l'erreur
      console.trace(error);
      res.status(500).json(error.message);
    }
  }
}

module.exports = listController;