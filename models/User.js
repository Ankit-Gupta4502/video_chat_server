const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        required: true,
        type: String,
    }, password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

userSchema.pre('save', async (next) => {
    try {
        if (!this.isModified("password")) {
            return next();
        } else {
            const hashedPassword = await bcrypt(this.password, 10)
            this.password = hashedPassword
            return next();
        }
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
