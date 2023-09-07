const { Router } = require("express")
const { login,register } = require("../controllers/AuthControllers")
const { loginValid, registerValid } = require("../middleware/validation")
const { checkToken } = require("../middleware/utlis")
const { getUser } = require("../controllers/UserController")
const routes = Router()

routes.route("/login").post(loginValid(), login)
routes.route("/register").post(registerValid(),register)
routes.get("/get-user",checkToken,getUser)

module.exports = routes