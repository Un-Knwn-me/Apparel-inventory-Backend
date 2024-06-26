const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/create', userController.createUser);

// Get all users
router.get('/getall', userController.getAllUsers);

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
router.get('/dept/getall', userController.getDepartments);

// Get department by ID
router.get('/dept/:id', userController.getDepartmentById);

// Update department by ID
router.put('/dept/:id', userController.updateDepartment);

// Delete department by ID
router.delete('/dept/:id', userController.deleteDepartment);

// Create a new permission
router.post('/newPermission', userController.createPermission);

// Get all permissions
router.get('/per/getall', userController.getPermissions);

// Get permission by ID
router.get('/per/:id', userController.getPermissionById);

// Update permission by ID
router.put('/per/:id', userController.updatePermission);

// Delete permission by ID
router.delete('/per/:id', userController.deletePermission);

// Assign permission to a user
router.post('/assign', userController.assignPermission);

// Remove permission from a user
router.post('/:userId/remove', userController.removePermission);

// Get all permissions for a user
router.get('/:userId/permissions', userController.getUserPermissions);

// create a user and assign a permission
router.post('/createUserWithPermission', userController.createUserWithPermission);

module.exports = router;