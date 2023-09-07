const { Router } = require("express")
const { login } = require("../controllers/AuthControllers")
const { loginValid } = require("../middleware/validation")
const routes = Router()

routes.route("/login").post(loginValid(), login)
routes.route("/register").post()

module.exports = routes