const express = require('express');
const { builtinModules } = require('module');
const router = express.Router(0);
const { registerUser, loginUser, userData } = require('../controllers/UserController');

const { protect } = require('../middleware/AuthMiddleware');



router.post('/', (req, res) => {
    registerUser(req, res);
})

router.post('/login', (req, res) => {
    loginUser(req, res);
})

router.get('/me', protect, userData)


module.exports = router