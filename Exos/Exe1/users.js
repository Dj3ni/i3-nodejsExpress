const router = require ("express").Router();

const users = [
    { id : 1, name : "Jenny", lastname: "Fernandez Garcia", email : "j.garcia@interface3.be"},
    {id : 2, name : "Dorothée", lastname:"Valentyn",email : "d.valentyn@interface3.be"},
    {id : 3, name : "Mélusine", lastname:"Christophe", email : "m.christophe@interface3.be"}
];

//GET users/
router.get("/", (req,res)=>{
    res.status(200).json(users);
})

// GET users/id


router.get("/:id([0-9]+)", (req,res)=>{
    const{id} = req.params;
    const user  = users.find(u=>u.id === +id)

    if(!user)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });
    return res.status(200).json(user);
})

// POST
userId = users.length;

router.post("/", (req,res)=>{
    const {name, lastname, email} = req.body;

    if(users.find(u=>u.email === email)){
        return res.status(400).json({
            Code: 400, 
                error: "Bad Request", 
                message : "Email already in use",
                origin : email
        })
    }
    const user = {id: ++userId, name : name, lastname: lastname, email:email};
    users.push(user);
    return res.status(200).json(user);
})

// PUT
router.put("/:id([0-9]+)",(req, res)=>{
    const {email, name, lastname} = req.body;
    const {id} = req.params;

        const user = users.find(u=>u.id === +id)
    if(user){
        if(users.find(u=>u.id !== +id && u.email !== email)){
            user = {name:name, lastname :lastname , email:email}
        }
    }
    return res.status(200).json(user);
})




module.exports = router;