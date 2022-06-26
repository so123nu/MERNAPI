const { builtinModules } = require("module")
const asyncHandler = require('express-async-handler');
const GoalModel = require('../models/GoalModel');

//@desc get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await GoalModel.find();

    res.status(200).json({ goals: goals })
})

//@desc create goals
//@route POST /api/goals
//@access private
const createGoal = asyncHandler(async (req, res) => {
    if (req.body.text) {
        let goal = await GoalModel.create({
            text: req.body.text
        })
        res.status(200).json({ goal: goal })
    } else {
        res.status(400)
        throw new Error('Please add a text field.')
    }
})

//@desc update goals
//@route PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {

    let goal = await GoalModel.findById(req.params.id);

    if (req.body.text) {
        if (!goal) {
            res.status(400)
            throw new Error('Goal Not Found.')
        }

        let updatedGoal = await GoalModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ goal: updatedGoal })
    } else {
        res.status(400)
        throw new Error('Please add a text field.')
    }


})

//@desc delete goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    let goal = await GoalModel.findById(req.params.id);

    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found.')
    }

    await goal.remove();
    res.status(200).json(req.params.id)

})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}