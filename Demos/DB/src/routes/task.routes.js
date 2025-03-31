
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

router.get('/:id', isTaskOwner, taskController.findById);

router.put('/:id', isTaskOwner, taskController.update);

router.patch('/:id/toggle', isTaskOwner, taskController.toggleStatus)

router.delete('/:id', isTaskOwner, taskController.delete);

//Export du module
module.exports = router;