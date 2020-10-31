const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema ({
    title: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: Number,
        required: true,
        unique: true
    },
    color: {
        type: String,
        trim: true,
        required: true
    }
}, {collection: 'myBudget'});
module.exports = mongoose.model('myBudget', budgetSchema)