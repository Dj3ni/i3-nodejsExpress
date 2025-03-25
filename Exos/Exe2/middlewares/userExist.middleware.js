const userExist = (req, res, next)=>{
    const{id} = req.params;
    const user  = users.find(u=>u.id === +id)

    if(!user)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });
    next();
}

module.exports = userExist;