const Task = require('../models/Task')
const User = require('../models/User');

//add
async function addTask(taskData, userId) {
    const task = await Task.create({ ...taskData, author: userId });
    

    await User.findByIdAndUpdate(
        userId,
        { $push: { tasks: task._id } },
        { new: true }
    );
    
    return task;
}

//edit
async function editTask(taskId, taskData, userId) {
     const task = await Task.findOneAndUpdate(
        { _id: taskId, author: userId },
        { title: taskData.title, content: taskData.content },
        { new: true }
    );
    
    if (!task) throw new Error('Task not found or access denied');
    return task;
}


//delete
async function deleteTask(taskId, userId) {
     const result = await Task.deleteOne({ _id: taskId, author: userId });
    if (result.deletedCount === 0) throw new Error('Task not found or access denied');

    
    await User.findByIdAndUpdate(
        userId,
        { $pull: { tasks: taskId } }
    );
    return result;
}

//get
async function getTasks(userId, search = '', limit = 10, page = 1) {
    const query = { 
        author: userId,
        title: { $regex: search, $options: 'i' } 
    };

    const [tasks, count] = await Promise.all([
        Task.find(query)
            .populate('author', 'login') 
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Task.countDocuments(query)
    ]);

    return { tasks, lastPage: Math.ceil(count / limit) };
}


//get 1 item
async function getTask(taskId, userId) {
   const task = await Task.findOne({ _id: taskId, author: userId });
    if (!task) throw new Error('Task not found or access denied');
    return task;
}
module.exports = {
   getTask,
   getTasks,
   deleteTask,
   editTask,
   addTask
}