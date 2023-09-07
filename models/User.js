const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        required: [true, "email is required"],
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address`
        },
        unique: true
    }, password: {
        type: String,
        required: [true, "password is required"],
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        return next();
    } catch (error) {
        return next(error);
    }
});


userSchema.methods.comparePassword = async (candidatePassword, callback) => {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        callback(null, isMatch);
    } catch (error) {
        callback(error);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
