// 1. Imports
const express = require('express');
const cors = require('cors');

// 2. Création de l'appli
const app = express();

// 3. Middleware intégrés et tiers
app.use(express.json()); // Parser le json dans le body
app.use(cors()); // Gérer les Cors

//
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})