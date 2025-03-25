const userExist = require("../middlewares/userExist.middleware");

const userRouter = require ("express").Router();

const users = [
    {id : 1, name : "Jenny", lastname: "Fernandez Garcia", email : "j.garcia@interface3.be"},
    {id : 2, name : "Dorothée", lastname:"Valentyn",email : "d.valentyn@interface3.be"},
    {id : 3, name : "Mélusine", lastname:"Christophe", email : "m.christophe@interface3.be"}
];

//GET users/
userRouter.get("/", (req,res)=>{
    res.status(200).json(users);
})

// GET users/id
userRouter.get("/:id([0-9]+)", userExist, (req,res)=>{
    return res.status(200).json(user);
})

// POST
let userId = users.length;

userRouter.post("/", (req,res)=>{
    const {name, lastname, email} = req.body;
    if(!name || !lastname || !email){
        return res.status(400).json({
            Code: 400,
            error: "Bad Request", 
            message : "name, lastname and email are required!",
            origin : email
        })
    }

    if(users.some(u=>u.email === email)){ // some plutôt que find car retourne un bool au lieu d'un objet, plus léger
        return res.status(400).json({
            Code: 400, 
            error: "Bad Request", 
            message : "Email already in use",
            origin : email
        })
    }
    const user = {id: ++userId, name : name, lastname: lastname, email:email};
    users.push(user);
    return res.status(201).json(user);
})

// PUT
userRouter.put("/:id([0-9]+)",(req, res)=>{
    const {email, name, lastname} = req.body;
    const {id} = req.params;
    const user = users.find(u=>u.id === +id)

    if(!name || !lastname || !email){
        return res.status(400).json({
            Code: 400,
            error: "Bad Request", 
            message : "name, lastname and email are required!",
            origin : email
        })
    }
    if(!user){
        return res.status(400).json({
            Code: 404,
            error: "Bad Request", 
            message : "Id introuvable",
            origin : id
        })
    }

    if(user){
        if(users.find(u=>u.id !== +id && u.email !== email)){
            user.name = name;
            user.lastname = lastname;
            user.email = email;
        }
    }
    return res.status(200).json(user);
})

// Delete
userRouter.delete('/:id([0-9]+)', (req, res) =>{
    const {id} = req.params;
    const userId = users.findIndex(u=>u.id === +id)
    if(userId){
        users.splice(userId, 1);
        res.sendStatus(200);
    }
    else{
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });
    }
})


module.exports = userRouter;