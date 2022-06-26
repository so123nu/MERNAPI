const express = require('express');
const router = express.Router(0);
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/GoalController');

//Method 1  to create Routes

// router.get('/', (req, res) => {
//     getGoals(req, res);
// })
// router.post('/', (req, res) => {
//     createGoal(req, res);
// })
// router.put('/:id', (req, res) => {
//     updateGoal(req, res);
// })
// router.delete('/:id', (req, res) => {
//     deleteGoal(req, res);
// })

//Method 2  to create Routes

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router 