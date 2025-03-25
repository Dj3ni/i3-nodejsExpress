const express = require('express');
const loggerMiddleware = require('./middlewares/logger.middleware');
const auth = require('./middlewares/auth.middleware');
const errorHandler = require('./middlewares/errorhandler.middleware');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

//MiddleWare Built in
app.use(express.json()) // parse le json dans le body
app.use(express.urlencoded({extended : true })) // parse les données dans le formulaire
app.use(morgan("dev")) // Pour logger les requêtes effectuées (va remplacer notre logger)
app.use(cors())//Pour gérer les CORS
app.use(helmet())// pour gérer les attaques xss (cross site scripting)

//Middleware Application-level
// app.use(loggerMiddleware);

//Routes pour tester
app.get("/", auth ,(req, res)=>{
    res.status(200).json({message: "Méthode Get"});
})
app.post("/",(req, res)=>{
    res.status(200).json({message: "Méthode POST"});
})

// MiddleWare Error Handling
app.get("/error",(req,res)=>{
    throw new Error("ça marche plus :(")
})
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
