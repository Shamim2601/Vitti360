const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    institution:{
        type: String,
        required: true,
    },
    class:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('Student', StudentSchema);