const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TutorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    tutions: {
        type: Number,
        required: true
    },
    instituion: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Tutor', TutorSchema);