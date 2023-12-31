const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ max: 20 })
        .withMessage('Username can contain up to 20 characters'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.Premium, Role.Normal])
        .withMessage('Invalid Role type'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 3 })
        .withMessage('Password must contain at least 3 characters')
        .isLength({ max: 20 })
        .withMessage('Password can contain max 20 characters'),
    // body('confirm_password')
    //     .exists()
    //     .custom((value, { req }) => value === req.body.password)
    //     .withMessage('confirm_password field must have the same value as the password field')
];

exports.updateUserSchema = [
    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('role')
        .optional()
        .isIn([Role.Admin, Role.Premium, Role.Normal])
        .withMessage('Invalid Role type'),
    body('password')
        .optional()
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Password must contain at least 3 characters')
        .isLength({ max: 20 })
        .withMessage('Password can contain max 20 characters'),
        // .custom((value, { req }) => !!req.body.confirm_password)
        // .withMessage('Please confirm your password'),
    // body('confirm_password')
    //     .optional()
    //     .custom((value, { req }) => value === req.body.password)
    //     .withMessage('confirm_password field must have the same value as the password field'),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['username', 'email', 'password', 'role'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];