const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task