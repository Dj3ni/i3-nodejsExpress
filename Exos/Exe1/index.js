const express = require('express');
const router  = require('./users');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", router)

app.get("/",(req,res)=>{
    res.send("Page d'accueil")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
