require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());// Protection que pour les navigateurs

// Pour récupérer les informations envoyés dans le payload
// Il faut rajouter un middleware qui va parser le payload
// Il va ensuite rajouter les infos récupérées dans le req.body
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});