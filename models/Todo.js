const mongoose = require('mongoose');
const todosSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,      
        },
        description:{
            type:String,
        },
        iscompleted:{
            type:Boolean,
            default: false
        },
        createdAt:{
            type:Date,
            default: Date.now
        }
    }
)

const Todo = mongoose.model('Todo',todosSchema)
module.exports = Todo;