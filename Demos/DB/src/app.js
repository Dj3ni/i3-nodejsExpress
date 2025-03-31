// 1. Imports
const express = require('express');
const cors = require('cors');
const routes = require('./routes')

// 2. Création de l'appli
const app = express();

// 3. Middleware intégrés et tiers
app.use(express.json()); // Parser le json dans le body
app.use(cors()); // Gérer les Cors

//Routes
app.use('/api', routes) //import du module index.js

//Gestion des erreurs globales
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).json({
        message: "Erreur serveur",
        error : process.env.NODE_ENV === ("development" ? error.message : undefined)        
    })
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})



//Pour tests unitaires
//modules.exports = app;