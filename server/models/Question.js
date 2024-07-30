const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    questionText: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
