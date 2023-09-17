const { validationResult } = require("express-validator")
const { formatError } = require("../utils")
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const login = async (req, res) => {
    try {
        const results = validationResult(req)
        const { email, password } = req.body;
        const getUser = await User.findOne({ email });
        if (!results.isEmpty()) {
            return res.status(422).send({ success: false, errors: formatError(results) })
        }
        if (!getUser) {
            return res.status(422).send({ success: false, message: "user not found" })
        }
        const signedJwt = jwt.sign({
            data: {
                _id: getUser._id,
                email: getUser.email
            },
        }, "SECRET_KEY", { expiresIn: '3 days' })
        const user = {
            ...getUser.toObject()
        }
        user.token = signedJwt
        const oneDay = 24 * 60 * 60 * 1000

        return res.cookie("video_chat_token", signedJwt, {
            maxAge: oneDay * 3
        }).send({ message: "Succeed", user })

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
        const createdUser = await User.create({
            email, name, password
        })
        const user = createdUser.toObject()
        user.token = jwt.sign({
            data: {
                _id: createdUser._id,
                email: createdUser.email
            },
        }, "SECRET_KEY", { expiresIn: '3 days' })
        const oneDay = 24 * 60 * 60 * 1000
        return res.cookie("video_chat_token", user.token, {
            maxAge: oneDay * 3
        }).send({ message: 'User created', user })
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error })
    }
}


module.exports = { login, register }