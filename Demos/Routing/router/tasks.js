//import du router de express
const router = require("express").Router();


const tasks = [
    {
        id : 1,
        title : "Faire la vaisselle",
        completed : false
    },
    {
        id : 2,
        title : "Faire la litière",
        completed : false
    },
];

// Get http://localhost:3000/tasks/
router.get("/tasks",(req, res)=>{
    res.status(200).json(tasks);
})

// Get http://localhost:3000/tasks/1
router.get("/tasks/:id",(req, res)=>{
    const {id} = req.params;
    const task = tasks.find(t=>t.id === parseInt(id))
    if(!task) res.status(404).json(
        {   Code: 404, 
            error: "Not found", 
            message : "Aucune tâche n'existe sous cet id",
            targetId : id});
    res.status(200).json(task);
})

//Post http://localhost:3000/tasks/

let taskId = tasks.length;

router.post("/tasks/",(req,res)=>{
        const {title} = req.body;
        if(tasks.find(t=>t.title.toLowerCase() === title.toLowerCase())){
            return res.status(400).json( {   
                Code: 400, 
                error: "Bad Request", 
                message : "title already in the tasks list",
                origin : title});
        }
        const task = {id : ++taskId, title: title , completed : false};

        tasks.push(task);
        res.status(201).json(task);
})

//Put http://localhost:3000/tasks/:id

router.put("/tasks/:id",(req, res)=>{
    const {id} = req.params;
    const {title, completed} = req.body;
    const task = tasks.find(t=>t.id === +id);


    if(!task)
        return res.status(404).json({   
            Code: 404, 
            error: "Not found", 
            message : "Aucune tâche n'existe sous cet id",
            targetId : id});

    if(tasks.find(t=>t.title.toLowerCase() === title.toLowerCase() && t.id !== +id)){
        return res.status(400).json( {   
            Code: 400, 
            error: "Bad Request", 
            message : "title already in the tasks list",
            origin : title});
    }
    task.title = title;
    task.completed = completed;

    return res.status(200).json(task);

});

//Delete
router.delete("tasks/:id", (req,res)=>{
    const {id} = req.params;
    const taskId = tasks.find(t=>t.id === +id);
    if (taskId === -1)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });

    tasks.splice(taskId, 1);
    res.sendStatus(200);
})

//Patch
router.patch("tasks/:id", (req,res)=>{

    const { id } = req.params;
    const { title, completed } = req.body;

    console.log('req.body :>> ', req.body);
    console.log('title :>> ', title);
    console.log('completed :>> ', completed);

    const task = tasks.find((t) => t.id === +id);

    if (!task)
        return res.status(404).json({
            code: 404,
            error: "Not Found",
            message: "Id non trouvé",
            targetId: id,
        });
    
    if (title && tasks.find(t => t.title.toLowerCase() === title.toLowerCase() && t.id !== +id)) 
        return res.status(400).json({
            code: 400,
            error: "Bad Request",
            message: "Le titre est déjà présent dans la liste.",
            origin: title,
        });

    if (title != undefined) task.title = title;
    if (completed != undefined) task.completed = completed;

    res.status(200).json(task);
})

module.exports = router;