const { Router } = require("express")
const { login } = require("../controllers/AuthControllers")
const { loginValid, registerValid } = require("../middleware/validation")
const routes = Router()

routes.route("/login").post(loginValid(), login)
routes.route("/register").post(registerValid(),)

module.exports = routes