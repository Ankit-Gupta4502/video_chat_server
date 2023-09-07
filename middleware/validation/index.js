const { body } = require("express-validator")
const loginValid = () => {
    return [
        body("email").notEmpty().isEmail().withMessage("Please enter your email address"),
        body("password").notEmpty().withMessage("Please enter your password")
    ]
}

module.exports = { loginValid }