const Expense = require("../models/Expense");

const getExpenses = async (req,res) => {
    try{
        const expenses = await Expense.find({user: req.user.id});
        res.json(expenses);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

const createExpense = async (req,res) => {
    try{
        const {title, amount, category} = req.body;
        const expense = await Expense.create({title, amount, category, user: req.user.id})
        res.status(201).json(expense);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

const updateExpense = async (req,res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({message: "expense not found"});
        }

        if(expense.user.toString() !== req.user.id){
            return res.status(403).json({message: "you are not authorized to perform this action"});
        }

        const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.status(200).json(updated);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

const deleteExpense = async (req,res) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({message: "expense not found"});
        }
        if(expense.user.toString() !== req.user.id){
            return res.status(403).json({message: "you are not authorized to perform this action"});
        }
        const updated = await Expense.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "expense deleted successfully"});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
}