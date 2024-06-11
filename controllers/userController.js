const { User, Department } = require('../models');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { full_name, profile, password_hash, email, phone_number, is_admin } = req.body;

    // Validate input
    if (!password_hash || !email) {
      return res.status(400).json({ error: 'Password and email are required' });
    }

    // Create the new user
    const user = await User.create({
      full_name,
      profile,
      password_hash,
      email,
      phone_number,
      is_admin
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await db.Users.findByPk(req.params.id);
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
    const [updated] = await db.Users.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await db.Users.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await db.Users.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
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

exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await Permission.create({ name });
    res.status(201).json(permission);
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
    res.status(500).json({ error: 'An error occurred while assigning the permission' });
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
    res.status(500).json({ error: 'An error occurred while retrieving user permissions' });
  }
};