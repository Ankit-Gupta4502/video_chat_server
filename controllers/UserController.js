const User = require("../models/User")

const getUser = async (req, res) => {
    try {
        const { _id } = req.decoded
        const getUser = await User.findOne({ _id })
        const user = getUser.toObject()
        user.token = req.cookies.video_chat_token
        return res.send({ message: "User found", user })
    } catch (error) {
        return res.status(400).send({ message: "Somthing went wrong", error })
    }
}

module.exports = { getUser }