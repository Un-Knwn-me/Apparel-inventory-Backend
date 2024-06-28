const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { roleAdmin } = require('../middlewares/adminAuth');

// Post users to request a password change
router.post('/request', notificationController.requestPasswordChange);

// Post admin to change the user's password
router.post('/changePassword', roleAdmin, notificationController.changePassword);

// Get a user by phone number or email
router.get('/getUser', roleAdmin, notificationController.getUserByPhoneOrEmail);

// Get user by name
router.get('/searchByName', roleAdmin, notificationController.getUsersByName);

module.exports = router;