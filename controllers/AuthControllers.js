const { validationResult } = require("express-validator")
const { formatError } = require("../utils")
const jwt = require('jsonwebtoken');
const users = [
    { id: 1, email: 'user234@gmail.com', password: 'password1' },
];

const login = async (req, res) => {
    try {
        const results = validationResult(req)
        const { email, password } = req.body;
        const user = users.find(u => u.email === email && u.password === password);
        if (!results.isEmpty()) {
            return res.status(422).send({ success: false, errors: formatError(results) })
        }
        if (!user) {
            return res.status(422).send({ success: false, message: "user not found" })
        }
        const signedJwt = jwt.sign({
            data: {
                id: user.id,
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


module.exports = { login }