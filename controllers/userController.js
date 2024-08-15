const { Op } = require('sequelize');
const { hashCompare, createToken, hashPassword } = require('../middlewares/auth');
const { User, Department, UserPermission, Permission, sequelize } = require('../models');
const { storage, bucketName, bucket } = require('../middlewares/storage');
const path = require('path');
const { format } = require('util');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { full_name, password, email, phone_number, is_admin } = req.body;

    // Validate input
    if (!password || !email) {
      return res.status(400).json({ error: 'Password and email are required' });
    }

    // check existing user
    const existingUser = await User.findOne({ where: {  [Op.or]: [ 
      { email: email },
      { phone_number: phone_number }
    ] }});

    if (existingUser) {
      return res.status(409).json({ error: 'Email or phone number already registered' });
    }

    const hashedPassword = await hashPassword(req.body.password);

    // Handle profile image upload
    let profileUrl = '';
      if (req.file) {
        // Upload profile image to Google Cloud Storage
        const blob = bucket.file(`Profile/${Date.now()}_${path.basename(req.file.originalname)}`);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });

        blobStream.on('error', (err) => {
          console.error('Blob stream error:', err);
          res.status(500).json({ error: 'Failed to upload profile image' });
        });

        blobStream.on('finish', async () => {
          // Construct the public URL
          profileUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

    // Create the new user
    const user = await User.create({
      full_name,
      profile: profileUrl,
      password: hashedPassword,
      email,
      phone_number,
      is_admin
    });

    res.status(201).json(user);
  });

  blobStream.end(req.file.buffer);
} else {
  // Create the new user without profile image
  const user = await User.create({
    full_name,
    profile: profileUrl,
    password: hashedPassword,
    email,
    phone_number,
    is_admin,
  });
  res.status(201).json(user);
}
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { full_name, password, email, phone_number, is_admin } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Prepare the fields to update
    const updateFields = {
      full_name,
      email,
      phone_number,
      is_admin
    };

    // Only update the password if it's provided
    if (password) {
      const hashedPassword = await hashPassword(password);
      updateFields.password = hashedPassword;
    }

    // Handle profile image upload
    if (req.file) {
      // Upload profile image to Google Cloud Storage
      const blob = bucket.file(`Profile/${Date.now()}_${path.basename(req.file.originalname)}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);
        res.status(500).json({ error: 'Failed to upload profile image' });
      });

      blobStream.on('finish', async () => {

        // Construct the public URL
        const profileUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        updateFields.profile = profileUrl;

        // Update the user in the database
        const [updated] = await User.update(updateFields, {
          where: { id: req.params.id }
        });

        if (updated) {
          const updatedUser = await User.findByPk(req.params.id);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      });

      blobStream.end(req.file.buffer);
    } else {
      // Update the user without profile image
      const [updated] = await User.update(updateFields, {
        where: { id: req.params.id }
      });

      if (updated) {
        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};


// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(202).send({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user profile image by ID
exports.deleteProfileImageLink = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the profile image link
    user.profile = null;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Profile image deleted successfully', user });
  } catch (error) {
    console.error('Error deleting profile image link:', error);
    res.status(500).json({ error: 'An error occurred while deleting the profile image link' });
  }
};

// Assign a permission to a user
exports.assignPermission = async (req, res) => {
  try {
    const { userId, permissionId } = req.body;

    // Check if the user and permission exist
    const user = await User.findByPk(userId);
    const permission = await Permissions.findByPk(permissionId);

    if (!user || !permission) {
      return res.status(404).json({ error: 'User or Permission not found' });
    }

     // Create the UserPermission entry
     await UserPermission.create({ user_id: userId, permission_id: permissionId });

     res.status(201).json({ message: 'Permission assigned successfully' });
   } catch (error) {
     res.status(500).json({ error: 'An error occurred while assigning the permission' });
   }
 };

 // Remove a permission from a user
exports.removePermission = async (req, res) => {
  try {
    const { userId, permissionId } = req.body;

    // Find and destroy the UserPermission entry
    const result = await UserPermission.destroy({
      where: { user_id: userId, permission_id: permissionId }
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Permission not found for user' });
    }

    res.status(200).json({ message: 'Permission removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the permission' });
  }
};

// Get all permissions for a user
exports.getUserPermissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: {
        model: Permission,
        through: { attributes: [] },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.Permissions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving user permissions' });
  }
};

exports.createDepartment = async (req, res) => {
  try {
    const { departmentName } = req.body;
    if (!departmentName) {
      return res.status(400).json({ error: 'Department name is required' });
    }
    const department = await Department.create({ departmentName });
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the department' });
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching departments' });
  }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ error: 'An error occurred while fetching the department' });
  }
};

// Update department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const { departmentName, isActive } = req.body;

    // Validate input
    if (!departmentName && isActive === undefined) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Find and update the department
    const [updated] = await Department.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedDepartment = await Department.findByPk(req.params.id);
      res.status(200).json(updatedDepartment);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ error: 'An error occurred while updating the department' });
  }
};

// Delete department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ error: 'An error occurred while deleting the department' });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const { permission } = req.body;
    const data = await Permission.create({ permission });
    res.status(201).json({ message: "New permission created successfully", data });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the permission' });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching permissions' });
  }
};

// Get permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findByPk(req.params.id);
    if (permission) {
      res.status(200).json(permission);
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    console.error('Error fetching permission:', error);
    res.status(500).json({ error: 'An error occurred while fetching the permission' });
  }
};

// Update permission by ID
exports.updatePermission = async (req, res) => {
  try {
    const { permission } = req.body;

    if (!permission) {
      return res.status(400).json({ error: 'Permission name is required' });
    }

    const [updated] = await Permission.update({ permission }, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedPermission = await Permission.findByPk(req.params.id);
      res.status(200).json(updatedPermission);
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    console.error('Error updating permission:', error);
    res.status(500).json({ error: 'An error occurred while updating the permission' });
  }
};

// Delete permission by ID
exports.deletePermission = async (req, res) => {
  try {
    const deleted = await Permission.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(202).send({ message: 'Permission deleted successfully' });
    } else {
      res.status(404).json({ error: 'Permission not found' });
    }
  } catch (error) {
    console.error('Error deleting permission:', error);
    res.status(500).json({ error: 'An error occurred while deleting the permission' });
  }
};

// Assign a permission to a user
exports.assignPermission = async (req, res) => {
  try {
    const { userId, departmentId, permissionId } = req.body;

    // Check if the user, department, and permission exist
    const user = await User.findByPk(userId);
    const department = await Department.findByPk(departmentId);
    const permission = await Permission.findByPk(permissionId);

    if (!user || !department || !permission) {
      return res.status(404).json({ error: 'User, Department, or Permission not found' });
    }

    // Create the UserPermission entry
    await UserPermission.create({ user_id: userId, department_id: departmentId, permission_id: permissionId });

    res.status(201).json({ message: 'Permission assigned successfully' });
  } catch (error) {
    console.error('Error assigning permission:', error);
    res.status(500).json({ error: `An error occurred while assigning the permission: ${error.message}` });
  }
};


// Remove a permission from a user
exports.removePermission = async (req, res) => {
  try {
    const { userId, departmentId, permissionId } = req.body;

    // Find and destroy the UserPermission entry
    const result = await UserPermission.destroy({
      where: { user_id: userId, department_id: departmentId, permission_id: permissionId }
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Permission not found for user' });
    }

    res.status(200).json({ message: 'Permission removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while removing the permission' });
  }
};

// Get all permissions for a user
exports.getUserPermissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Permission,
          through: { attributes: [] },
        },
        {
          model: Department,
          through: { attributes: [] },
        }
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user permissions:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user permissions' });
  }
};


// create user with permissions
exports.createUserWithPermission = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { full_name, profile, password, email, phone_number, is_admin, departmentId, permissionId } = req.body;

    // Validate input
    if (!password || !email) {
      return res.status(400).json({ error: 'Password and email are required' });
    }

    // Create the new user within a transaction
    const user = await User.create({
      full_name,
      profile,
      password,
      email,
      phone_number,
      is_admin
    }, { transaction });

    // Check if the department and permission exist
    const department = await Department.findByPk(departmentId);
    const permission = await Permission.findByPk(permissionId);

    if (!department || !permission) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Department or Permission not found' });
    }

    // Create the UserPermission entry within the same transaction
    await UserPermission.create({
      user_id: user.id,
      department_id: departmentId,
      permission_id: permissionId
    }, { transaction });

    // Commit the transaction
    await transaction.commit();

    res.status(201).json({ message: 'User created and permission assigned successfully', user });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating user with permission:', error);
    res.status(500).json({ error: `An error occurred while creating the user with permission: ${error.message}` });
  }
};

// sign in a user
exports.signIn = async (req, res) => {
  try {
    const { userVerify, password } = req.body;

    let user = await User.findOne({
      where: { [Op.or]: [ { email: userVerify }, { phone_number: userVerify } ] },
    });

    if (user) {
      if (await hashCompare(password, user.password)) {
        let token = createToken({
          id: user.id,
          full_name: user.full_name,
        });

        res.status(200).json({
          message: "User successfully logged in",
          token,
          userName: user.full_name,
          userId: user.id,
          profile: user.profile
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};