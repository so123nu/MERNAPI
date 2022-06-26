const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: "String",
        required: [true, "Please Enter a name."],
    },
    email: {
        type: "String",
        required: [true, "Please Enter an email."],
        unique: true,
    },
    password: {
        type: "String",
        required: [true, "Please Enter a password."],
    },
    mobile: {
        type: "Number",
        required: [true, "Please Enter a mobile number."],
        unique: true,
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('User', userSchema);