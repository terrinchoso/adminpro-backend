/**
 * Route: /api/users
 */

const express = require('express');
const expressValidator = require('express-validator');
const { fieldValidations } = require('../middlewares/field-validations.middleware');
const { jwtValidation, adminRoleValidation } = require('../middlewares/jwt-validations.middleware');

// Define router
const router = express.Router();
// Get controller
const userController = require('../controllers/users.controller');

// Set routes
router.get('/', jwtValidation , userController.getUsers);
router.post('/', [
    expressValidator.check('name', 'The name field is mandatory').not().isEmpty(),
    expressValidator.check('password', 'The password field is mandatory').not().isEmpty(),
    expressValidator.check('email', 'The email field is mandatory').isEmail(),
    fieldValidations], userController.createUser);
router.put('/:uid', [
    jwtValidation,
    adminRoleValidation,
    expressValidator.check('name', 'The name field is mandatory').not().isEmpty(),
    expressValidator.check('email', 'The email field is mandatory').not().isEmpty(),
    expressValidator.check('email', 'The email field is not valid').isEmail(),
    expressValidator.check('role', 'The role field is mandatory').not().isEmpty(),
    fieldValidations] , userController.updateUser);
router.delete('/:uid', [jwtValidation, adminRoleValidation], userController.deleteUser);
module.exports = router;