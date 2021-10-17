const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

class Controller {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Registration error', errors});
      }
      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) return res.status(400).json({message: 'User exist'});
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: 'USER'});
      const user = new User ({username, password: hashPassword, roles: [userRole.value]});
      await user.save();
      return res.json({message: 'User was register'});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Registation error'});
    }
  }

  async login(req, res) {
    try {

    } catch (e) {
      console.log(e);
      res.status(400).json({message: 'Registation error'})
    }
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: 'ADMIN'})
      // await userRole.save();
      // await adminRole.save();
      res.json('Ok')
    } catch (e) {

    }
  }
}

module.exports = new Controller();