const express = require('express');
const router  = require('./routes/users.router');

const app = express();
const PORT = 3000;

//Permet de récupérer les données du Bodu en Json
app.use(express.json());
app.use("/users", router)

app.get("/",(req,res)=>{
    res.send("Page d'accueil")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
