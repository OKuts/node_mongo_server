const Router = require('express');
const router = new Router();
const controller = require('../controller/controller');
const {check} = require('express-validator');
const isValidToken = require('../middlewears/isValidTokenMW');
const roleMW = require('../middlewears/roleMW');

router.post('/registration', [
  check('username', 'Field empty').notEmpty(),
  check('password', 'Min 4 - Max 10 symbols').isLength({min: 4, max: 10}),
], controller.registration);
router.post('/login', controller.login);
router.get('/users', roleMW(['USER']), controller.getUsers)

module.exports = router;
