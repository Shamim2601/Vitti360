const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    hsc: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('Tutor', TutorSchema);