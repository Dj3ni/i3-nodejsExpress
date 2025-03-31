const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

//Création user
exports.register = async (req,res)=> {
    try{
        // Valider la requête
        if(!req.body.email || ! req.body.password){
            return res.status(400).json({message: "Email / Pwd requis"});
        }

        const existingUser = await User.findByEmail(req.body.email);
        
        if(existingUser){
            return res.status(400).json({message: "Email déjà utilisé"})
        }

        const newUser = new User(req.body.email, req.body.password);
        const user = await User.create(newUser);

        //Générer Token JWT
        const token = jwt.sign (
            { id: user.Id, email: user.Email},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE_IN }
        );

        res.status(201).json({
            message : "User created succesfully",
            user: {
                id:user.Id,
                email : user.Email
            },
            token,            
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }


};


exports.login = async (req,res)=>{
try{

    if(!req.body.email || ! req.body.password){
        return res.status(400).json({message: "Email / Pwd requis"});
    }

}
catch(error){
    res.status(500).json({message: error.message});
}
};