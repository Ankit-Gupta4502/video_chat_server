const { validationResult } = require("express-validator")
const { formatError } = require("../utils")
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const login = async (req, res) => {
    try {
        const results = validationResult(req)
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!results.isEmpty()) {
            return res.status(422).send({ success: false, errors: formatError(results) })
        }
        if (!user) {
            return res.status(422).send({ success: false, message: "user not found" })
        }
        const signedJwt = jwt.sign({
            data: {
                id: user._id,
                email: user.email
            },
        }, "SECRET_KEY", { expiresIn: '3 days' })
        user.token = signedJwt

        return res.send({ message: "Succeed", user })

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error })
    }
}


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(400).send({ message: 'User already exists' })
        }
        const user = await User.create({
            email, name, password
        })
        user.token = jwt.sign({
            data: {
                id: user._id,
                email: user.email
            },
        }, "SECRET_KEY", { expiresIn: '3 days' })
        return res.send({ message: 'User created',user})
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error })
    }
}


module.exports = { login,register }