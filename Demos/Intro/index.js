// Import commonJs (>< EcmaScript Module)

// Importation d'express
const express = require("express");

// Créer l'application Express
const app = express();
    // Identification du port
        const PORT = 3000;
    // Parsing du Json ( sinon Express ne comprend pas)
        app.use(express.json());

    // Route de base
        app.get("/",(request, response)=>{

            response.status(200).send("Hello, world!"); // text
            response.status(200).send({message:"Hello, world!"}); //Json

        })

        app.post("/", (req, res)=>{
            console.log("req.body: ",req.body);
            res.end();
        })
    // Ecoute du port
        app.listen(PORT,()=>{
            console.log(`Server is running on : http://localhost:${PORT}`);
        });
