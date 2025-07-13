module.exports = function (task) {
    return {
        id: task._id.toString(),
        title: task.title,
        content: task.content,
        publishedAt: task.createdAt
    };
};