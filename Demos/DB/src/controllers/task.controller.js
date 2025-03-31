exports.create = async (res,req)=>{
    try{
        if(!req.body.title){
            return res.status(400).json({message: "Le titre est requis"})
        }

        //creation d'une tâche
        const newTask = new Task(
            req.body.title,
            req.body.userId,
            req.body.isDone
        )

        const task = await Task.create(newTask);
        res.status(201).json({
            message: "Tâche créée avec succès",
            task
        });

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

exports.findAll = async (req,res) =>{
    try {
        const tasks = await Task.findByUserId(req.userId);
        //On va d'office retourner qqch (tableau vide ou tableau avec données)
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.findById = async (req,res) =>{
    try {
        //Récupérer l'Id dans l'URL!
        const task = await Task.FindById(req.params.id);

        if(!task){
            return res.status(404).json({
                message: "Tâche non trouvée"
            })
        }
        //Quand on récupère de la DB, les propriétés sont en majuscule
        if(task.UserId !== req.userId){
            return res.status(403).json({
                message: 'Accès non autorisé à cette tâche'
            })
        }
        //Si tout ok: 
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


exports.update = async (req, res) => {
    try {


    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}