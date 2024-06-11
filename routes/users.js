const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

// Assign permission to a user
router.post('/assign', userController.assignPermission);

// Remove permission from a user
router.post('/remove', userController.removePermission);

// Get all permissions for a user
router.get('/:userId', userController.getUserPermissions);

// Create a new department
router.post('/newDepartment', userController.createDepartment);

// Get all departments
router.get('/getalldept', userController.getDepartments);

// Create a new permission
router.post('/create', userController.createPermission);

// Get all permissions
router.get('/', userController.getPermissions);

// Assign permission to a user
router.post('/assign', userController.assignPermission);

// Remove permission from a user
router.post('/remove', userController.removePermission);

// Get all permissions for a user
router.get('/:userId', userController.getUserPermissions);

module.exports = router;