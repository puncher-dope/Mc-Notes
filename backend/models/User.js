const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    login:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
},{timestamps:true})

const User = mongoose.model('User', UserSchema)

module.exports = User