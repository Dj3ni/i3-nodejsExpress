const express = require('express');
const loggerMiddleware = require('./middlewares/logger.middleware');

const app = express();
const PORT = 3000;

//Middleware Application-level
app.use(loggerMiddleware);

//Routes pour tester
app.get("/", auth ,(req, res)=>{
    res.status(200).json({message: "Méthode Get"});
})
app.post("/",(req, res)=>{
    res.status(200).json({message: "Méthode POST"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
