const { builtinModules } = require("module")
const asyncHandler = require('express-async-handler');
const GoalModel = require('../models/GoalModel');
const UserModel = require('../models/UserModel');

//@desc get goals
//@route GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await GoalModel.find({ user: req.user.id });

    res.status(200).json({ goals: goals })
})

//@desc create goals
//@route POST /api/goals
//@access private
const createGoal = asyncHandler(async (req, res) => {
    if (req.body.text) {
        let goal = await GoalModel.create({
            user: req.user.id,
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

    let user = await UserModel.findById(req.user.id);

    if (!user) {
        res.status(400)
        throw new Error('User Not Found.')
    }


    //Check if goal is created by current user
    if (goal.user.toString() !== user._id) {

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
    } else {
        res.status(400)
        throw new Error('Invalid Login.')
    }




})

//@desc delete goals
//@route DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
    let goal = await GoalModel.findById(req.params.id);
    let user = await UserModel.findById(req.user.id);

    if (!user) {
        res.status(400)
        throw new Error('User Not Found.')
    }

    if (!goal) {
        res.status(400)
        throw new Error('Goal Not Found.')
    }

    //Check if goal is created by current user
    if (goal.user.toString() !== user._id) {

        await goal.remove();
        res.status(200).json(req.params.id)
    } else {
        res.status(400)
        throw new Error('Invalid Login.')
    }


})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal,
}