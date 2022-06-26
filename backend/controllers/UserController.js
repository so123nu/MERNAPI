const { builtinModules } = require("module")
const UserModel = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { exit } = require("process");

//@desc get goals
//@route GET /api/goals
//@access private
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, mobile } = req.body

    if (!name || !email || !password || !mobile) {
        res.status(400).json("Please enter required fields.");
    }

    const userExists = await UserModel.findOne({ email })

    if (userExists) {
        res.json("User Already Exists.");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await UserModel.create({
        name,
        email,
        mobile,
        password: hashedPassword,
    })

    if (user) {
        token = generateToken(user._id);

        res.status(201).json({ user: user, token: token })
    } else {
        res.status(500).json({ message: "Invalid User Data" });
    }

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await UserModel.findOne({ email });
    token = generateToken(user._id);

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({ user: user, token: token })
    } else {
        res.status(400).json("User Not Found");
    }

})


const userData = asyncHandler(async (req, res) => {

    const user = await UserModel.findById(req.user.id);

    res.status(200).json({ user: user })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}
module.exports = {
    registerUser,
    loginUser,
    userData
}