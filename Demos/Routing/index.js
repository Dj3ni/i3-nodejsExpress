// Init Server
const express = require('express');
const router = require("./router/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

    //Routing de base ( à déclarer avant de lancer le app.listen!)
    app.get("/", (req,res)=>{
        res.send("Page d'accueil")
    })

    app.get("/home",(req,res) =>{
        res.redirect("/")
    })

    // Le "?" signifie que le caractère qui le précède est optionnel
        // idem si entre parenthèses ex :/lang(uages?)?
    app.get("/languages?", (req,res) =>{
        res.send("Page des langues")
    })

    // Ici si les valeurs du tableau sont tapées dans l'url, elles vont toutes les 2 avoir le même comportement
    app.get(["/contact","/about"], ()=>{
        res.send("Page contact et à propos")
    })

    //Segment dynamique ( la récup des infos se fait via params!)
    app.get("/route/:id ([0-9]+)",(req,res)=>{
        const id = req.params.id;
        res.send("id : " + id)
    })

    //L'utilisation des ":" indique que c'est un segment dynamique dont on va pouvoir récupérer les infos. 
    app.get("/personne/:nom/:prenom", (req,res)=>{
        const {nom, prenom} = req.params; //Destructuration
        res.send( nom + " " + prenom);
    })

    app.use(router);

app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})

