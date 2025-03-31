const {v4:uuidv4} = require('uuid');
const { pool, sql } = require('../config/db.config')

class Task {
    constructor(title, userId , isDone = false){
        this.id = v4();
        this.title = title;
        this.userId = userId;
        this.isDone = isDone;
    }

    /**
    * @param {Task} newTask
    */
    static async create(newTask){
        try{
            await pool.connect();

            // Création requête
                const request = pool.request();
                request.input('id',sql.UniqueIdentifier, newTask.id);
                request.input('title', sql.NVarChar, newTask.title);
                request.input('isDone',sql.Bit, newTask.isDone);
                request.input('userId', sql.UniqueIdentifier, newTask.userId)

                const command= `INSERT INTO [TASK] (Id,Title,IsDone,UserId) Values (@id, @title, @isDone, @userId)`

                const result = await request.query(command)
            return result.recordset;

        }catch(error){
            throw new Error ('Erreur lors de la création de la tâche')
        }

    }

    static async findByUserId(userId){
        try {

            await pool.connect();
             // Création requête
                const request = pool.request();
                request.input('userId', sql.UniqueIdentifier, userId)

            const command= `SELECT (Id,Title,IsDone) FROM [TASK] Where [UserID] = @userId OrderBy [IsDone], [Title]`
            const result = await request.query(command)

            return result.recordset;

        } catch (error) {
            throw new Error('Erreur lors de la recherche par Id du User')
        }
    }

    static async findById(taskId){
        try {
            await pool.connect();
             // Création requête
                const request = pool.request();
                request.input('id', sql.UniqueIdentifier, taskId)

            const command= `SELECT (Id,Title,IsDone) FROM [TASK] Where [ID] = @id`
            const result = await request.query(command)

            return result.recordset[0];

        } catch (error) {
            console.log(error.message);
            throw new Error('Erreur lors de la recherche par Id de la tâche')

        }
    }

    static async update(id, task){
        try {
            
            await pool.connect();
            const request = pool.request();
            request.input('id', sql.UniqueIdentifier, id)
            request.input('title', sql.NVarChar, task.title)
            request.input('isDone', sql.Bit, task.isDone)

            const command= `
            Update [Task] Set [Title] = @title, [IsDone] = @isDone Where [ID] = @id; 
            SELECT (Id,Title,IsDone) FROM [TASK] Where [ID] = @id;`;
            const result = await request.query(command)

            return result.recordset[0];

        } catch (error) {
            console.log(error.message);
            throw new Error('Erreur lors de la recherche par Id de la tâche')

        }
    }

    static async delete(id){
        try {
            await pool.connect();
            const request = pool.request();
            request.input('id', sql.UniqueIdentifier, id)

            const command= `
            Delete From [Task] Where [ID] = @id;`;
            
            return await request.query(command)

            //return {message: "Tâche supprimée avec succès"}
            
        } catch (error) {
            console.log(error.message);
            throw new Error('Erreur lors de la suppression de la tâche')
        }
    }

    static async toggleStatus(id){
        try {
            
            await pool.connect();
            const task = await this.findById(id);
            if(!task) throw new Error('Tâche non trouvée')

            const request = pool.request();
            request.input('id', sql.UniqueIdentifier, id)
            request.input('title', sql.NVarChar, task.title)
            request.input('isDone', sql.Bit, task.isDone)

            const command= `
            Update [Task] Set [IsDone] = @isDone Where [ID] = @id; 
            SELECT (Id,Title,IsDone) FROM [TASK] Where [ID] = @id;`;
            
            const result = await request.query(command)
            return result.recordset[0];

        } catch (error) {
            console.log(error.message);
            throw new Error('Erreur lors de la recherche par Id de la tâche')

        }
    }

}

module.exports = Task;