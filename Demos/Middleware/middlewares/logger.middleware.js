//Ici ce sera utilisé lorsqu'on a plusieurs middlewares dans le même fichier (dans index.js on devra l'appler comme dans Angular avec des parenthèses)

const logger = (req, res,next) => {
    console.log(`Requête interceptée : ${req.method} ${req.url}`);
    next();
}

module.exports = logger

// Meilleure méthode car tout en une ligne 
// export default logger = (req, res,next) => {
//     console.log(`Requête interceptée : ${req.method} ${req.url}`);
//     next();
// }