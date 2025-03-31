
// imports
const router = require('express').Router();
const verifyToken = require('../middlewares/verify-token.middleware');
const taskController = require('../controllers/task.controller');
const { findById } = require('../models/task.models');
const isTaskOwner = require('../middlewares/isTaskOwner.middleware');

// Middleware
router.use(verifyToken);

//Routes
router.post('/', taskController.create);

router.get('/', taskController.findAll);

router.get('/:id', taskController.findById);

router.put('/:id', isTaskOwner, taskController.update);

//Export du module
module.exports = router;