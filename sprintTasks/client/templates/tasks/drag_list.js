Template.dragList.helpers({
  tasks: function(status) {
  	var userId = (Meteor.user()) ? Meteor.user()._id : String.Empty;
    return Tasks.find({userId: userId, status: status});
  }
});
Template.dragList.onRendered(function(){
  drake = dragula([document.querySelector('#todoPanel'), document.querySelector('#inProgressPanel'), 
  	document.querySelector('#qaPanel'), document.querySelector('#atPanel'), document.querySelector('#donePanel')], {
    moves: function (el, source, handle, sibling) {
      return el.className !== 'panelTitle';
    },
    copySortSource: false
  });
  drake.on("drop", function(el, target, source, sibling){
      var task = Blaze.getData(el);
      var id = task._id;
      delete task['_id'];
      task.status = $(target).attr("data-status");
      Tasks.update(id, {$set: task}, function(error) {
        if (error) {
          // display the error to the user
          throwError(error.reason);
        }
      });
  });
});

Template.dragList.events({
  'click #addTask': function(e) {
    e.preventDefault();

    var task = {
      name: $("#taskName").val(),
    };

    Meteor.call('addTask', task, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
    });
  }
});