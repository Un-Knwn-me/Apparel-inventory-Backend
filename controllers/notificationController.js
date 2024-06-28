const { Op } = require('sequelize');
const { hashPassword } = require('../middlewares/auth');
const { User, Notification } = require('../models');

// Controller to handle password change request
exports.requestPasswordChange = async (req, res) => {
    try {
      const { userVerify } = req.body;
  
      // Validate input
      if (!userVerify) {
        return res.status(400).json({ error: 'Email or phone number is required' });
      }
  
      // Find the user by email or phone number
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: userVerify },
            { phone_number: userVerify }
          ]
        }
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user_id = user.id;
      const user_email = user.email;
  
      // Create a notification for the admin
      const message = `User with ID ${user_id} and email Id ${user_email} has requested a password change.`;
      await Notification.create({ user_id, message });
  
      res.status(200).json({ message: 'Password change request has been sent to the admin.' });
    } catch (error) {
      console.error('Error requesting password change:', error);
      res.status(500).json({ error: 'An error occurred while requesting the password change.' });
    }
  };

// Controller for admin to change the password
exports.changePassword = async (req, res) => {
    try {
      const { user_id, new_password } = req.body;
  
      // Validate input
      if (!user_id || !new_password) {
        return res.status(400).json({ error: 'User ID and new password are required' });
      }
  
      // Hash the new password
      const hashedPassword = await hashPassword(new_password);
  
      // Update the user's password
      const [updated] = await User.update({ password: hashedPassword }, {
        where: { id: user_id }
      });
  
      if (updated) {
        // Find and update the user's notification
        const notification = await Notification.findOne({ where: { user_id, is_read: false } });
        
        if (notification) {
          notification.is_read = true;
          await notification.save();
        }
  
        res.status(200).json({ message: 'Password has been changed successfully.' });
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'An error occurred while changing the password.' });
    }
  };


//  Get user by phone number or email
exports.getUserByPhoneOrEmail = async (req, res) => {
    try {
      const { userVerify } = req.body;
  
      // Validate input
      if (!userVerify) {
        return res.status(400).json({ error: 'Email or phone number is required' });
      }
  
      // Find the user by email or phone number
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: userVerify },
            { phone_number: userVerify }
          ]
        }
      });
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the user' });
    }
  };
  

  // get user by name
  exports.getUsersByName = async (req, res) => {
    try {
      const { full_name } = req.body;
  
      // Validate input
      if (!full_name) {
        return res.status(400).json({ error: 'Name is required' });
      }
  
      // Find users whose names start with the input
      const users = await User.findAll({
        where: {
          full_name: {
            [Op.like]: `${full_name}%`
          }
        }
      });
  
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ error: 'No users found with the given name' });
      }
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the users' });
    }
  };