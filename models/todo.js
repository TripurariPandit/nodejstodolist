// require the library
const mongoose = require('mongoose');

// create the schema of database
const todoSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    duedate:{
        type:Date,
        required:true
    }
});

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;