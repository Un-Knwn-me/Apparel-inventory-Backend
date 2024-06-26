const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { upload } = require('../middlewares/storage');
const { roleAdmin } = require('../middlewares/adminAuth');

// Create a new user
router.post('/create', roleAdmin, upload.single('profile'), userController.createUser);

// Delete user profile picture
router.delete('/deleteProfile/:id', roleAdmin, userController.deleteProfileImageLink);

// Get all users
router.get('/getall', roleAdmin, userController.getAllUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', roleAdmin, upload.single('profile'), userController.updateUser);

// Delete a user by ID
router.delete('/:id', roleAdmin, userController.deleteUser);

// Assign permission to a user
router.post('/assign', roleAdmin, userController.assignPermission);

// Remove permission from a user
router.post('/remove', roleAdmin, userController.removePermission);

// Get all permissions for a user
router.get('/:userId', roleAdmin, userController.getUserPermissions);

// Create a new department
router.post('/newDepartment', roleAdmin, userController.createDepartment);

// Get all departments
router.get('/dept/getall', roleAdmin, userController.getDepartments);

// Get department by ID
router.get('/dept/:id', roleAdmin, userController.getDepartmentById);

// Update department by ID
router.put('/dept/:id', roleAdmin, userController.updateDepartment);

// Delete department by ID
router.delete('/dept/:id', roleAdmin, userController.deleteDepartment);

// Create a new permission
router.post('/newPermission', roleAdmin, userController.createPermission);

// Get all permissions
router.get('/per/getall', roleAdmin, userController.getPermissions);

// Get permission by ID
router.get('/per/:id', roleAdmin, userController.getPermissionById);

// Update permission by ID
router.put('/per/:id', roleAdmin, userController.updatePermission);

// Delete permission by ID
router.delete('/per/:id', roleAdmin, userController.deletePermission);

// Assign permission to a user
router.post('/assign', roleAdmin, userController.assignPermission);

// Remove permission from a user
router.post('/:userId/remove', roleAdmin, userController.removePermission);

// Get all permissions for a user
router.get('/:userId/permissions', roleAdmin, userController.getUserPermissions);

// create a user and assign a permission
router.post('/createUserWithPermission', roleAdmin, userController.createUserWithPermission);

// sign in a user
router.post('/signin', userController.signIn);

module.exports = router;