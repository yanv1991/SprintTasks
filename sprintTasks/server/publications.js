Meteor.publish('articles', function() {
  return Articles.find();
});

Meteor.publish('tasks', function() {
  return Tasks.find({userId: this.userId});
});