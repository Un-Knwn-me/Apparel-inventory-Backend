const { decodeToken } = require("./auth");
const { User, UserPermission, Department, Permission } = require('../models');

require('dotenv').config();

const isSignedIn = async (req, res, next) => {
    try {
      const header = await req.headers.authorization;
    
      if (header) {
      let token = await header.split(' ')[1];
      let data = await decodeToken(token);   
      req.user = {id: data.id};
      next();       
     } else {
     return res.status(400).json({ message: "Access denied" });
}
    }
     catch (error) {
      return res.status(500).json({ message: "Invalid Authentication", error });
    }
};


const roleAdmin = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(' ')[1];
      let data = await decodeToken(token);

      const user = await User.findByPk(data.id);

      if (user && user.is_admin) {
        next();
      } else {
        return res.status(401).json({ message: "Admin only" });
      }
    } else {
      return res.status(401).json({ message: "Authorization header missing" });
    }
  } catch (error) {
    console.error('Error in roleAdmin middleware:', error);
    return res.status(500).json({ message: "Invalid Authentication" });
  }
};

const verifyPermission = (department, requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        let data = await decodeToken(token);
        console.log(data.isAdmin);
        if (data.is_admin) {
          return next(); 
        }
        
        const userPermissions = await UserPermission.findOne({
          where: { user_id: data.id },
          include: [
            { model: Department, where: { name: department } },
            { model: Permission, where: { name: requiredPermission } }
          ]
        });

        if (userPermissions) {
          return next();
        } else {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      } else {
        return res.status(401).json({ message: 'Authorization header missing' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Invalid Authentication' });
    }
  };
};

module.exports = {isSignedIn, roleAdmin, verifyPermission}