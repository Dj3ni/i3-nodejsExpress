//On recentralise tout dans index.js afin de ne pas surcharger app.js

//1. Imports
const router = require('express').Router();
const userRouter = require('./user.routes');
const taskRouter = require('./task.routes');

//Routes
router.use('/users', userRouter);
router.use('/tasks', taskRouter);

//PErmet de pouvoir être utilisé par app.js
module.exports = router;
