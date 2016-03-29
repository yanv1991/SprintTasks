Tasks = new Mongo.Collection('tasks');

Tasks.allow({
  update: function(userId, task) { return ownsDocument(userId, task); }
});

Meteor.methods({
  addTask: function(taskAttributes) {
    check(Meteor.userId(), String);
    check(taskAttributes, {
      name: String
    });
    
    var user = Meteor.user();
    var task = _.extend(taskAttributes, {
      userId: user._id,
      status: 'T'
    });
    var taskId = Tasks.insert(task);
    return {
      _id: taskId
    };
  }
});