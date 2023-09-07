const User = require("../models/User")

const getUser = async (req, res) => {
    try {
        const { _id } = req.decoded
        const user = await User.findOne({ _id })
        return res.send({ message: "User found", user })
    } catch (error) {
        return res.status(400).send({ message: "Somthing went wrong", error })
    }
}

module.exports = { getUser }