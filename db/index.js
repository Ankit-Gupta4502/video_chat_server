const mongoose = require('mongoose');
(async () => {
    try {
        const response = await mongoose.connect("mongodb+srv://ankit12:ankit123@cluster0.9gqrb.mongodb.net/?retryWrites=true&w=majority")
        console.log("connection stabilished");
    } catch (error) {
        console.error(error);
    }
})()

module.exports = mongoose